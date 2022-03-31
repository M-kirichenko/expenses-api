module.exports = app => {
  const expensesController = require("./controllers/expenses.controller.js")
  const router = require('express').Router();

  router.route('/')
  .post(expensesController.make)
  
  router.route('/:id')
  .delete(expensesController.delete)
  
  app.use('/api/expenses', router);
}