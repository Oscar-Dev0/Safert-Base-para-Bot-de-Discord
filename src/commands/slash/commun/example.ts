import { Command, CommandContext, Declare, IgnoreCommand, Options } from "seyfert";
import { ApplicationCommandOptionType } from "seyfert/lib/types";


@Declare({
    name: "example-say", 
    description: "Example command that says what you tell it to.",
    ignore: IgnoreCommand.Message
})
@Options({
    text: {
        type: ApplicationCommandOptionType.String,
        description: "The text to say.",
        required: true
    }
})
export default class ExampleSlash extends Command {

    async run(context: CommandContext) {

        if(!context.interaction) return context.write({
            content: "This command can only be used in a slash command.",
            flags: 64
        });

        const text = context.interaction.data.options?.filter((x)=>x.type == ApplicationCommandOptionType.String).find(option => option.name === "text" )?.value;

        context.write({ content: text });
    }
}