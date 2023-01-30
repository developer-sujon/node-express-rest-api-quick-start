const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Password must contain at least 1 letter and 1 number');
  }
  return value;
};

const mobile = (value, helpers) => {
  if (!value.match('^(?:\\+88|88)?(01[3-9]\\d{8})$')) {
    return helpers.message('Please enter the correct number');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  mobile,
};
