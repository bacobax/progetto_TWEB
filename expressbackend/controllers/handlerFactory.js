const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
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

exports.updateOne = (
  Model //update the document with id = req.params.id with req.body
) =>
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

exports.createOne = (
  Model //create the document with the json obj in req.body
) =>
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

exports.getOne = (
  Model // find th document with id = req.params.id
) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
/*get all the documents filtered with req.query
  sort=<val0>,<val1>,...,<valn> sort the documents by val0, then val1,..., then valn
  <field>=<val> filter the document by {field:val}
  fields:<field0>,...,<fieldn> retrieve only field0, ... , fieldn
*/
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    console.log('START');
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields();
    

    const doc = await features.query;
    console.log('END');

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });
