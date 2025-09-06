echo "Stopping server..."
kill $(lsof -t -i:8080) || true
pkill -f "node dist/src/index.js" || true
docker system prune --all || true
docker volume prune --force || true