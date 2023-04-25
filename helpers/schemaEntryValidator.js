const createEditEntrySchema = {
  title: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'El título es requerido'
  },
  description: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'El título es requerido'
  },

};

module.exports = {
  createEditEntrySchema
};