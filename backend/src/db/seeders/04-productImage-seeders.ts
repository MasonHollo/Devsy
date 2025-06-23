// https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Test.svg/1200px-Test.svg.png
'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'ProductImages';
    return queryInterface.bulkInsert(options, [
  {
    userId: 1,
    productId: 2,
    url: " https://i.etsystatic.com/8755597/r/il/c22a7d/5604990485/il_1588xN.5604990485_nhi7.jpg",
  
  },
  {
    userId: 3,
    productId: 2,
    url: " https://i.etsystatic.com/8755597/r/il/73e98e/5556884926/il_1588xN.5556884926_i6my.jpg",
   
  },
  {
    userId: 3,
    productId: 1,
    url: " https://i.etsystatic.com/41946255/r/il/2f1d4e/5377275655/il_1588xN.5377275655_8hay.jpg",

  },
    {
    userId: 3,
    productId: 3,
    url: " https://i.etsystatic.com/16699035/r/il/0ada3f/6551356159/il_1588xN.6551356159_ka9d.jpg",

  },
      {
    userId: 3,
    productId: 3,
    url: "https://i.etsystatic.com/16699035/r/il/521c16/6503228658/il_1588xN.6503228658_qgo3.jpg",

  },
], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'ProductImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [''] }
    }, {});
  }
};
