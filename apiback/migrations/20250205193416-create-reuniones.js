'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('reuniones', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fechaYHora: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'fecha_y_hora',
            },
            medioComunicacionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'medio_comunicacion_id',
                references: {
                    model: 'medios_comunicacion',
                    key: 'id',
                }
            },
            tutorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'tutor_id',
                references: {
                    model: 'tutores',
                    key: 'id',
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addIndex('reuniones', ['tutor_id', 'fecha_y_hora'], {
            unique: true,
            name: 'unique_tutor_id_fecha_y_hora'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex('reuniones', 'unique_tutor_id_fecha_y_hora');
        await queryInterface.dropTable('reuniones');
    }
};
