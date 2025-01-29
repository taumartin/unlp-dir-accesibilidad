'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tutor extends Model {
        static associate(models) {
            Tutor.belongsTo(models.Persona, {
                as: 'persona',
                foreignKey: 'personaId',
            });
        }
    }

    Tutor.init({
        id: DataTypes.INTEGER,
        personaId: DataTypes.INTEGER,
        horasAsignadas: DataTypes.SMALLINT,
    }, {
        sequelize,
        modelName: 'Tutor',
        tableName: 'tutores',
    });
    return Tutor;
};
