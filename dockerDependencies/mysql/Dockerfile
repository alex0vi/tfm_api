FROM mysql:5.7.19

COPY init_db.sql /docker-entrypoint-initdb.d/init_db.sql

RUN chmod +x /docker-entrypoint-initdb.d/init_db.sql
