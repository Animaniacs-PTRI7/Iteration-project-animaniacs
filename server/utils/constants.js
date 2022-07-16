const createEruror = (errObj) => {
  return Object.assign(
    {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    },
    errObj
  );
};

module.exports = {createEruror}