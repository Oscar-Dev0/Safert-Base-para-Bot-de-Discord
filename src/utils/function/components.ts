import {
    ActionRow as Action,
    BuilderComponents,
    Button,
    ChannelSelectMenu,
    FixedComponents,
    MentionableSelectMenu,
    Modal,
    RoleSelectMenu,
    StringSelectMenu,
    StringSelectOption,
    TextInput,
    UserSelectMenu
} from "seyfert";
import { RestOrArray } from "seyfert/lib/common";
import { ButtonStyle, ChannelType, TextInputStyle } from "seyfert/lib/types";

export function ActionRowBuilder<T extends BuilderComponents>(...components: FixedComponents<T>[]): Action<T> {
    return new Action<T>().setComponents(components);
}

export function ButtonBuilder(customId: string, style: ButtonStyle | keyof typeof ButtonStyle, label?: string, emoji?: string) {
    if (!emoji && !label) throw new Error("El botón debe tener una etiqueta o un emoji");
    if (label && label.length > 80) throw new Error("La etiqueta no puede tener más de 80 caracteres");
    if (customId.length > 100) throw new Error("El ID personalizado no puede tener más de 100 caracteres");

    const button = new Button()
        .setCustomId(customId)
        .setStyle(buttonStyle(style));

    if (emoji) button.setEmoji(emoji);
    if (label) button.setLabel(label);

    return button;
}

export function StringSelectMenuBuilder(customId: string, placeholder: string = "Selecciona una opción.", ...options: RestOrArray<StringSelectOption>) {
    if (customId.length > 100) throw new Error("El ID personalizado no puede tener más de 100 caracteres");
    if (placeholder.length > 150) throw new Error("El marcador de posición no puede tener más de 150 caracteres");
    if (options.length > 25) throw new Error("Los menús de selección solo pueden tener hasta 25 opciones");

    return new StringSelectMenu()
        .setCustomId(customId)
        .setPlaceholder(placeholder)
        .addOption(...options);
}

export function ChannelSelectMenuBuilder(customId: string, placeholder: string = "Selecciona un canal.", channelsType?: ChannelType[]) {
    if (customId.length > 100) throw new Error("El ID personalizado no puede tener más de 100 caracteres");
    if (placeholder.length > 150) throw new Error("El marcador de posición no puede tener más de 150 caracteres");

    const SelectMenu = new ChannelSelectMenu()
        .setCustomId(customId)
        .setPlaceholder(placeholder);

    if (channelsType) SelectMenu.setChannelTypes(channelsType);

    return SelectMenu;
}

export function UserSelectMenuBuilder(customId: string, placeholder: string = "Selecciona un usuario.") {
    if (customId.length > 100) throw new Error("El ID personalizado no puede tener más de 100 caracteres");
    if (placeholder.length > 150) throw new Error("El marcador de posición no puede tener más de 150 caracteres");

    return new UserSelectMenu()
        .setCustomId(customId)
        .setPlaceholder(placeholder);
}

export function RoleSelectMenuBuilder(customId: string, placeholder: string = "Selecciona un rol.") {
    if (customId.length > 100) throw new Error("El ID personalizado no puede tener más de 100 caracteres");
    if (placeholder.length > 150) throw new Error("El marcador de posición no puede tener más de 150 caracteres");

    return new RoleSelectMenu()
        .setCustomId(customId)
        .setPlaceholder(placeholder);
}

export function MentionableSelectMenuBuilder(customId: string, placeholder: string = "Selecciona un rol o usuario.") {
    if (customId.length > 100) throw new Error("El ID personalizado no puede tener más de 100 caracteres");
    if (placeholder.length > 150) throw new Error("El marcador de posición no puede tener más de 150 caracteres");

    return new MentionableSelectMenu()
        .setCustomId(customId)
        .setPlaceholder(placeholder);
}

export function TextInputBuilder(customId: string, label: string, style: TextInputStyle | keyof typeof TextInputStyle, placeholder?: string) {
    if (customId.length > 100) throw new Error("El ID personalizado no puede tener más de 100 caracteres");
    if (label.length > 45) throw new Error("La etiqueta no puede tener más de 45 caracteres");
    if (placeholder && placeholder.length > 100) throw new Error("El marcador de posición no puede tener más de 100 caracteres");

    const textInput = new TextInput()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(textInputStyle(style));

    if (placeholder) textInput.setPlaceholder(placeholder);

    return textInput;
}

export function ModalBuilder(customId: string, title: string, ...inputs: Action<TextInput>[]) {
    if (customId.length > 100) throw new Error("El ID personalizado no puede tener más de 100 caracteres");
    if (title.length > 45) throw new Error("El título no puede tener más de 45 caracteres");

    return new Modal()
        .setCustomId(customId)
        .setTitle(title)
        .setComponents(inputs);
}

function buttonStyle(style: ButtonStyle | keyof typeof ButtonStyle) {
    if (typeof style === "number") return style;
    switch (style) {
        case "Primary": return ButtonStyle.Primary;
        case "Secondary": return ButtonStyle.Secondary;
        case "Success": return ButtonStyle.Success;
        case "Danger": return ButtonStyle.Danger;
        case "Link": return ButtonStyle.Link;
        case "Premium": return ButtonStyle.Premium;
        default: return ButtonStyle.Primary;
    }
}

function textInputStyle(style: TextInputStyle | keyof typeof TextInputStyle) {
    if (typeof style === "number") return style;
    switch (style) {
        case "Short": return TextInputStyle.Short;
        case "Paragraph": return TextInputStyle.Paragraph;
        default: return TextInputStyle.Short;
    }
}
