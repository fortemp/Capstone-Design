const Sequelize = require('sequelize')//sequlize 갖고옴

module.exports = class Posting extends Sequelize.Model
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
                post_id: //PK
                {
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                    autoIncrement:true
                },
                title://아이디
                {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                language://언어
                {
                    type: Sequelize.STRING(16),
                    allowNull: true,
                },
                view:
                {
                    type: Sequelize.INTEGER,
                    defaultValue:0,
                },
                user_id: //FK
                {
                    allowNull: false,
                    type: Sequelize.UUID,
                },
            },
            {
                sequelize,
                timestamps: true,//생성한날짜, 업데이트한날짜 row를 만들어줌.
                underscored: true,//camel와 _의 차이
                paranoid: true,//deletedAt일자 만들어줌(softdelete)
                modelName: 'Posting',//모델이름
                tableName: 'postings',//테이블명 즉 sql에서 쓰는이름 
                charset: 'utf8',
                collate: 'utf8_general_ci',
                initialAutoIncrement: 1,
            });
    }
    static associate(db)
    {
        db.Posting.belongsTo(db.User,{foreignKey:'user_id', sourceKey:'user_id',onDelete:'cascade'});//Post는 User에 속한다.
        db.Posting.hasMany(db.Comment,{foreignKey:'post_id',sourceKey:'post_id'});//post는 많은 comment를 갖는다.
    }
}