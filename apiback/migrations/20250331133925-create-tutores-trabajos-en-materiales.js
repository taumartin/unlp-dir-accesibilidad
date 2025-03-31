'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tutores_trabajos_en_materiales', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            tutorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'tutor_id',
                references: {
                    model: 'tutores',
                    key: 'id',
                },
            },
            materialAccesibilizadoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'material_accesibilizado_id',
                references: {
                    model: 'materiales_accesibilizados',
                    key: 'id',
                },
            },
            minutosTrabajados: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'minutos_trabajados',
                validate: {
                    min: 1,
                    max: 1440,
                },
            },
            fecha: {
                type: Sequelize.DATEONLY,
                allowNull: false,
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
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tutores_trabajos_en_materiales');
    }
};
