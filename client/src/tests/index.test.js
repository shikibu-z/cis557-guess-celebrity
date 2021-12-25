/*
 * @Description : This is the test file for index.js.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-09 18:42:34
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-09 19:13:03
 */

import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from '../components/LoginComponent';

require('../index');

jest.mock('react-dom', () => ({ render: jest.fn() }));

test('[index] Test if index called ReactDOM correctly', () => {
  expect(ReactDOM.render).toHaveBeenCalledWith(<LoginComponent />, null);
});
