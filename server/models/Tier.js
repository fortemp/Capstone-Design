const Sequelize = require('sequelize')//sequlize 갖고옴

module.exports = class Tier extends Sequelize.Model
{
    static init(sequelize)
    {
        return super.init(
            {
                description://이름
                {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                tier_id: //PK
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
                modelName: 'Tier',//모델이름
                tableName: 'Tiers',//테이블명 즉 sql에서 쓰는이름 
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }
    static associate(db)
    {
        db.Tier.hasMany(db.Problem,{foreignKey:'tier_id', sourceKey:'tier_id'});//Tier가 problem을 많이 갖는다 (hasMany)
    }
}