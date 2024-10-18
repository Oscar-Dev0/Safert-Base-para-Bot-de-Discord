import Redis from "ioredis";
import { redis_config } from "./config";
import logger from "./logger";

export class ClientRedis extends Redis {
    constructor(host: string, port: number) {
        if (!host || !port) {
            throw new Error("Se deben proporcionar el host y el puerto.");
        }

        super(port, host, {
            password: redis_config.password,
            db: redis_config.db || 0,
        });

        this.configurarManejadoresDeEventos();
    }

    private configurarManejadoresDeEventos() {
        this.on("ready", () => {
            logger.infoWithType("REDIS", "Conectado al servidor Redis.");
        }).on("error", (err) => {
            logger.errorWithType("REDIS", err.message);
        });
    }
}

function start() {
    const { host, port } = redis_config;

    if (!host || !port) {
        return undefined;
    }

    return new ClientRedis(host, port);
}

export default start();
