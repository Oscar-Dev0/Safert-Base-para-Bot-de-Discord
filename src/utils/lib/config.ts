import { DisabledCache } from "seyfert";
import { GetEnv } from "../function/env";
import { Logger } from "../types/logger";

export const logger_config: Logger = {
    locales: "es-ES",
    timeZone: 'America/Mexico_City',
    hour12: true,
}

export const redis_config = {
    host: GetEnv("RedisHost", "string"),
    port: GetEnv("RedisPort", "number"),
    password: GetEnv("RedisPassword", "string"),
    db: GetEnv("RedisDB", "number"),
};


export const disabledCache: DisabledCache = {
    emojis: true,
    roles: true,
    stageInstances: true,
    onPacket: true,
    stickers: true,
    voiceStates: true,
    messages: true,
    bans: true,
    presences: true,

    guilds: false,
    channels: false,
    threads: false,
    users: false,
    members: false,
}