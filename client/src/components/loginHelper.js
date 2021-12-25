/**
 * @description: this function select 10 random number from 0 - 11, as or puzzle
 * index. The order of the puzzle will be shuffled each time.
 * @param {*}
 * @return {*} result : a list of 10 numbers picked.
 */
function randomIndex() {
  const result = [];
  const tmp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  for (let i = 1; i <= 10; i += 1) {
    const idx = Math.floor(Math.random() * (12 - i));
    result.push(tmp[idx]);
    tmp[idx] = tmp[12 - i];
  }
  return result;
}

/**
 * @description: This is to please eslint warning no-alert, worte a custome one.
 * @param {*} message: a string that you want to alert.
 * @return {*}
 */
function customAlert(message) {
  const alertMessage = document.getElementById('altmsg');
  if (alertMessage) {
    alertMessage.innerHTML = message;
  } else {
    const newMessage = document.createElement('p');
    newMessage.id = 'altmsg';
    newMessage.innerHTML = message;
    document.getElementById('title').insertAdjacentElement('afterend', newMessage);
  }
}

/**
 * @description: function that validate user input for username. Only
 * alphanumeric accepted. We will not allow username for 'userList',
 * 'puzzleIndex' and 'currentUser' as they are used as key in localStorage.
 * @param {*}
 * @return {*}
 */
function checkName() {
  const username = document.getElementById('username').value;
  if (username.match(/^[0-9a-zA-z]+$/)) {
    if (username !== 'userList' && username !== 'puzzleIndex' && username !== 'currentUser') {
      // this is to please eslint, do nothing
    } else {
      customAlert('Please use a different username!');
      return false;
    }
  } else if (username === '') {
    customAlert('Please enter a username!');
    return false;
  } else {
    customAlert('Please use alphanumeric username.');
    return false;
  }
  return true;
}

export { checkName, customAlert, randomIndex };
