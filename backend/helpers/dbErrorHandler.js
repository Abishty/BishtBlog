exports.errorHandler = (error) => {
  let message = "";
  if (error.code === 11000 || error.code === 11001) {
    message = "Duplicate Key Error, slug already exists";
  } else {
    message = "Something Went Wrong";
  }
  return message;
};
