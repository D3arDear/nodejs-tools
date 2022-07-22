docker kill revival-mongo ;
docker rm revival-mongo ;
docker run -itd --net=revival --name revival-mongo  \
--restart=always --privileged  \
-v ~/revival/mongo/data:/data/db  \
-v ~/revival/mongo/conf:/data/configdb  \
-v ~/revival/mongo/logs:/data/log/  \
-v ~/revival/mongo/init:/data/init  \
-v ~/revival/mongo/backup:/data/backup  \
mongo -f /data/configdb/mongod.conf  \
--bind_ip_all &&
echo 'Docker complete.'