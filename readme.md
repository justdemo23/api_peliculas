!readme.md

el grupo 3 feliz mente conformado por los honorables estudiantes:
- gregorio canas (el perdio)
- jesus terrero (alias el ennamora madre)
- dary peguero (alis el dary dev)
- josue Tejada (alias nada)
- Demetrio Reyes (alis el calvo sexy)

creamos una api de cine basica literalmente
con una base de datos en mysql
en el cual creamos una tabla para almacenar las ventas, otra para almacenar las peliculas

la estructura de las tablas son las siguientes:
BASE DE DATOS MY MYSQL: cineDB    

VENTAS:
+------------------+----------+------+-----+---------+----------------+
| Field            | Type     | Null | Key | Default | Extra          |
+------------------+----------+------+-----+---------+----------------+
| id               | int      | NO   | PRI | NULL    | auto_increment |
| fecha_venta      | datetime | NO   |     | NULL    |                |
| pelicula_id      | int      | NO   | MUL | NULL    |                |
| cantidad_tickets | int      | NO   |     | NULL    |                |
| numero_factura   | int      | NO   | UNI | NULL    |                |
| tanda            | time     | NO   |     | NULL    |                |
+------------------+----------+------+-----+---------+----------------+

PELICULAS:
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| id            | int          | NO   | PRI | NULL    | auto_increment |
| titulo        | varchar(255) | NO   |     | NULL    |                |
| duracion      | int          | YES  |     | NULL    |                |
| sala          | int          | YES  |     | NULL    |                |
| clasificacion | varchar(50)  | YES  |     | NULL    |                |
| tanda         | time         | YES  |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+

la api cuenta con los siguientes endpoints:
