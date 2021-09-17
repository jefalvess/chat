const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_KEY, (err, authorizedData) => {
        if (err) {
          //If error send Forbidden (403)
          reject('Nao autorizado');
        } else {
          //If token is successfully verified, we can send the autorized data
          resolve({
            message: 'Successful log in',
            authorizedData
          });
        }
      });
    });
  },

  sign(data) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { data },
        process.env.JWT_KEY,
        { expiresIn: '12h' },
        (err, token) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(token);
        }
      );
    });
  }
};
