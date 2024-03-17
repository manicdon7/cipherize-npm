cipherize

cipherize is a Node.js package for simplify encryption, decryption and hashing using bcrypt and crypto.

Installation
You can install cipherize via npm:

bash
npm install cipherize
Usage
Encryption

const cipherize = require('cipherize');

// Encrypt data using a secret key
const encryptedData = cipherize.encryptData('hello world', 'your-secret-key');
console.log('Encrypted Data:', encryptedData);
Decryption

const cipherize = require('cipherize');

// Decrypt data using a secret key
const decryptedData = cipherize.decryptData(encryptedData, 'your-secret-key');
console.log('Decrypted Data:', decryptedData);
Hashing

const cipherize = require('cipherize');

// Hash data using bcrypt
const hashedData = cipherize.hashData('password');
console.log('Hashed Data:', hashedData);
Compare Hash

const cipherize = require('cipherize');

// Compare a value with a hashed value
const value = 'password';
const hashedValue = '$2b$10$examplehashedvalue';
const isMatch = cipherize.compareHash(value, hashedValue);
console.log('Is Match:', isMatch);
Rehash

const cipherize = require('cipherize');

// Rehash a hashed value
const rehashedValue = cipherize.rehash('password');
console.log('Rehashed Value:', rehashedValue);

Test output
![alt text](image.png)

Note
Cipherize operates on localhost by default. Ensure that your backend server is running on http://localhost:5000 or adjust the URLs accordingly if your server is hosted elsewhere.
Endpoints:

Key: http://localhost:5000/key (GET)
Encrypt: http://localhost:5000/encrypt (POST)
decryptData Function
Similar to encryptData, this function retrieves the decryption key and IV by sending a GET request to the /key endpoint. Then it sends a POST request to the /decrypt endpoint to decrypt the encrypted data using the retrieved key and IV.

Endpoints:

Key: http://localhost:5000/key (GET)
Decrypt: http://localhost:5000/decrypt (POST)
compareHash Function
This function compares the provided value with the hashed value by sending a POST request to the /compareHash endpoint.

Endpoint: http://localhost:5000/compareHash (POST)


Author
manikandan0508

License
This project is licensed under the MIT License - see the LICENSE file for details.
