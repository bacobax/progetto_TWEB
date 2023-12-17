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

  filter(excluded) {
    const queryObj = { ...this.queryString };
    const excludedFields =excluded ?  ['page', 'sort', 'limit', 'fields' , ...excluded] :['page', 'sort', 'limit', 'fields' ] ;
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log('filtering');

    this.query = this.query.find(queryObj);

    return this;
  }

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
