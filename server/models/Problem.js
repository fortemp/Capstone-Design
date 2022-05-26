const Sequelize = require('sequelize')//sequlize 갖고옴

module.exports = class Problem extends Sequelize.Model
{
    static init(sequelize)
    {
        return super.init(
            {
                problem_id: //PK
                {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                    autoIncrement:true
                },
                tier_id://이름
                {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                dirname://이름
                {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                description://이름
                {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,//생성한날짜, 업데이트한날짜 row를 만들어줌.
                underscored: true,//camel와 _의 차이
                paranoid: true,//deletedAt일자 만들어줌(softdelete)
                modelName: 'Problem',//모델이름
                tableName: 'Problems',//테이블명 즉 sql에서 쓰는이름 
                charset: 'utf8',
                collate: 'utf8_general_ci',
                initialAutoIncrement: 1001,
            });
    }
    static associate(db)
    {
        db.Problem.belongsTo(db.Tier,{foreignKey:'tier_id', sourceKey:'tier_id'});//problem은 Tier에 속함
        db.Problem.hasMany(db.Solved,{foreignKey:'problem_id', sourceKey:'problem_id'});//problem이 solved를 많이 갖는다.
    }
}