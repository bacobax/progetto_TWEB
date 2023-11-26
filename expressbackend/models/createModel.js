const mongoose = require('mongoose');

const createModel = (schemaDefinition, name) => {
    return mongoose.model(name, schemaDefinition());
}

module.exports = createModel;