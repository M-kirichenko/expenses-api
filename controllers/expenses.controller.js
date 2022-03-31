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

exports.delete = (req, res) => {
  const {id} = req.params;

  expenses.destroy({
    where: {id}
  })
  .then(affected => {
    if(affected > 0) {
      res.send({
        answer: `Expense with id:${id} was successfully deleted!`
      });
    } else {
      res.status(404);
      res.send({answer: `Expense with id:${id} wasn't found!`});
    }
  })
  .catch(err => {
    res.status(422).send({answer: "Invalid params"});
    console.log(err);
  });
}