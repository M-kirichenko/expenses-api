const db = require("../models");
const expenses = db.expenses;

const msg = (ok, msg = false) => {
  return msg ? {ok, msg} : {ok};
}
exports.make = (req, res) => {
  if
  (
    !req.body.hasOwnProperty("name") && 
    !req.body.hasOwnProperty("price")
  ) {
    res.status(422);
    res.send(msg(false, "No data was send"));
  }

  expenses.create(req.body).then(data => {
    res.send( msg(true) );
  })
  .catch(err => {
    res.status(422).send( msg(false, "Invalid params") );
  });
}

exports.delete = (req, res) => {
  const { id } = req.params;

  expenses.destroy({
    where: { id }
  })
  .then(affected => {
    if(affected > 0) {
      res.send(msg(true));
    } else {
      res.status(404);
      res.send( msg(false, `Expense with id:${id} wasn't found!`) );
    }
  })
  .catch(err => {
    res.status(422).send( msg(false, "Invalid params") );
  });
}

exports.update = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { name, date, price } = body;
  let cols = {};

  if(name) cols = {name};

  if(date) cols = {...cols, date};

  if(price) cols = {...cols, price};

  if(
    !cols.hasOwnProperty("name") && 
    !cols.hasOwnProperty("date") &&
    !cols.hasOwnProperty("price")
    ) {
    res.status(422).send( msg(false, "No params were send!") );
  } else {
    expenses.update(
      cols,
      { where: { id } }
    )
    .then(affected => {
      if(affected > 0) {
          res.send(msg(true));
      } else {
        res.status(404).send( msg(`Expense with id:${id} wasn't found!`) );
      }
    })
    .catch(err => {
      res.status(422).send( msg(false, "Invalid params") );
    });
  }
}

exports.all = (req, res) => {
  expenses.findAll()
  .then(data => res.send(data));
}