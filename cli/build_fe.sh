cd .docker

export FE_DOCKERFILE="frontend/Dockerfile.frontend.dev"
export FE_IMAGE="frontend-dev"
export FE_VERSION="1.0.0"

docker build \
    --file $FE_DOCKERFILE \
    --tag $FE_IMAGE:$FE_VERSION \
    ../frontend \
    --no-cache \
