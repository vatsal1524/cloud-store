const AWS = require("aws-sdk");

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB();
const sns = new AWS.SNS();

exports.handler = async (event) => {
  try {
    const { data } = JSON.parse(event.body);
    const { fileName, fileData, email } = data;

    const decodedFileData = Buffer.from(fileData, "base64");

    const bucketName = "ta-storage-bucket";
    const fileKey = `${email}/${fileName}`;
    await uploadFileToS3(bucketName, fileKey, decodedFileData);

    const expiryDate = getFormattedDate();
    await insertFileRecord(email, fileName, fileKey, expiryDate);

    const successMessage = `File ${fileName} has been uploaded successfully.`;
    const messageAttributes = {
      email: {
        DataType: "String",
        StringValue: email,
      },
    };

    await publishToSnsTopic(
      "arn:aws:sns:us-east-1:414423038363:ta-sendEmail",
      successMessage,
      messageAttributes
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "File uploaded successfully." }),
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

async function uploadFileToS3(bucketName, fileKey, fileData) {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileData,
  };

  await s3.putObject(params).promise();
}

async function insertFileRecord(email, fileName, fileKey, expiryDate) {
  const params = {
    TableName: "files",
    Item: {
      fileKey: { S: fileKey },
      fileName: { S: fileName },
      email: { S: email },
      expiryDate: { S: expiryDate },
    },
  };

  await dynamoDB.putItem(params).promise();
}

function getFormattedDate() {
  const today = new Date();
  const year = today.getUTCFullYear();
  let month = (today.getUTCMonth() + 1).toString();
  let day = today.getUTCDate().toString();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${year}-${month}-${day}`;
}

async function publishToSnsTopic(topicArn, message, messageAttributes) {
  const params = {
    TopicArn: topicArn,
    Message: message,
    MessageAttributes: messageAttributes,
  };

  console.log(params);
  await sns.publish(params).promise();
}
