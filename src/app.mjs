// app.mjs

import express from 'express';
import path from 'path'
import users from './users.mjs';
import { fileURLToPath } from 'url';
import signup from './signup.mjs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public'), {
  setHeaders: (res, filePath, stat) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.use(express.json());
app.use('/api', users);
app.use('/api',signup);

app.get('/', (req, res) => {
  res.send('Ana Sayfa');
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor');
});