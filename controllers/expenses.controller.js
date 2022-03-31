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

exports.update = (req, res) => {
  const {id} = req.params;
  const {body} = req;
  const {name, date, price} = body;
  let cols = {};

  if(name) cols = {name};

  if(date) cols = {...cols, date};

  if(price) cols = {...cols, price};

  if(
    !cols.hasOwnProperty("name") && 
    !cols.hasOwnProperty("date") &&
    !cols.hasOwnProperty("price")
    ) {
    res.status(422).send({answer: "No params were send!"});
  } else{
    expenses.update(
      cols,
      {where: {id}}
    )
    .then(affected => {
      if(affected > 0) {
          res.send({answer: `Expense with id:${id} was successfully updated!`});
      } else {
        res.status(404).send({
          answer: `Expense with id:${id} wasn't found!`
        });
      }
    })
    .catch(err => {
      res.status(422).send({answer: "Invalid params"});
      console.log(err);
    });
  }
}