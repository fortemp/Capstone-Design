const Sequelize = require('sequelize');

module.exports = class Room extends Sequelize.Model
{
    static init(sequelize)
    {
        return super.init({
            title:
            {
                type: Sequelize.STRING(64),
                allowNull:false,
            },
            max_people:
            {
                type: Sequelize.INTEGER,
                allowNull:false,
            },
            people:
            {
                type: Sequelize.INTEGER,
                allowNull:false,
            },
            password:
            {
                type: Sequelize.STRING(100),
                allowNull:true,
            },
            language:
            {
                type: Sequelize.STRING(16),
                allowNull:false,
            },
            ispass:
            {
                type:Sequelize.INTEGER,//0또는 1만 넣도록 한다
                allowNull:false,
            },
            is_running:
            {
                type:Sequelize.BOOLEAN,
                defaultValue:false,
                allowNull:false
            },
            room_id: //PK
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
            paranoid: true,//deletedAt일자 만들어줌(softdelete)
            modelName: 'Room',//모델이름
            tableName: 'rooms',//테이블명 즉 sql에서 쓰는이름 
            charset: 'utf8',
            collate: 'utf8_general_ci',
        }
        )
    }
}