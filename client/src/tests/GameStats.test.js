/*
 * @Description : This is the test file for the GameStats component.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-09 17:47:44
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-09 21:25:53
 */

import React from 'react';
import '@testing-library/jest-dom';
import { jest, test, expect } from '@jest/globals';
import user from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import GameStats from '../components/GameStats';

jest.mock('../components/fetchData');
const fetchAPI = require('../components/fetchData');

fetchAPI.fetchAllPlayers.mockResolvedValue([{
  id: 'testID', name: 'test1', points: 5, maxpoints: 10,
}]);
fetchAPI.fetchLeaders.mockResolvedValue([{
  id: 'testID', name: 'test2', points: 6, maxpoints: 10,
}]);

test('[GameStats] test game stats component', async () => {
  // test render
  render(<GameStats />);
  const statText = screen.getByText(/Top 5 Leaders/i);
  expect(statText).toBeInTheDocument();
  // test handling get all players
  const statsButton = document.getElementById('statsb');
  await waitFor(() => {
    user.click(statsButton);
  });
  let report = screen.getByText(/test1: 10/i);
  expect(report).toBeInTheDocument();
  // test handling get all leaders
  const leadersButton = document.getElementById('leadersb');
  await waitFor(() => {
    user.click(leadersButton);
  });
  report = screen.getByText(/test2: 10/i);
  expect(report).toBeInTheDocument();
});
