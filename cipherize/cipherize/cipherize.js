require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const saltRounds = 10;

const secretKey = crypto.randomBytes(32);
const defaultIV = process.env.DEFAULT_IV;

console.log('Generated Secret Key:', secretKey.toString('hex'));


bcrypt.genSalt(saltRounds, (err, salt) => {
  if (err) throw err;
  bcrypt.hash(secretKey.toString('hex'), salt, (err, hash) => {
    if (err) throw err;
    encryptedKeyHash = hash;
  });
});

app.get('/', async(req,res)=>{
  res.json({message:"API' are working!"})
});

app.get('/key', (req, res) => {
  res.json({ key: secretKey.toString('hex') });
});

app.post('/hash', async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'Data is required' });
  }

  try {
    const hashedData = await bcrypt.hash(data, 10);
    res.json({ hashedData });
  } catch (error) {
    console.error('Error hashing data:', error);
    return res.status(500).json({ error: 'Error hashing data' });
  }
});

app.post('/encrypt', (req, res) => {
  const { data, key } = req.body;
  if (!data || !key) {
    return res.status(400).json({ error: 'Data and key are required' });
  }

  try {
    const iv = defaultIV ? Buffer.from(defaultIV, 'hex') : crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let encryptedData = cipher.update(data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    res.json({ encryptedData, iv: iv.toString('hex') });
  } catch (error) {
    console.error('Error encrypting data:', error);
    return res.status(500).json({ error: 'Error encrypting data' });
  }
});

app.post('/decrypt', (req, res) => {
  const { encryptedData, key } = req.body;
  if (!encryptedData || !key) {
    return res.status(400).json({ error: 'Encrypted data and key are required' });
  }

  try {
    const iv = defaultIV ? Buffer.from(defaultIV, 'hex') : crypto.randomBytes(16);
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    res.json({ decryptedData });
  } catch (error) {
    console.error('Error decrypting data:', error);
    return res.status(500).json({ error: 'Error decrypting data' });
  }
});

app.post('/compareHash', async (req, res) => {
    const { value, hashedValue } = req.body;
    if (!value || !hashedValue) {
      return res.status(400).json({ error: 'Value and hashedValue are required' });
    }
  
    try {
      const isMatch = await bcrypt.compare(value, hashedValue);
      res.json({ isMatch });
    } catch (error) {
      console.error('Error comparing hash:', error);
      return res.status(500).json({ error: 'Error comparing hash' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
