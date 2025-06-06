
'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Carts';
    return queryInterface.bulkInsert(options, [
  {
    userId: 1,
    productId: 2,
  
  },
  {
    userId: 3,
    productId: 2,
   
  },
  {
    userId: 3,
    productId: 1,

  },
], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Carts';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [''] }
    }, {});
  }
};
