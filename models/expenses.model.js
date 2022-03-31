module.exports = (sequelize, Datatypes) => {
 const expenses =  sequelize.define(
    "expenses", {
      name: {
        type: Datatypes.STRING
      },
      price: {
        type: Datatypes.FLOAT
      },
      date: {
        type: Datatypes.BIGINT,
        defaultValue: Date.now()
      }
    }
  );
 
 return expenses;
}