//isitraukiam express is npm
const express = require('express');
const path = require('path');
//sukuriam express app objekta
const app = express();

const { people } = require('./js/people');

console.log(people);

//current paths
const htmlPath = path.join(__dirname, 'html');
const indexPath = path.join(__dirname, 'html', 'index.html');
const aboutPath = path.join(__dirname, 'html', 'about.html');
//resolve rasome kai viena paduodame __dirname , o join naudojame kai reikia paduoti daugiau kelia nurodanciu elementu

// console.log(indexPath);

//Routes
app.get('/', (req, res) => res.sendFile(indexPath));
// app.get('/about', (req, res) => res.sendFile(aboutPath));

//our API
app.get('/api/people', (req, res) => {
  //gauname objektu masyvo json formatu adresa narsykleje
  res.json(people);
});
//get one person
//cia :id bus sukurtas parametras, kuri galesime naudoti funkcijos viduje , o paramId bus tas id kuri paduosime adrese localhost:3000/api/people/it55   Siuo atveju paramId = it55
app.get('/api/people/:id', (req, res) => {
  const paramId = req.params.id;
  const found = people.find((person) => person.id === paramId);
  // res.send(`id you are looking for is: ${paramId}`);

  if (!found) {
    res.status(404).json({ errorMsg: `You have entered invalid id!Try again!` });
  }
  res.json(found);
});

//kai turim papke , kurios failus norim pasiekti is narsykles pagal pav
//Nustatom static folderi , su app.use . Tai narsykleje /about.html irasius nueis i about puslapi , o irasius tik / nueis i index.html

// app.use(express.static(htmlPath));

//paleidziam serveri , kuris veikia localserver:3000 adresu, ir klausosi http ir kitu requestu nurodytu portu
app.listen(3000, () => {
  console.log('server is running');
});
