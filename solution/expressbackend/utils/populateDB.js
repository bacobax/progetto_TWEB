const mongoose = require('mongoose');
const fs = require('fs');

// const Game = require('../models/game');
// const Appearance = require('../models/appearence');
// const GameEvent = require('../models/gameEvent');
// const PlayerValuation = require('../models/playerValuation');
// const GameLineup = require('../models/gameLineup');

const paths = [
  '../../../datasets/json/new_games.json',
  '../../../datasets/json/new_appearances.json',
  '../../../datasets/json/game_events.json',
  '../../../datasets/json/new_player_valuations.json',
  '../../../datasets/json/game_lineups.json',
];

/**
 * Third step:
 * turn all the number game_id to ObjectId using the mapping file .json
 */

const cleaningDatasets = () => {
  const mapped_ids = require('../../../datasets/json/games_id_mapping.json');

  paths.forEach((path) => {
    const dataset = require(path);
    dataset.forEach((doc) => {
      doc.game_id = mapped_ids[doc.game_id];
    });
    fs.writeFileSync(path, JSON.stringify(dataset));
  });
};

/**
 * Fourth step:
 * importing from compass all the datasets.json
 */

/**
 * Fifth step:
 * turn all the String ObjectId to proper ObjectId type
 * codice completamente preso da chatGPT, è da un  giorno che non riesco a migrare i csv in mongodb come vorrei
 * @param {*} Model
 */
const sanitizeGameId = async (Model) => {
  console.log(`Sanitizing ${Model.modelName} collection`);
  await mongoose.connect(
    'mongodb://127.0.0.1:27017/progetto_TWEB?directConnection=true&appName=mongosh+2.1.1'
  );

  Model.aggregate([
    {
      $addFields: {
        game_id: {
          $toObjectId: '$game_id', // Convert the "game_id" field to ObjectId
        },
      },
    },
  ])
    .then((updatedEvents) => {
      // At this point, updatedEvents will contain the modified documents with the "game_id" field converted to ObjectId

      // Now, if you want to update the collection with these modified documents:
      // You can perform a bulk write operation to update each document in the collection
      const bulkUpdateOps = updatedEvents.map((event) => ({
        updateOne: {
          filter: { _id: event._id }, // Assuming "_id" is the identifier field
          update: event, // Update with the modified document
        },
      }));

      Model.bulkWrite(bulkUpdateOps)
        .then((result) => {
          console.log('Updated records:', result);
        })
        .catch((err) => {
          console.error('Error updating records:', err);
        });
    })
    .catch((err) => {
      console.error('Error:', err);
    });
};
