const bcrypt = require('bcrypt');
const crypto = require('crypto');
require( 'dotenv').config();
DEFAULT_IV= "5a03d4a18e9b8d6e2aebcccf2a6d5a7f" || process.env.DEFAULT_IV;  // Default Initialization Vector for AES

async function hashData(data) {
  try {
    const hashedData = await bcrypt.hash(data, 10);
    console.log('Hashed data:', hashedData);
    return hashedData;
  } catch (error) {
    console.error('Error hashing data:', error);
    throw error;
  }
}

async function generateKey() {
  try {
    const secretKey = crypto.randomBytes(32);
    return secretKey.toString('hex');
  } catch (error) {
    console.error('Error generating key:', error);
    throw error;
  }
}

async function encryptData(data, key, iv) {
  try {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return { encryptedData, iv };
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
}

async function decryptData(encryptedData, key, iv) {
  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
}

async function compareHash(value, hashedValue) {
  try {
    const isMatch = await bcrypt.compare(value, hashedValue);
    return isMatch;
  } catch (error) {
    console.error('Error comparing hash:', error);
    throw error;
  }
}

module.exports = { hashData, generateKey, encryptData, decryptData, compareHash };
