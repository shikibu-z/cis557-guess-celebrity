/*
 * @Description : This is all the functions that fetch data from the backend.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-06 19:57:01
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-27 18:13:41
 */

const axios = require('axios');

const server = 'https://cis557-homework4.herokuapp.com';

// fetch all players
async function fetchAllPlayers() {
  const response = await axios.get(`${server}/players`);
  return response.data;
}

// fetch top n leaders
async function fetchLeaders(n) {
  const response = await axios.get(`${server}/leaders/${n}`);
  return response.data;
}

// fetch a single player
async function fetchPlayer(uid) {
  const response = await axios.get(`${server}/player/${uid}`).catch(() => null);
  if (response === null) {
    return null;
  }
  return response.data;
}

// add a new player
async function addPlayer(data) {
  const response = await axios.post(`${server}/player`, data).catch(() => null);
  if (response === null) {
    const id = fetchAllPlayers().then((userList) => (
      userList.filter((entry) => entry.name === data.name)[0].id
    ));
    return id;
  }
  return response.data.id;
}

// update player score
async function updatePlayer(uid, data) {
  const response = await axios.put(`${server}/player/${uid}`, data);
  return response.data;
}

// delete player
async function deletePlayer(uid) {
  const response = await axios.delete(`${server}/player/${uid}`);
  return response.data;
}

export {
  fetchAllPlayers, fetchLeaders, fetchPlayer, addPlayer, updatePlayer, deletePlayer,
};
