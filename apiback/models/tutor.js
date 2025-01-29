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
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        personaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            field: 'persona_id',
            references: {
                model: 'personas',
                key: 'id',
            }
        },
        horasAsignadas: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            field: 'horas_asignadas',
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: 'Tutor',
        tableName: 'tutores',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    return Tutor;
};
