'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let datas = [];

    let obj1 = {
      description: 'bronze',
      tier_id: 3,
      created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      //createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      //updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
    let obj2 = {
      description: 'silver',
      tier_id: 2,
      created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      //createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      //updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
    let obj3 = {
      description: 'gold',
      tier_id: 1,
      created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      //createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      //updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
    datas.push(obj1)
    datas.push(obj2)
    datas.push(obj3)

     return queryInterface.bulkInsert('Tiers', datas, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
