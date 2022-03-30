const Sequelize = require('sequelize')//sequlize 갖고옴

module.exports = class Item extends Sequelize.Model
{
    static init(sequelize)
    {
        return super.init(
            {
                name://이름
                {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                price:
                {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                is_onsale:
                {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                item_id: //PK
                {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                },
            },
            {
                sequelize,
                timestamps: true,//생성한날짜, 업데이트한날짜 row를 만들어줌.
                underscored: true,//camel와 _의 차이
                paranoid: true,//deletedAt일자 만들어줌(softdelete)
                modelName: 'Item',//모델이름
                tableName: 'items',//테이블명 즉 sql에서 쓰는이름 
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }
    /*static associate(db)
    {
        db.User.hasMany(db.Comment,{foreignKey:'user_id', sourceKey:'user_id'});//유저가 comment를 많이 갖는다 (hasMany)
        db.User.hasMany(db.Post,{foreignKey:'user_id', sourceKey:'user_id'});//유저가 post를 많이 갖는다 (hasMany)
    }*/
}