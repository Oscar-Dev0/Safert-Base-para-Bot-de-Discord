import { Command, CommandContext, Declare } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";

@Declare({
    name: "test",
    description: "test command",
})

export default class Test extends Command{

    run(context: CommandContext) {
        context.write({
            content: "test",
            flags: MessageFlags.Ephemeral
        })
    }
}