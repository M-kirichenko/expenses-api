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
        type: Datatypes.DATE,
        defaultValue: new Date()
      }
    },
    { timestamps: false }
  );
 
 return expenses;
}