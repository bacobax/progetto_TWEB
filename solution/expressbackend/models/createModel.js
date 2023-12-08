const mongoose = require('mongoose');

/**
 * Creates a new Mongoose model based on the provided schema definition.
 * @param {Function} schemaDefinition - A function that returns the schema definition.
 * @param {string} name - The name of the model.
 * @returns {mongoose.Model} - The created Mongoose model.
 */
const createModel = (schemaDefinition, name) => {
  const schema = schemaDefinition();
  return mongoose.model(name, schema);
};

module.exports = createModel;
