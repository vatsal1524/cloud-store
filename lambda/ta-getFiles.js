const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB();

exports.handler = async (event) => {
  try {
    const { data } = JSON.parse(event.body);
    const { email } = data;

    const fileNames = await getFileNamesByEmail(email);

    return {
      statusCode: 200,
      body: JSON.stringify({ fileNames }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
    };
  }
};

async function getFileNamesByEmail(email) {
  const params = {
    TableName: "files",
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
    ProjectionExpression: "fileName",
  };

  return new Promise((resolve, reject) => {
    dynamoDB.scan(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const fileNames = data.Items.map((item) => item.fileName.S);
        resolve(fileNames);
      }
    });
  });
}
