/*
 * @Description : This is the unit test file for login helper functions.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-07 20:08:41
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-08 13:54:42
 */

const login = require('../components/loginHelper');

test('[randomIndex]: return 10 random indices in an array', () => {
  // execute
  expect(login.randomIndex().length).toBe(10);
});

test('[customAlert]: test if an alert message is added.', () => {
  // set document for needs
  const title = document.createElement('div');
  title.setAttribute('id', 'title');
  document.body.appendChild(title);
  // execute
  login.customAlert('[TEST]: This is an alert message.');
  const result = document.getElementById('altmsg');
  expect(result).not.toBeNull();
  expect(result.innerHTML).toEqual('[TEST]: This is an alert message.');
});

test('[checkName]: check if username is alphanumeric', () => {
  // set document for needs
  const input = document.createElement('input');
  input.setAttribute('id', 'username');
  input.setAttribute('value', 'junyong@cis557');
  document.body.appendChild(input);
  // execute fail case
  let result = login.checkName();
  expect(result).toEqual(false);
  // execute success case
  document.getElementById('username').value = 'junyong';
  result = login.checkName();
  expect(result).toEqual(true);
});
