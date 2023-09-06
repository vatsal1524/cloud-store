const AWS = require("aws-sdk");
const crypto = require("crypto");

const dynamoDB = new AWS.DynamoDB();
const sns = new AWS.SNS();

exports.handler = async (event, context) => {
  const { data } = JSON.parse(event.body);
  const { name, email, password, location } = data;

  console.log(name, email, password, location);

  try {
    const hashedPassword = hashPassword(password);
    console.log(hashedPassword);

    await insertRow(name, email, hashedPassword, location);
    console.log("Row inserted.");

    await subscribeToSnsTopic(email);
    console.log("Email subscribed.");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User added successfully." }),
    };
  } catch (err) {
    console.error("Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while processing your request.",
      }),
    };
  }
};

async function insertRow(name, email, password, location) {
  const params = {
    TableName: "users",
    Item: {
      name: { S: name },
      email: { S: email },
      password: { S: password },
      location: { S: location },
    },
  };

  await dynamoDB.putItem(params).promise();
}

async function subscribeToSnsTopic(email) {
  const topicArn = "arn:aws:sns:us-east-1:414423038363:ta-sendEmail";

  const params = {
    Protocol: "email",
    TopicArn: topicArn,
    Endpoint: email,
    Attributes: {
      FilterPolicy: '{"email": ["' + email + '"]}',
    },
  };

  console.log(params);
  await sns.subscribe(params).promise();
}

function hashPassword(password) {
  const md5Hash = crypto.createHash("md5").update(password).digest("hex");
  return md5Hash;
}
