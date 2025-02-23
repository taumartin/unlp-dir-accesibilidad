'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            // Nada.
        }

        isActive() {
            return this.estaActivo;
        }
    }

    Usuario.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: { // Username.
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
        },
        estaActivo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'esta_activo',
            defaultValue: true,
        },
        contrasenia: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        esAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'es_admin',
            defaultValue: false,
        },
        fotoDePerfil: {
            type: DataTypes.STRING(255),
            field: 'foto_de_perfil',
        }
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Usuario;
};
