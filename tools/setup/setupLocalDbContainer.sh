#!/bin/bash
set -e

h1() {
  local BOLD="\033[1m"
  local FG_WHITE="\033[97m"        
  local BG_BLUE="\033[48;5;33m"  
  local RS="\033[0m"              
  local MSG=$1
  echo -e "${BG_BLUE}${FG_WHITE}${BOLD} [$(date +"%H:%M:%S")] ${MSG} ${RS}"
}

h1 "Kill Old Container"
docker kill fb-db-local || true

h1 "Delete Old Container"
docker rm fb-db-local || true

h1 "Delete Old Image"
docker rmi fb/db-local || true
 
h1 "Build DB Image"
docker build --progress=plain -t fb/db-local -f Dockerfile.db .

h1 "Run DB Container"
docker run -d -e 'ACCEPT_EULA=Y' \
-e 'MSSQL_SA_PASSWORD=Dat20112011' \
-p 1401:1433 \
--name fb-db-local \
fb/db-local

echo "Waiting for SQL Server to initialize..."
sleep 10
echo "SQL Server is ready"