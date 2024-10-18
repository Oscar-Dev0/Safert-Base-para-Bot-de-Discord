import { Embed } from "seyfert";
import { ColorResolvable, EmbedColors } from "seyfert/lib/common";

export function EmbedBuilder(color: ColorResolvable = EmbedColors.Default, title?: string, description?: string) {
    const embed = new Embed().setColor(color);

    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);

    return embed;
}

export function EmbedSuccess(title: string, description: string) {
    return EmbedBuilder(EmbedColors.Green, title, description);
}

export function EmbedError(title: string, description: string) {
    return EmbedBuilder(EmbedColors.Red, title, description);
}

export function EmbedWarning(title: string, description: string) {
    return EmbedBuilder(EmbedColors.Yellow, title, description);
}

export function EmbedInfo(title: string, description: string) {
    return EmbedBuilder(EmbedColors.Blue, title, description);
}
