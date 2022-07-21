module.exports = (sequelize, dataTypes) => {
    let alias = 'Roles';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
     
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
        
    };
    let config = {
        timestamps: false
    }
    const Role = sequelize.define(alias, cols, config); 

     Role.associate = function (models) {
        Role.hasMany(models.Users, { 
             as: "users",
             foreignKey: 'role_id'
         })
     }

    return Role
};