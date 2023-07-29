#!/bin/bash
set -e

# Init Mongo service in background 
mongod --fork --bind_ip_all --port 27017 --logpath /data/db/mongodb.log

# Sleep ten second while mongo start
sleep 10

# create the user collection if don't exists 
mongosh --eval 'db = db.getSiblingDB("javascript_graphql_simple"); if (!db.users.countDocuments()) { db.createCollection("users"); }'

# Import user collection 
mongoimport --host localhost --port 27017 --db javascript_graphql_simple --collection users --file ./json/users.json --jsonArray

# Import permissions collection 
mongoimport --host localhost --port 27017 --db javascript_graphql_simple --collection permissions --file ./json/permissions.json --jsonArray

# Import roles collection 
mongoimport --host localhost --port 27017 --db javascript_graphql_simple --collection roles --file ./json/roles.json --jsonArray

# Keep script running to keep MongoDB connection open
tail -f /dev/null
