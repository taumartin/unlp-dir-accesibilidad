'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('semestres', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            anio: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            esPrimerSemestre: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                field: 'es_primer_semestre'
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

        await queryInterface.addIndex('semestres', ['anio', 'es_primer_semestre'], {
            unique: true,
            name: 'unique_anio_es_primer_semestre'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex('semestres', 'unique_anio_es_primer_semestre');
        await queryInterface.dropTable('semestres');
    }
};
