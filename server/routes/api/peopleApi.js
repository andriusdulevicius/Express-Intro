const express = require('express');
const people = require('../../js/peopleData');
const router = express.Router();

//our API -application programming interface

router.get('/', (req, res) => {
  //gauname objektu masyvo json formatu adresa narsykleje
  res.json(people);
});
//get one person
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

module.exports = router;
