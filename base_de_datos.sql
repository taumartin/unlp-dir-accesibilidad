CREATE DATABASE TutoriasUNLP;

CREATE TABLE Alumnos(
id bigserial PRIMARY KEY,
nombre varchar(100) NOT NULL,
apellido varchar(100) NOT NULL,
dni int NOT NULL UNIQUE,
legajo varchar(10) NOT NULL UNIQUE,
telefono varchar(15) NOT NULL,
mail varchar(100) NOT NULL,
tiene_certificado boolean NOT NULL DEFAULT false,
situacion text NOT NULL DEFAULT "");

CREATE TABLE Tutores(
id bigserial PRIMARY KEY,
nombre varchar(100) NOT NULL,
apellido varchar(100) NOT NULL,
dni int NOT NULL UNIQUE,
telefono varchar(15) NOT NULL,
mail varchar(100) NOT NULL,
horas_asignadas smallint NOT NULL);

CREATE TABLE Materias(
id bigserial PRIMARY KEY,
nombre varchar(100) NOT NULL UNIQUE,
docentes varchar(200) NOT NULL,
contacto varchar(150) NOT NULL);

CREATE TABLE materias_aprobadas(
id bigserial PRIMARY KEY,
dni_alumno int NOT NULL REFERENCES Alumnos(dni) ON DELETE RESTRICT,
nombre varchar(100) NOT NULL REFERENCES Materias(nombre) ON DELETE RESTRICT,
durante_primer_semestre boolean NOT NULL DEFAULT true,
anio smallint NOT NULL,
dni_tutor int NOT NULL REFERENCES Tutores(dni) ON DELETE RESTRICT,
UNIQUE (dni_alumno,nombre));

CREATE TABLE materias_cursadas(
id bigserial PRIMARY KEY,
dni_alumno int NOT NULL REFERENCES Alumnos(dni) ON DELETE RESTRICT,
nombre varchar(100) NOT NULL REFERENCES Materias(nombre) ON DELETE RESTRICT,
durante_primer_semestre boolean NOT NULL DEFAULT true,
anio smallint NOT NULL,
dni_tutor int NOT NULL REFERENCES Tutores(dni) ON DELETE RESTRICT,
UNIQUE (dni_alumno,nombre,anio,durante_primer_semestre));

CREATE TABLE fechas_importantes(
id bigserial PRIMARY KEY,
nombre varchar(100) NOT NULL REFERENCES Materias(nombre) ON DELETE CASCADE,
fecha date NOT NULL,
descripcion text NOT NULL DEFAULT '');

CREATE TABLE subtitulados(
id bigserial PRIMARY KEY,
dni int NOT NULL REFERENCES Tutores(dni) ON DELETE RESTRICT,
semana date NOT NULL,
link_video varchar(100),
minutos_subtitulando smallint NOT NULL,
UNIQUE (dni,semana));

CREATE TABLE reunion(
id bigserial PRIMARY KEY,
tiempo timestamp NOT NULL,
dni_alumno int NOT NULL REFERENCES Alumnos(dni) ON DELETE RESTRICT,
dni_tutor int NOT NULL REFERENCES Tutores(dni) ON DELETE RESTRICT,
nombre varchar(100) NOT NULL REFERENCES Materias(nombre) ON DELETE RESTRICT,
medio_de_comunicacion varchar(30) NOT NULL,
observaciones text NOT NULL DEFAULT '',
UNIQUE (dni_tutor,tiempo));

CREATE TABLE anotaciones_por_semestre(
id bigserial PRIMARY KEY,
anio smallint NOT NULL,
es_primer_semestre boolean NOT NULL DEFAULT true,
dni int NOT NULL REFERENCES Alumnos(dni) ON DELETE CASCADE,
notas text NOT NULL DEFAULT '',
UNIQUE(anio,es_primer_semestre,dni));

CREATE TABLE acompania_a(
id bigserial PRIMARY KEY,
dni_alumno int NOT NULL REFERENCES Alumnos(dni) ON DELETE RESTRICT,
dni_tutor int NOT NULL REFERENCES Tutores(dni) ON DELETE RESTRICT,
UNIQUE(dni_alumno,dni_tutor));

CREATE TABLE ayuda_en(
id bigserial PRIMARY KEY,
dni int NOT NULL REFERENCES Tutores(dni) ON DELETE RESTRICT,
nombre varchar(100) NOT NULL REFERENCES Materias(nombre) ON DELETE RESTRICT,
UNIQUE (dni,nombre));