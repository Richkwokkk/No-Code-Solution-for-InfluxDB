# dev
cd containerisation
export FE_DOCKERFILE="frontend/Dockerfile.dev"
export FE_IMAGE="frontend-dev"
export FE_VERSION="1.0.0"
export EVN_FILE="env/.env.dev"

docker build \
    --file $FE_DOCKERFILE \
    --tag $FE_IMAGE:$FE_VERSION \
    ../frontend \
    --no-cache \
    > fe_build.log 2>&1

docker compose \
    --env-file ${EVN_FILE} \
    up \
    --detach