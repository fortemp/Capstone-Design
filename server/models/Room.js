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
                defaultValue:0,
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
            is_running://방이 돌아가고 있으면 방row색깔을 파란색으로, 인원 모집중이면 초록색으로,
            {
                type:Sequelize.BOOLEAN,
                defaultValue:false,
                allowNull:false
            },
            is_waiting://호스트가 입장을 했냐 안했냐라는뜻, 호스트 입장전이면 방 색깔을 빨간색으로, 아무도 입장 못하게 한다.
            {
                type:Sequelize.BOOLEAN,
                defaultValue:true,
                allowNull:false
            },
            user_id://호스트의 id를 저장하는 컬럼
            {
                allowNull: false,
                type: Sequelize.UUID,
            },
            rounds:
            {
                type:Sequelize.INTEGER,
                defaultValue:1,
                allowNull:false
            },
            room_id://PK
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

    static associate(db)
    {
        db.Room.belongsTo(db.User,{foreignKey:'user_id', sourceKey:'user_id',onDelete:'cascade'});//comment는 User에 속한다.
    }

}