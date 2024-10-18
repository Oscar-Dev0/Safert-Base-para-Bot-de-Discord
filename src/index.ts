import { Client, ParseMiddlewares, type ParseClient } from 'seyfert';
import { middlewares } from './utils/lib/middlewares';
import redis from './utils/lib/redis';
import { RedisAdapter } from './utils/lib/RedisAdapter';
import { GetEnv } from './utils/function/env';
import { disabledCache } from './utils/lib/config';
import { PresenceUpdateStatus } from 'seyfert/lib/types';

const client = new Client({

    presence() {
        return {
            since: 0,
            afk: true,
            "status": PresenceUpdateStatus.DoNotDisturb,
            activities: [
                {
                    "name": "with your heart",
                    "type": 3
                }
            ]
        }
    },
    commands: {
        prefix(message) {
            return ['!', '?', '.']
        },
    }
});


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