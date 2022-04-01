module.exports = app => {
  const expensesController = require("./controllers/expenses.controller.js")
  const router = require('express').Router();

  router.route('/')
  .post(expensesController.make)
  .get(expensesController.all);

  router.route('/:id')
  .patch(expensesController.update)
  .delete(expensesController.delete);

  app.use('/api/expenses', router);
}