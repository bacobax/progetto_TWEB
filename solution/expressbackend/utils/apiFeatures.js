/**
 * @class APIFeatures
 * @description This class is used to filter, sort, limit and paginate the query
 * @param {Object} query - The query object
 * @param {Object} queryString - The query string object
 * @returns {Object} query - The query object
 * @example
 * const features = new APIFeatures(Character.find(), req.query).filter().sort().limitFields().paginate();
 * const characters = await features.query;
 *
 */
class APIFeatures {
  constructor(query, queryString) {
    console.log('constructor');

    this.query = query;
    this.queryString = queryString;
  }



  /**
 * This method filters the query based on the fields present in the query string.
 * It excludes certain fields from the query string before filtering.
 * The fields to be excluded can be passed as an argument to the method.
 * If no fields are passed, it defaults to excluding 'page', 'sort', 'limit', and 'fields'.
 * After filtering, it updates the query object of the APIFeatures instance.
 *
 * @param {Array<string>} [excluded] - The fields to exclude from the query string before filtering.
 * @returns {APIFeatures} The instance of APIFeatures on which the method was called.
 */
filter(excluded) {
  const queryObj = { ...this.queryString };
  const excludedFields =excluded ?  ['page', 'sort', 'limit', 'fields' , ...excluded] :['page', 'sort', 'limit', 'fields' ] ;
  excludedFields.forEach((el) => delete queryObj[el]);
  console.log('filtering');

  this.query = this.query.find(queryObj);

  return this;
}

  /**
 * This method sorts the query based on the 'sort' field in the query string.
 * If the 'sort' field is present, it splits the field by commas and joins them with spaces to form the sorting criteria.
 * The query is then sorted based on this criteria.
 * If the 'sort' field is not present, the query is sorted by the 'createdAt' field in descending order.
 * After sorting, it updates the query object of the APIFeatures instance.
 *
 * @returns {APIFeatures} The instance of APIFeatures on which the method was called.
 */
sort() {
  if (this.queryString.sort) {
    const sortBy = this.queryString.sort.split(',').join(' ');
    this.query = this.query.sort(sortBy);
  } else {
    this.query = this.query.sort('-createdAt');
  }
  console.log('sorting');

  return this;
}

  /**
 * This method limits the fields in the query based on the 'fields' field in the query string.
 * If the 'fields' field is present, it splits the field by commas and joins them with spaces to form the fields to be selected.
 * The query is then limited to these fields.
 * If the 'fields' field is not present, the query is limited to all fields except '__v'.
 * After limiting the fields, it updates the query object of the APIFeatures instance.
 *
 * @returns {APIFeatures} The instance of APIFeatures on which the method was called.
 */
limitFields() {
  if (this.queryString.fields) {
    const fields = this.queryString.fields.split(',').join(' ');
    this.query = this.query.select(fields);
  } else {
    this.query = this.query.select('-__v');
  }
  console.log('limitF');
  return this;
}

  /**
 * This method paginates the query based on the 'page' and 'limit' fields in the query string.
 * The 'page' field determines the current page number and defaults to 1 if not present.
 * The 'limit' field determines the number of records per page and defaults to 100 if not present.
 * If the 'page' or 'limit' fields are less than or equal to 0, it throws an error.
 * The method calculates the number of records to skip based on the 'page' and 'limit' fields.
 * The query is then updated to skip the calculated number of records and limit the number of records to the 'limit' field.
 * After paginating, it updates the query object of the APIFeatures instance.
 *
 * @returns {APIFeatures} The instance of APIFeatures on which the method was called.
 */
paginate() {
  const page = parseInt(this.queryString.page) || 1;
  const limit = parseInt(this.queryString.limit) || 100;

  // Handling boundary conditions
  if (page <= 0 || limit <= 0) {
    throw new Error('Invalid pagination parameters');
  }

  const skip = (page - 1) * limit;

  this.query = this.query.skip(skip).limit(limit);

  console.log(`paginating: page ${page}, limit ${limit}, skip ${skip}`);

  return this;
}

}
module.exports = APIFeatures;
