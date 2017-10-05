export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

export function updateMessages(message) {
  //console.log("MESSAGE = " + message);
  return ({
    type: UPDATE_MESSAGE,
    payload: message
  });
}
