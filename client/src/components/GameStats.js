/*
 * @Description : This is the module that gather all users and leaders.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-10-28 12:46:13
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-22 21:45:18
 */

import React, { useEffect, useState } from 'react';
import { fetchAllPlayers, fetchLeaders } from './fetchData';

function GameStats() {
  const [getAllUsers, setAllUsersFlag] = useState(0);
  const [getLeaders, setLeadersFlag] = useState(0);
  // event to get all users
  useEffect(() => {
    const alluser = document.getElementById('alluser');
    while (alluser.firstChild) {
      alluser.firstChild.remove();
    }
    fetchAllPlayers(5).then((response) => {
      response.forEach((userObj) => {
        const li = document.createElement('li');
        li.innerHTML = `${userObj.name}: ${userObj.maxpoints}`;
        document.getElementById('alluser').appendChild(li);
      });
    });
  }, [getAllUsers]);
  // event to get leaders, default is 5
  useEffect(() => {
    const leaders = document.getElementById('leaders');
    while (leaders.firstChild) {
      leaders.firstChild.remove();
    }
    fetchLeaders(5).then((response) => {
      if (response.length !== 0) {
        response.forEach((userObj) => {
          const li = document.createElement('li');
          li.innerHTML = `${userObj.name}: ${userObj.maxpoints}`;
          document.getElementById('leaders').appendChild(li);
        });
      }
    });
  }, [getLeaders]);
  // handlers to trigger setState
  const handleAllUsers = () => {
    if (getAllUsers === 0) {
      setAllUsersFlag(1);
    } else {
      setAllUsersFlag(0);
    }
  };
  const handleLeaders = () => {
    if (getLeaders === 0) {
      setLeadersFlag(1);
    } else {
      setLeadersFlag(0);
    }
  };
  return (
    <div>
      <nav>
        <button type="button" id="statsb" onClick={handleAllUsers}>Game Stats</button>
        <button type="button" id="leadersb" onClick={handleLeaders}>Game Leaders</button>
      </nav>
      <h3>Top 5 Leaders and Their Score</h3>
      <ul id="leaders" />
      <h3>All Users and Their Score</h3>
      <ul id="alluser" />
    </div>
  );
}

export default GameStats;
