export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

export function updateMessages(messageText) {
  return ({
    type: UPDATE_MESSAGE,
    payload: {
      messageText,
      userMessage: true
    }
  });
}
