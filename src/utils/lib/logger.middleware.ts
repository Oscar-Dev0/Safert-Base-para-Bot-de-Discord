import { createMiddleware } from "seyfert";
import customLogger from "./logger";

// Función auxiliar para registrar los eventos con mejor formato
const logAction = (actionType: string, middle: any, actionMessage: string) => {
  const { author, customId, fullCommandName } = middle.context;
  const userInfo = `👤 Usuario: ${author.username} (${author.id})`;

  // Combinamos el tipo de acción y el mensaje en un formato más expresivo
  const message = `${userInfo} ha ${actionMessage} ${customId || fullCommandName}`;
  customLogger.infoWithType(actionType, message);
};

// Middleware para registrar acciones con mensajes más expresivos
export const loggerMiddleware = createMiddleware<void>((middle) => {
  const { context } = middle;
  let actionType = '';
  let actionMessage = '';

  switch (true) {
    case context.isMenuUser():
      actionType = 'MenuUser';
      actionMessage = `usado el comando 📜 /(${context.fullCommandName}) en el menú`;
      break;
    case context.isButton():
      actionType = 'Button';
      actionMessage = `presionado el botón 🔘`;
      break;
    case context.isChat():
      actionType = 'Chat';
      actionMessage = `ejecutado el comando 💬 /(${context.fullCommandName}) en el chat`;
      break;
    case context.isModal():
      actionType = 'Modal';
      actionMessage = `enviado el modal 📝`;
      break;
    case context.isMentionableSelectMenu():
      actionType = 'MentionableSelectMenu';
      actionMessage = `seleccionado una opción en el menú de mención 📇`;
      break;
    case context.isChannelSelectMenu():
      actionType = 'ChannelSelectMenu';
      actionMessage = `seleccionado una opción en el menú de canales 📂`;
      break;
    case context.isRoleSelectMenu():
      actionType = 'RoleSelectMenu';
      actionMessage = `seleccionado una opción en el menú de roles 🛡️`;
      break;
    case context.isStringSelectMenu():
      actionType = 'StringSelectMenu';
      actionMessage = `seleccionado una opción en el menú de texto 📑`;
      break;
    case context.isUserSelectMenu():
      actionType = 'UserSelectMenu';
      actionMessage = `seleccionado una opción en el menú de usuarios 👥`;
      break;
    case context.isComponent():
      actionType = 'Component';
      actionMessage = `presionado el componente ⚙️`;
      break;
    default:
      break;
  }

  console.log('Context:', context)
  if (actionType) {
    logAction(actionType, middle, actionMessage);
  }

  // Pasar al siguiente middleware
  middle.next();
});
