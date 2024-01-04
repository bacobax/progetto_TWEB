const catchAsync = require("./catchAsync");

/**
 * This function verifies the presence of specified fields in the request query.
 * It uses the catchAsync function to handle asynchronous operations.
 * The function takes in an arbitrary number of fields as arguments.
 * It then checks if these fields are present in the request query.
 * If a field is not present, it throws an error indicating the missing field.
 * If all fields are present, it calls the next middleware function in the stack.
 *
 * @param {...string} fields - The fields to verify in the request query.
 * @returns {Function} A middleware function that verifies the presence of the specified fields in the request query.
 */
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


/**
 * This function verifies the presence of specified fields in the selected fields of the request query.
 * It uses the catchAsync function to handle asynchronous operations.
 * The function takes in an arbitrary number of fields as arguments.
 * It then checks if these fields are present in the selected fields of the request query.
 * If a field is not present, it throws an error indicating the missing field.
 * If all fields are present, it calls the next middleware function in the stack.
 *
 * @param {...string} fields - The fields to verify in the selected fields of the request query.
 * @returns {Function} A middleware function that verifies the presence of the specified fields in the selected fields of the request query.
 */
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