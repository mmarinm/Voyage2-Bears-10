export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const BOT_MESSAGE = 'BOT_MESSAGE';

export function newUserMessage(messageText) {
  return {
    type: UPDATE_MESSAGE,
    payload: {
      messageText,
      timestamp: new Date(),
      isUserMessage: true
    }
  };
}

export function newBotMessage(messageText) {
  return {
    type: BOT_MESSAGE,
    payload: {
      messageText,
      timestamp: new Date(),
      isUserMessage: false
    }
  };
}
