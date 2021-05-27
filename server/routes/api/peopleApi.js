const express = require('express');
const people = require('../../js/peopleData');
const router = express.Router();
let personId = 6;
//express.Router() - pagalbinis metodas, padedantis sureguliuoti kelius tarp failu.

//our API -application programming interface
//get all people Endpoint
router.get('/', (req, res) => {
  //gauname objektu masyvo json formatu adresa narsykleje
  res.json(people);
});

//get one person Endpoint
//cia :id bus sukurtas parametras, kuri galesime naudoti funkcijos viduje , o paramId bus tas id kuri paduosime adrese localhost:3000/api/people/it55   Siuo atveju paramId = it55

router.get('/:id', (req, res) => {
  const paramId = req.params.id;
  const found = people.find((person) => person.id === paramId);
  // res.send(`id you are looking for is: ${paramId}`);

  if (!found) {
    res.status(404).json({ errorMsg: `You have entered invalid id!Try again!` });
  }
  res.json(found);
});

//Create one person Endpoint
//gauti duomenys is vartotojo formas arba json pavidalu ir sukuri nauja vartotoja tarp savo peopleData

router.post('/', (req, res) => {
  console.log('This was send to server in body: ');
  //prideti nauja person objekta i people arr
  const newPerson = {
    id: (++personId).toString(),
    name: req.body.name,
    surname: req.body.surname,
  };
  people.push(newPerson);
  res.json(people);
});

//edit  one person Endpoint
//put requestas padeda rasti 1 person ir paeditinti
router.put('/:id', (req, res) => {
  console.log('vykdomas put requestas');

  const paramId = req.params.id;
  const found = people.find((person) => person.id === paramId);

  if (!found) {
    res.status(404).json({ errorMsg: `You have entered invalid id!Try again!` });
  }
  const { name, surname } = req.body;
  //atnaujinti zmogaus duomenis
  found.name = name || found.name;
  found.surname = surname || found.surname; //jei turim paeditinta pavarde ja naudojam , jei neturim , naudojam tai kas buvo
  res.json({ msg: 'user was updated', updatedUser: found });
});

module.exports = router;
