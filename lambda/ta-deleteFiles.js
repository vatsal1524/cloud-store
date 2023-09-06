const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB();
const s3 = new AWS.S3();
const sns = new AWS.SNS();

exports.handler = async (event) => {
  try {
    const expiredFiles = await getExpiredFiles();

    for (const file of expiredFiles) {
      const { fileKey, email, fileName } = file;

      await deleteS3Object("ta-storage-bucket", fileKey);
      await deleteFileRecord(fileKey);

      const message = `File ${fileName} deleted successfully.`;
      await sendSnsMessage(
        "arn:aws:sns:us-east-1:414423038363:ta-sendEmail",
        email,
        message
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Expired files deleted successfully." }),
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

async function getExpiredFiles() {
  const today = getFormattedDate();

  const params = {
    TableName: "files",
    FilterExpression: "expiryDate = :expiryDate",
    ExpressionAttributeValues: {
      ":expiryDate": { S: today },
    },
    ProjectionExpression: "fileKey, email, fileName",
  };

  return new Promise((resolve, reject) => {
    dynamoDB.scan(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const expiredFiles = data.Items.map((item) => ({
          fileKey: item.fileKey.S,
          email: item.email.S,
          fileName: item.fileName.S,
        }));
        resolve(expiredFiles);
      }
    });
  });
}

async function deleteS3Object(bucketName, fileKey) {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
  };

  await s3.deleteObject(params).promise();
}

async function deleteFileRecord(fileKey) {
  const params = {
    TableName: "files",
    Key: {
      fileKey: { S: fileKey },
    },
  };

  await dynamoDB.deleteItem(params).promise();
}

async function sendSnsMessage(topicArn, email, message) {
  const params = {
    TopicArn: topicArn,
    Message: message,
    MessageAttributes: {
      email: {
        DataType: "String",
        StringValue: email,
      },
    },
  };

  await sns.publish(params).promise();
}

function getFormattedDate() {
  const today = new Date();
  const year = today.getUTCFullYear();
  let month = (today.getUTCMonth() + 1).toString().padStart(2, "0");
  let day = today.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
