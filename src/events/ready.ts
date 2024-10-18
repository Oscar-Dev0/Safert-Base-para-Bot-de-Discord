import { createEvent } from "seyfert";
import logger from "../utils/lib/logger";

export default createEvent({
    data: {
        name: "ready",
    },
    run(client) {
        logger.infoWithType("Client", "Ready! Logged in as " + client.tag)
    },
})