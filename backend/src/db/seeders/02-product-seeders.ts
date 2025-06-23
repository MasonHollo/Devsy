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
    name: "San Francisco Giants Poster",
    description: "Poster of The San Francisco Giants ballpark.",
    userId: 1,
    price: 15
  },
  {
    name: "San Francisco Giants drink costers.",
    description: "Slate costers laser etched with memoriable moments form past seasons of the San Francisco Giants.",
    userId: 1,
    price: 80
  },
  {
    name: "J.T. Snow Bobblehead",
    description: "San Francisco Giants firstbasemen from 1997-2005 Bobblehead with box!",
    userId: 1,
    price: 120
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
