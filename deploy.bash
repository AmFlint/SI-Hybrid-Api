# Deploy application and build docker-compose
git pull origin master
docker-compose build
docker-compose down
docker-compose up -d
sleep 10
docker exec api_urbex-api_1 npm run migrate