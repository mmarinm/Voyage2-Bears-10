export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const BOT_MESSAGE = 'BOT_MESSAGE';

export function updateMessages(messageText) {
  return ({
    type: UPDATE_MESSAGE,
    payload: {
      messageText,
      userMessage: true
    }
  });
}

export function botMessages(messageText) {
  return ({
    type: BOT_MESSAGE,
    payload: {
      messageText,
      userMessage: false
    }
  });
}
