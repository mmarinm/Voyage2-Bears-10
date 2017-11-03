export const USER_MESSAGE = 'USER_MESSAGE';
export const BOT_MESSAGE = 'BOT_MESSAGE'

export function newUserMessage(messageText) {
  return {
    type: USER_MESSAGE,
    payload: {
      messageText,
      timestamp: new Date(),
      isUserMessage: true
    }
  };
}

export function newBotMessage(messageText) {
  console.log(messageText, 'messageText from action');
  return {
    type: BOT_MESSAGE,
    payload: {
      messageText,
      timestamp: new Date(),
      isUserMessage: false
    }
  };
}
