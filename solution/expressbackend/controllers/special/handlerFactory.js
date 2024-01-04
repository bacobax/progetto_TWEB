const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const APIFeatures = require('../../utils/apiFeatures');
/**
 * This function deletes a single document from the database.
 * It uses the Model's findByIdAndDelete method to find the document by its ID and delete it.
 * If the document is not found, it returns an error with a status code of 404.
 * If the document is deleted successfully, it sends a response with a status code of 204 and no data.
 *
 * @param {Object} Model - The Mongoose model to delete the document from.
 * @returns {Function} A middleware function that deletes a single document from the database.
 */
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

/**
 * This function deletes all documents from the database.
 * It uses the Model's deleteMany method to delete all documents.
 * If no documents are found, it returns an error with a status code of 404.
 * If the documents are deleted successfully, it sends a response with a status code of 204 and no data.
 *
 * @param {Object} Model - The Mongoose model to delete the documents from.
 * @returns {Function} A middleware function that deletes all documents from the database.
 */
exports.deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteMany({});

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

/**
 * This function updates a single document in the database.
 * It uses the Model's findById method to find the document by its ID.
 * If the document is not found, it returns an error with a status code of 404.
 * It then updates the document with the data in the request body and saves it.
 * If the document is updated successfully, it sends a response with a status code of 200 and the updated document.
 *
 * @param {Object} Model - The Mongoose model to update the document in.
 * @returns {Function} A middleware function that updates a single document in the database.
 */
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    for (const key of Object.keys(req.body)) {
      doc[key] = req.body[key];
    }

    doc = await doc.save();

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

/**
 * This function creates a new document in the database.
 * It creates a new instance of the Model with the data in the request body and saves it.
 * If the document is created successfully, it sends a response with a status code of 201 and the new document.
 *
 * @param {Object} Model - The Mongoose model to create the document in.
 * @returns {Function} A middleware function that creates a new document in the database.
 */
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const obj = new Model(req.body);
    const doc = await obj.save();

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

/**
 * This function retrieves a single document from the database.
 * It uses the Model's findById method to find the document by its ID.
 * If the document is not found, it returns an error with a status code of 404.
 * If the document is found, it sends a response with a status code of 200 and the document.
 *
 * @param {Object} Model - The Mongoose model to retrieve the document from.
 * @returns {Function} A middleware function that retrieves a single document from the database.
 */
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

/**
 * This function retrieves all documents from the database.
 * It uses the Model's find method to retrieve all documents.
 * It then uses the APIFeatures class to filter, limit fields, sort, and paginate the results based on the request query.
 * If the documents are retrieved successfully, it sends a response with a status code of 200, the number of results, and the documents.
 *
 * @param {Object} Model - The Mongoose model to retrieve the documents from.
 * @returns {Function} A middleware function that retrieves all documents from the database.
 */
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    const features = new APIFeatures(Model.find(filter), req.query).filter().limitFields().sort().paginate();

    const doc = await features.query.exec();

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });