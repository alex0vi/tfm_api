#!/bin/sh

# Run the MySQL container, with a database named 'apiv2' and credentials
# for a root user which can access it.
echo "Starting DB..."  
docker run --name db -d \
    -e MYSQL_ROOT_PASSWORD=addaps123 \
    -e MYSQL_DATABASE=apiv2 
    # -e MYSQL_USER=root -e MYSQL_PASSWORD=addaps123 \
    -p 3306:3306 \
    mysql

# Wait for the database service to start up.
echo "Waiting for DB to start up..."  
docker exec db mysqladmin --silent --wait=30 -uroot -paddaps123 ping || exit 1

# Run the setup script.
echo "Setting up initial data..."  
docker exec -i db mysql -uroot -paddaps123 apiv2 < setup.sql  