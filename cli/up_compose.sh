# dev
cd containerisation
docker compose \
    --env-file env/.env.dev \
    up \
    --detach