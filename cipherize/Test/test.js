const readline = require('readline');

const { encryptData, decryptData, hashData, compareHash } = require('../lib/urlhandlers');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const dataToEncrypt = 'Hello, World!';

encryptData(dataToEncrypt)
  .then(encryptedData => {
    console.log('Encrypted data:', encryptedData);

    // Decrypt 
    decryptData(encryptedData)
      .then(decryptedData => {
        console.log('Decrypted data:', decryptedData);
      })
      .catch(error => {
        console.error('Error decrypting data:', error);
      });

    // Hash
    hashData(dataToEncrypt)
      .then(hashedData => {
        console.log("Hashed data:", hashedData);

        // Prompt user for input 
        rl.question('Enter the data to compare hash with: ', (dataToCompare) => {
          compareHash(dataToCompare, hashedData)
            .then(isMatch => {
              isMatch ? console.log("Hashes Matched!") : console.log("Hashes didn't match");
              rl.close();
            })
            .catch(error => {
              console.error('Error comparing hash:', error);
              rl.close();
            });
        });
      })
      .catch(error => {
        console.error('Error hashing data:', error);
      });
  })
  .catch(error => {
    console.error('Error encrypting data:', error);
  });
