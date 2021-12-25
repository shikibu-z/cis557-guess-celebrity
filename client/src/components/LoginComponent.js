/*
 * @Description : This is the login page that recored users and setup a inital
 * environment for the user to play.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-10-28 14:53:23
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-22 21:04:06
 */

import React, { useState } from 'react';
import { checkName, randomIndex } from './loginHelper';
import MainPage from './MainPage';
import GameStats from './GameStats';
import {
  fetchPlayer, fetchLeaders, addPlayer, updatePlayer, deletePlayer,
} from './fetchData';

function LoginComponent() {
  const [userState, setUserState] = useState([false, '', 0, 0, []]);
  // login event, check name and initialize
  const handleLogin = () => {
    const validName = checkName();
    if (validName) {
      const alertMessage = document.getElementById('altmsg');
      if (alertMessage) {
        alertMessage.remove();
      }
      const username = document.getElementById('username').value;
      const data = { name: username, points: 0, maxpoints: 0 };
      addPlayer(data).then((response) => {
        fetchPlayer(response).then((userObj) => {
          fetchLeaders(5).then((leaders) => {
            let overAll = 0;
            if (leaders.length !== 0) {
              overAll = leaders[0].maxpoints;
            }
            setUserState([true, response, userObj.maxpoints, overAll, randomIndex()]);
          });
        });
      });
    }
  };
  // logout event keep track of history
  const handleLogout = () => {
    fetchPlayer(userState[1]).then((response) => {
      const updateData = response;
      delete updateData.id;
      updateData.points = 0;
      updatePlayer(userState[1], updateData);
      setUserState([false, '', 0, 0, []]);
    });
  };
  // delete, remove user info
  const handleDelete = () => {
    deletePlayer(userState[1]).then(setUserState([false, '', 0, 0, []]));
  };
  return (
    !userState[0]
      ? (
        <div>
          <nav>
            <h1 id="title">Guess the Celebrity</h1>
          </nav>
          <form>
            <input type="text" id="username" placeholder="Enter username" />
            <button type="button" id="loginb" onClick={handleLogin}>Login</button>
          </form>
        </div>
      )
      : (
        <div>
          <nav>
            <h1 id="title">Guess the Celebrity</h1>
            <button type="button" id="logoutb" onClick={handleLogout}>Logout</button>
            <button type="button" id="deleteb" onClick={handleDelete}>Delete User</button>
          </nav>
          <MainPage
            currentUser={userState[1]}
            maxPoints={userState[2]}
            overAll={userState[3]}
            puzzleIndex={userState[4]}
          />
          <GameStats />
        </div>
      )
  );
}

export default LoginComponent;
