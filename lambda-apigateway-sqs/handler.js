const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
  endpoint: 'http://localhost:4566', // Endpoint của LocalStack
  region: 'us-east-1',
});

module.exports.sendMessage = async (event) => {
  const params = {
    QueueUrl: process.env.SQS_URL,
    MessageBody: JSON.stringify({ message: 'Hello from Lambda!' }),
  };

  await sqs.sendMessage(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Message sent to SQS!' }),
  };
};
