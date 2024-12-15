// const express = require( 'express' )
// const os = require('os')

// const app = express()

// app.use('/', async (req, res) => {
//     console.log('I am sending a response ${os.hostname()}')
//     res.json({ message: 'Ok it works...', hostname: os.hostname() })
// })

// app.listen(3000, () => console.log('Server on port 3000'))


const express = require('express');
const os = require('os');
const mysql = require('mysql2/promise'); // mysql2 kullanımı

const app = express();

// Veritabanı bağlantısı için pool oluşturma
const dbConfig = {
  host: 'maria_db',
  user: 'root',
  password: 'db-78n9n',
  database: 'flask_app'
};

let pool;
(async () => {
  try {
    pool = await mysql.createPool(dbConfig);
    console.log('Veritabanına bağlantı başarılı.');
  } catch (err) {
    console.error('Veritabanına bağlantı hatası:', err);
  }
})();

app.use('/', async (req, res) => {
  try {
    const hostname = os.hostname();
    console.log(`I am sending a response: ${hostname}`);

    // Veritabanına hostname ekleme
    const query = "INSERT INTO users (session_id) VALUES (?)";
    await pool.execute(query, [hostname]);

    res.json({ message: 'Ok it works...', hostname });
  } catch (err) {
    console.error('Hata:', err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
});

app.listen(3000, () => console.log('Server on port 3000'));
