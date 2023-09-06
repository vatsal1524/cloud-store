const AWS = require("aws-sdk");

const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    const { data } = JSON.parse(event.body);
    console.log(data);
    const { fileKey } = data;
    const bucketName = "ta-storage-bucket";
    const preSignedUrl = await generatePreSignedUrl(bucketName, fileKey);

    return {
      statusCode: 200,
      body: JSON.stringify({ preSignedUrl }),
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

async function generatePreSignedUrl(bucketName, fileKey) {
  const params = {
    Bucket: bucketName,
    Key: fileKey,
    Expires: 60,
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
}
