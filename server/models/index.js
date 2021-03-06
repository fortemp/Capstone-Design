'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';//개발모드로 작업
const config = require(__dirname + '/../config/config.json')[env];//sequelize 환경변수 경로

const User = require('./User');
const Room = require('./Room');
const Tier = require('./Tier');
const Comment = require('./Comment');
const Item = require('./Item');
const Posting = require('./Posting');
const Problem = require('./Problem');
const Solved = require('./Solved');

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
/* 
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});*/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Room = Room;
db.Tier = Tier;
db.Comment = Comment;
db.Item = Item;
db.Posting = Posting;
db.Problem = Problem;
db.Solved = Solved;

User.init(sequelize);
Room.init(sequelize);
Tier.init(sequelize);
Comment.init(sequelize);
Item.init(sequelize);
Posting.init(sequelize);
Problem.init(sequelize);
Solved.init(sequelize);

User.associate(db);
Posting.associate(db);
Comment.associate(db);
Problem.associate(db);
Tier.associate(db);

module.exports = db;
