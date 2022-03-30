const Sequelize = require('sequelize')//sequlize 갖고옴

module.exports = class Solved extends Sequelize.Model
{
    static init(sequelize)
    {
        return super.init(
            {
                solved_count://이름
                {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                user_id://FK
                {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                problem_id://FK
                {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                solved_id: //PK
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
                modelName: 'Solved',//모델이름
                tableName: 'solveds',//테이블명 즉 sql에서 쓰는이름 
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }
    static associate(db)
    {
        db.Solved.belongsTo(db.User,{foreignKey:'user_id', sourceKey:'user_id'});//Solved가 user에 속함
        db.Solved.belongsTo(db.Problem,{foreignKey:'problem_id', sourceKey:'problem_id'});//Solved가 Problem에 속함
    }
}