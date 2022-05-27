const Sequelize = require('sequelize')//sequlize 갖고옴

module.exports = class Comment extends Sequelize.Model
{
    static init(sequelize)
    {
        return super.init(
            {
                description://내용
                {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                user_id://FK
                {
                    type: Sequelize.UUID,
                    allowNull: false,
                },
                post_id://FK
                {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                commented_date://시간
                {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defalutValue: sequelize.literal('now()'),
                },
                comment_id: //PK
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
                modelName: 'Comment',//모델이름
                tableName: 'comments',//테이블명 즉 sql에서 쓰는이름 
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }
    static associate(db)
    {
        db.Comment.belongsTo(db.User,{foreignKey:'user_id', sourceKey:'user_id',onDelete:'cascade'});//comment는 User에 속한다.
        db.Comment.belongsTo(db.Posting,{foreignKey:'post_id', sourceKey:'post_id',onDelete:'cascade'});//comment는 post에 속한다.
    }
}