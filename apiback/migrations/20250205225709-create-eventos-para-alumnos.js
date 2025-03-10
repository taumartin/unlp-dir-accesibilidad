'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('eventos_alumnos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            eventoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                field: 'evento_id',
                references: {
                    model: 'eventos',
                    key: 'id',
                }
            },
            tipoEventoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'tipo_evento_id',
                references: {
                    model: 'tipos_eventos',
                    key: 'id',
                }
            },
            materiaId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'materia_id',
                references: {
                    model: 'materias',
                    key: 'id',
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'created_at'
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: 'updated_at'
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('eventos_alumnos');
    }
};
