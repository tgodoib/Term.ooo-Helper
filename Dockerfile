FROM oven/bun:slim

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3001

ENTRYPOINT ["bun", "start"]
