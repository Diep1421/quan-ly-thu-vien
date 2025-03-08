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

const errorCode = (res, message) => {
  res.status(500).send({ statusCode: 500, message: message, dateTime: date });
};
module.exports = {
  successCode,
  failCode,
  errorCode,
};
