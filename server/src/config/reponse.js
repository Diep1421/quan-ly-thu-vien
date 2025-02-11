// 200 , 400 , 500
const date = new Date();
const successCode = (res, data, message) => {
  res.status(200).json({
    statusCode: 200,
    message,
    content: data,
    DateTime: date,
  });
};

//400
const failCode = (res, data, message) => {
  res.status(400).json({
    message,
    content: data,
    DateTime: date,
  });
};
//500
const errorCodeNew = (res, message) => {
  res.status(500).send({
    statusCode: 500,
    message: "An unresolved error occurred!",
    content:
      "The number of rows provided for a FETCH clause must be greater then zero.",
    dateTime: date,
  });
};
const errorCode = (res, message) => {
  res
    .status(500)
    .send({ statusCode: 500, message: "Backend error", dateTime: date });
};
module.exports = {
  successCode,
  failCode,
  errorCode,
  errorCodeNew,
};
