//isitraukiam express is npm
const express = require('express');
const path = require('path'); //tai integruotas node modulis , kuris skirtas gauti absoliutiems ar reliatyviems keliams (w3 schoolse yra visi metodai galimi: join , resolve, dirname, extname, parse ir kt.)

//sukuriam express app objekta
const app = express();

//Middle ware
//Tarpine grandis atliekanti papildomus veiksmus pries ar po serverio uzklausu
//pvz pries nueinant i svetaine, patikrinti ar zmogus turi teise ieiti i ta puslapi
//logger

const logger = (req, res, next) => {
  console.log('logger in action');
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} on ${new Date().toLocaleTimeString()}`);

  next();
};
//naudoti logger funkcija kaip Middle ware

app.use(logger);

//current paths
// eslint-disable-next-line no-undef
const htmlPath = path.join(__dirname, '../client', 'html');
// eslint-disable-next-line no-undef
const indexPath = path.join(__dirname, '../client', 'html', 'index.html');
// eslint-disable-next-line no-undef
const aboutPath = path.join(__dirname, '../client', 'html', 'about.html');
//resolve rasome kai viena paduodame __dirname , o join naudojame kai reikia paduoti daugiau kelia nurodanciu elementu

// console.log(indexPath);

//Routes for pages
app.get('/', (req, res) => res.sendFile(indexPath));
app.get('/about', (req, res) => res.sendFile(aboutPath));

//api routes
app.use('/api/people', require('./routes/api/peopleApi'));

//kai turim papke , kurios failus norim pasiekti is narsykles pagal pav
//Nustatom static folderi , su app.use . Tai narsykleje /about.html irasius nueis i about puslapi , o irasius tik / nueis i index.html

// app.use(express.static(htmlPath));

//paleidziam serveri , kuris veikia localserver:3000 adresu, ir klausosi http ir kitu requestu nurodytu portu
app.listen(3000, () => {
  console.log('server is running');
});
