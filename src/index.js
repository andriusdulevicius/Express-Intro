//isitraukiam express is npm
const express = require('express');
const path = require('path');
//sukuriam express app objekta
const app = express();

const indexPath = path.join(__dirname, 'html', 'index.html');
const aboutPath = path.join(__dirname, 'html', 'about.html');
//resolve rasome kai viena paduodame __dirname , o join naudojame kai reikia paduoti daugiau kelia nurodanciu elementu

// console.log(indexPath);

//main route
app.get('/', (req, res) => res.sendFile(indexPath));
app.get('/about', (req, res) => res.sendFile(aboutPath));

//paleidziam serveri , kuris veikia localserver:3000 adresu, ir klausosi http ir kitu requestu nurodytu portu
app.listen(3000, () => {
  console.log('server is running');
});
