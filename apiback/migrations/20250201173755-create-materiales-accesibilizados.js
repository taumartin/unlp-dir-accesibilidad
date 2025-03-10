'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('materiales_accesibilizados', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tipoMaterialId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'tipo_material_id',
                references: {
                    model: 'tipos_materiales',
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
            fechaPublicacion: {
                type: Sequelize.DATE,
                allowNull: false,
                field: 'fecha_publicacion',
            },
            titulo: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: '',
            },
            link: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
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
        await queryInterface.dropTable('materiales_accesibilizados');
    }
};
