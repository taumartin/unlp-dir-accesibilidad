CREATE DATABASE tutorias_unlp;

CREATE TABLE personas
(
    id       bigserial PRIMARY KEY,
    nombre   varchar(100) NOT NULL,
    apellido varchar(100) NOT NULL,
    dni      int          NOT NULL UNIQUE,
    legajo   varchar(10)  NOT NULL UNIQUE,
    telefono varchar(25)  NOT NULL,
    mail     varchar(100) NOT NULL
);

CREATE TABLE alumnos
(
    id                bigserial PRIMARY KEY,
    persona_id        bigserial NOT NULL UNIQUE,
    tiene_certificado boolean   NOT NULL DEFAULT false,
    situacion         text      NOT NULL DEFAULT '',
    FOREIGN KEY (persona_id) REFERENCES personas (id) ON DELETE RESTRICT
);

CREATE TABLE tutores
(
    id              bigserial PRIMARY KEY,
    persona_id      bigserial NOT NULL UNIQUE,
    horas_asignadas smallint  NOT NULL,
    FOREIGN KEY (persona_id) REFERENCES personas (id) ON DELETE RESTRICT
);

CREATE TABLE materias
(
    id       bigserial PRIMARY KEY,
    codigo   varchar(20)  NOT NULL UNIQUE,
    nombre   varchar(100) NOT NULL,
    docentes varchar(200) NOT NULL,
    contacto varchar(200) NOT NULL
);

CREATE TABLE materias_aprobadas
(
    id                      bigserial PRIMARY KEY,
    id_alumno               bigserial NOT NULL REFERENCES alumnos (id) ON DELETE RESTRICT,
    id_materia              bigserial NOT NULL REFERENCES materias (id) ON DELETE RESTRICT,
    durante_primer_semestre boolean   NOT NULL DEFAULT true,
    anio                    smallint  NOT NULL,
    id_tutor                bigserial NOT NULL REFERENCES tutores (id) ON DELETE RESTRICT,
    UNIQUE (id_alumno, id_materia)
);

CREATE TABLE materias_cursadas
(
    id                      bigserial PRIMARY KEY,
    id_alumno               bigserial NOT NULL REFERENCES alumnos (id) ON DELETE RESTRICT,
    id_materia              bigserial NOT NULL REFERENCES materias (id) ON DELETE RESTRICT,
    durante_primer_semestre boolean   NOT NULL DEFAULT true,
    anio                    smallint  NOT NULL,
    id_tutor                bigserial NOT NULL REFERENCES tutores (id) ON DELETE RESTRICT,
    UNIQUE (id_alumno, id_materia, anio, durante_primer_semestre)
);

CREATE TABLE fechas_importantes
(
    id          bigserial PRIMARY KEY,
    id_materia  bigserial    NOT NULL REFERENCES materias (id) ON DELETE CASCADE,
    fecha       date         NOT NULL,
    descripcion varchar(200) NOT NULL DEFAULT ''
);

CREATE TABLE subtitulados
(
    id                   bigserial PRIMARY KEY,
    id_tutor             bigserial NOT NULL REFERENCES tutores (id) ON DELETE RESTRICT,
    semana               date      NOT NULL,
    link_video           varchar(100),
    minutos_subtitulando smallint  NOT NULL,
    UNIQUE (id_tutor, semana)
);

CREATE TABLE reunion
(
    id                    bigserial PRIMARY KEY,
    tiempo                timestamp   NOT NULL,
    id_alumno             bigserial   NOT NULL REFERENCES alumnos (id) ON DELETE RESTRICT,
    id_tutor              bigserial   NOT NULL REFERENCES tutores (id) ON DELETE RESTRICT,
    id_materia            bigserial   NOT NULL REFERENCES materias (id) ON DELETE RESTRICT,
    medio_de_comunicacion varchar(30) NOT NULL,
    observaciones         text        NOT NULL DEFAULT '',
    UNIQUE (id_tutor, tiempo)
);

CREATE TABLE anotaciones_por_semestre
(
    id                 bigserial PRIMARY KEY,
    anio               smallint  NOT NULL,
    es_primer_semestre boolean   NOT NULL DEFAULT true,
    id_alumno          bigserial NOT NULL REFERENCES alumnos (id) ON DELETE CASCADE,
    notas              text      NOT NULL DEFAULT '',
    UNIQUE (anio, es_primer_semestre, id_alumno)
);

CREATE TABLE acompania_a
(
    id        bigserial PRIMARY KEY,
    id_alumno int NOT NULL REFERENCES alumnos (id) ON DELETE RESTRICT,
    id_tutor  int NOT NULL REFERENCES tutores (id) ON DELETE RESTRICT,
    UNIQUE (id_alumno, id_tutor)
);

CREATE TABLE ayuda_en
(
    id         bigserial PRIMARY KEY,
    id_alumno  bigserial NOT NULL REFERENCES tutores (id) ON DELETE RESTRICT,
    id_materia bigserial NOT NULL REFERENCES materias (id) ON DELETE RESTRICT,
    UNIQUE (id_alumno, id_materia)
);
