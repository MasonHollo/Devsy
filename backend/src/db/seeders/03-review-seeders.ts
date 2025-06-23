'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
  {
    userId: 1,
    productId: 2,
    body: "WOW! This is the best product ever!!",
    stars: 5
  },
  {
    userId: 3,
    productId: 2,
    body: "Not what i was looking for. Very disapoited",
    stars: 1
  },
  {
    userId: 3,
    productId: 1,
    body: "This proster is exactly what i wanted!",
    stars: 4
  },
], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [''] }
    }, {});
  }
};
