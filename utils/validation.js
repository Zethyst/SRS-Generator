function bodyValidation(body, fields) {
    for (const field of fields) {
      if (!(field in body)) {
        return false;
      }
    }
    return true;
  }
  
  module.exports = { bodyValidation };
  