import { loggerMiddleware } from "./logger.middleware";


export const middlewares = {
    // La clave es el nombre del middleware que se usará para referenciarlo en el comando
    logger: loggerMiddleware
}