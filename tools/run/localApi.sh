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

h1 "Remove existing network"
docker network rm fb-network || true

h1 "Build images"
docker kill fb-api-local || true 

h1 "Remove existance containers"
docker rm fb-api-local || true 

h1 "Remove existance images"
docker rmi fb/api-local || true

h1 "Create network"
docker network create fb-network

h1 "Build images"
docker build --progress=plain -t fb/api-local -f Dockerfile.api .

h1 "Run container" 
docker run --network fb-network -d -p 1402:1434 --name fb-api-local fb/api-local
