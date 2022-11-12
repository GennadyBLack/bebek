const sendError = (res, error) => {
  res.status(error?.status || 500).json({
    status: "error",
    error: {
      message: error?.message || serverErrorMsg,
    },
  });
};
module.exports = sendError;
