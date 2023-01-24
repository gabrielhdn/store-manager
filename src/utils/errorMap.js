const map = {
  INVALID_NUMBER: 422,
  FIELD_REQUIRED: 400,
  NOT_FOUND: 404,
};

module.exports = (type) => map[type];