'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Products';
    return queryInterface.bulkInsert(options, [
  {
    name: "testing",
    description: "testthesthtest",
    userId: 1,
    price: 20
  },
  {
    name: "products",
    description: "testthesthtest",
    userId: 1,
    price: 20
  },
  {
    name: "testprodct",
    description: "testthesthtest",
    userId: 1,
    price: 20
  },
], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Products';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [''] }
    }, {});
  }
};
