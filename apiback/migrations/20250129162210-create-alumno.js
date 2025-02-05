'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('alumnos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            personaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                field: 'persona_id',
                references: {
                    model: 'Persona',
                    key: 'id',
                }
            },
            legajo: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
            },
            tieneCertificado: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
                field: 'tiene_certificado',
            },
            situacion: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: '',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'created_at',
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'updated_at',
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('alumnos');
    }
};
