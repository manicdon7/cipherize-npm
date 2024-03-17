async function hashData(data) {
    try {
      const response = await fetch('http://localhost:5000/hash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
      });
      const { hashedData } = await response.json();
      console.log(hashedData);
      return hashedData;
    } catch (error) {
      console.error('Error hashing data:', error);
      throw error;
    }
  }
  
  async function encryptData(data) {
    try {
      const keyResponse = await fetch('http://localhost:5000/key', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const { key, iv } = await keyResponse.json();
      const response = await fetch('http://localhost:5000/encrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, key, iv })
      });
      const { encryptedData } = await response.json();
      return encryptedData;
    } catch (error) {
      console.error('Error encrypting data:', error);
      throw error;
    }
  }
  
  async function decryptData(encryptedData) {
    try {
      const keyResponse = await fetch('http://localhost:5000/key', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const { key, iv } = await keyResponse.json();
  
      const response = await fetch('http://localhost:5000/decrypt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ encryptedData, key, iv })
      });
  
      if (response.ok) {
        const { decryptedData } = await response.json();
        return decryptedData;
      } else {
        console.error('Error decrypting data. Server returned status:', response.status);
        throw new Error('Decryption error: Server returned status ' + response.status);
      }
    } catch (error) {
      console.error('Error decrypting data:', error);
      throw error;
    }
  }
  
  const compareHash = async (value, hashedValue) => {
    try {
      const response = await fetch('http://localhost:5000/compareHash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value, hashedValue })
      });
      const { isMatch } = await response.json();
      return isMatch;
    } catch (error) {
      console.error('Error comparing hash:', error);
      throw error;
    }
  }
  
  module.exports = { hashData, encryptData, decryptData, compareHash };
  