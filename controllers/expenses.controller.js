const db = require("../models");
const expenses = db.expenses;

exports.make = (req, res) => {
  if
  (
    !req.body.hasOwnProperty("name") && 
    !req.body.hasOwnProperty("price")
  ) {
    res.status(422);
    res.send({answer: "No data was send"});
  }
  expenses.create(req.body).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(422).send({answer: "Invalid params"});
    console.log(err);
  });
}

exports.all = (req, res) => {
  expenses.findAll()
  .then(data => res.send(data))
  // .catch(err=>{
  //   console.log(err);
  // });
}