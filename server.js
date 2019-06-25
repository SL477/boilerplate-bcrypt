'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();

fccTesting(app); //For FCC testing purposes

const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';


//START_ASYNC -do not remove notes, place code between correct pair of notes.
const bcrypt = require('bcrypt');
app.get("/", function (req, res) {
  bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    console.log(hash);
    
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
      console.log(res);
    });
    
    res.send(hash);
  });
});

app.get("/password/:test", function (req, res) {
  bcrypt.hash(req.params.test, saltRounds, (err, hash) => {
    console.log(hash);
    res.send(hash);
  });
});

//END_ASYNC

//START_SYNC
app.get("/sync", function (req, res) {
  var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
  console.log(hash);
  
  var result = bcrypt.compareSync(myPlaintextPassword, hash);
  console.log(result);
  
  res.send(hash + " " + result);
});


//END_SYNC


app.listen(process.env.PORT || 3000, () => {});
