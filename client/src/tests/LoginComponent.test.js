/*
 * @Description : This is the test file for the Login component.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-08 13:39:21
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-09 21:26:50
 */

import React from 'react';
import '@testing-library/jest-dom';
import { jest, test, expect } from '@jest/globals';
import user from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import LoginComponent from '../components/LoginComponent';

jest.mock('../components/fetchData');
jest.mock('../components/MainPage', () => () => <div />);
jest.mock('../components/GameStats', () => () => <div />);
const fetchAPI = require('../components/fetchData');

fetchAPI.addPlayer.mockResolvedValue('testID');
fetchAPI.fetchPlayer.mockResolvedValue({
  id: 'testID', name: 'test', points: 0, maxpoints: 10,
});
fetchAPI.fetchLeaders.mockResolvedValue([{
  id: 'testID', name: 'test', points: 0, maxpoints: 10,
}]);

test('[LoginComponent] test login component', async () => {
  // test render
  render(<LoginComponent />);
  const title = screen.getByText(/Guess the Celebrity/i);
  expect(title).toBeInTheDocument();
  // test handling input and login
  const input = document.getElementById('username');
  input.setAttribute('value', 'junyong');
  const loginButton = document.getElementById('loginb');
  await waitFor(() => {
    user.click(loginButton);
  });
  expect(document.getElementById('logoutb')).not.toBeNull();
  // test handling logout
  const logoutButton = document.getElementById('logoutb');
  await waitFor(() => {
    user.click(logoutButton);
  });
  expect(document.getElementById('loginb')).not.toBeNull();
});
