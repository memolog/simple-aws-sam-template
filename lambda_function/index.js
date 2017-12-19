exports.hello = (event, context, callback) => {
  if (!callback) return;
  callback(null, {
    'statusCode': 200,
    'body': JSON.stringify('Hello World')
  });
};
