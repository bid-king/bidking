module.exports.getRedis = (client, query) => {
  return new Promise((resolve, reject) => {
    client.get(query, (err, res) => {
      if (err) reject(err);
      else resolve(res?.replace(/"/g, ''));
    });
  });
};
