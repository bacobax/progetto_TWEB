const catchAsync = require("./catchAsync");

exports.verifyQueryFields = (...fields) => {
    return catchAsync(async (req, res, next) => {
        const query = req.query;
        const queryFields = Object.keys(query);
        for(let field of fields){
            if(!["fields","page","limit","sort"].includes(field)){
                if(!queryFields.includes(field)){
                    return next(new Error(`Missing field ${field} in query`));
                }
            }

        }
        next();
    })
}


exports.verifyModelSelectedFields = (...fields) => {
    return catchAsync(async (req, res, next) => {
        const selectedFields = req.query.fields.split(",");
        for(let field of fields){
            if(!selectedFields.includes(field)){
                return next(new Error(`Missing field ${field} in query`));
            }
        }
        next();
    })
}