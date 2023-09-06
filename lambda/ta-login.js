const AWS = require("aws-sdk");
const crypto = require("crypto");

const dynamoDB = new AWS.DynamoDB();

exports.handler = async (event, context) => {
  const { data } = JSON.parse(event.body);
  const { email, password } = data;

  try {
    const hashedPassword = hashPassword(password);

    const user = await getUserByEmailAndPassword(email, hashedPassword);

    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found." }),
      };
    }
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

async function getUserByEmailAndPassword(email, hashedPassword) {
  const params = {
    TableName: "users",
    Key: {
      email: { S: email },
    },
  };

  const response = await dynamoDB.getItem(params).promise();
  const user = response.Item
    ? AWS.DynamoDB.Converter.unmarshall(response.Item)
    : null;

  if (user && user.password === hashedPassword) {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  } else {
    return null;
  }
}

function hashPassword(password) {
  const md5Hash = crypto.createHash("md5").update(password).digest("hex");
  return md5Hash;
}
