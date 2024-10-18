import { Command, CommandContext, Declare, IgnoreCommand } from "seyfert";

@Declare({
    name: "example",
    description: "Example command with prefix.",
    ignore:  IgnoreCommand.Slash,
})

export default class ExamplePrefix extends Command {

    async run(context: CommandContext) {
        context.write({
            content: "Command Solo Prefix.",
        })
    }
}