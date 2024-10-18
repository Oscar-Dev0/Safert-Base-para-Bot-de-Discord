import { Client, ParseMiddlewares, type ParseClient } from 'seyfert';
import { middlewares } from './utils/lib/middlewares';
import redis from './utils/lib/redis';
import { RedisAdapter } from './utils/lib/RedisAdapter';
import { GetEnv } from './utils/function/env';
import { disabledCache } from './utils/lib/config';

const client = new Client();


client.setServices(
    {
        middlewares,
        cache: redis ? {
            adapter: new RedisAdapter(redis),
            disabledCache: GetEnv('BotDisabledCache', "boolean") ? disabledCache : undefined
        } : undefined
    }
)


client.start()
    .then(() => {
        client.uploadCommands()
    });

declare module 'seyfert' {
    interface UsingClient extends ParseClient<Client<true>> { }

    interface RegisteredMiddlewares
        extends ParseMiddlewares<typeof middlewares> { }
}