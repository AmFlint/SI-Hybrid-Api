# Deploy application and build docker-compose
git pull origin master
docker-compose build
docker-compose down
docker-compose up