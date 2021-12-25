/*
 * @Description : This is the test function for MainPage component.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-09 17:12:23
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-09 21:28:00
 */

import React from 'react';
import '@testing-library/jest-dom';
import { jest, test, expect } from '@jest/globals';
import user from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import MainPage from '../components/MainPage';

jest.mock('../components/fetchData');
const fetchAPI = require('../components/fetchData');

fetchAPI.fetchPlayer.mockResolvedValue({
  id: 'testID', name: 'test', points: 5, maxpoints: 10,
});
fetchAPI.updatePlayer.mockResolvedValue({

  id: 'testID', name: 'test', points: 6, maxpoints: 10,
});
fetchAPI.fetchLeaders.mockResolvedValue([{
  id: 'testID', name: 'test', points: 6, maxpoints: 10,
}]);

test('[MainPage] test main page', async () => {
  // test render
  const currentUser = 'testID';
  const maxPoints = 10;
  const overAll = 10;
  const puzzleIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  render(<MainPage
    currentUser={currentUser}
    maxPoints={maxPoints}
    overAll={overAll}
    puzzleIndex={puzzleIndex}
  />);
  const report = screen.getByText(/Current Score:/i);
  expect(report).toBeInTheDocument();
  // test handling answer checking - correct
  let option = document.getElementById('optB');
  await waitFor(() => {
    user.click(option);
  });
  let updateReport = screen.getByText(/1/i);
  expect(updateReport).toBeInTheDocument();
  // test handling answer checking - wrong
  option = document.getElementById('optA');
  await waitFor(() => {
    user.click(option);
  });
  updateReport = screen.getByText(/10/i);
  expect(updateReport).toBeInTheDocument();
});
