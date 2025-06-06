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
    body: "hajskfjbajdfahjfajdf",
    stars: 20
  },
  {
    userId: 3,
    productId: 2,
    body: "hajskfjbajdfahjfajdf",
    stars: 2
  },
  {
    userId: 3,
    productId: 1,
    body: "hajskfjbajdfahjfajdf",
    stars: 21
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
