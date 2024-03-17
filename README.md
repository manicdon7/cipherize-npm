Using Cipherize for Data Encryption and Decryption
Cipherize is a npm package that provides functionality for encrypting and decrypting data securely. Follow the steps below to integrate Cipherize into your project:

Installation
First, install the Cipherize package from npm by running the following command in your project directory:

install using
![alt text](image-6.png)

Usage
Now you can use the Cipherize functions to encrypt, decrypt, hash, and compare data.

Once installed, initialize Cipherize in your project by requiring it:
![alt text](image-1.png)

Encrypting Data
To encrypt data, use the encryptData function:
![alt text](image-2.png)

Decrypting Data
To decrypt data, use the decryptData function:
![alt text](image-3.png)

Hashing Data
To hash data, use the hashData function:
![alt text](image-4.png)

Comparing Hashes
To compare hashed data with a value, use the compareHash function:
![alt text](image-5.png)

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
