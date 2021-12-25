/*
 * @Description : This is the unit test for all data fetching functions.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-07 20:50:43
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-09 19:10:06
 */

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const fetchAPI = require('../components/fetchData');

const mockAxios = new MockAdapter(axios);

describe('[TEST] fetch array from backend', () => {
  mockAxios.onGet().reply(200, [
    {
      id: 'existUser',
      name: 'test1',
      points: 5,
      maxpoints: 10,
    },
    {
      name: 'test2',
      points: 3,
      maxpoints: 4,
    },
  ]);
  mockAxios.onPost().reply(409, null);
  mockAxios.onPut().reply(200, {
    id: 'randomId',
    name: 'updateName',
    points: 100,
    maxpoints: 100,
  });
  mockAxios.onDelete().reply(200, {
    id: 'deleteId',
    name: 'deleteName',
    points: 0,
    maxpoints: 0,
  });
  test('[fetchAllPlayers] fetch all players', () => {
    fetchAPI.fetchAllPlayers().then((response) => {
      expect(response.length).toEqual(2);
      expect(response[0].name).toEqual('test1');
    });
  });
  test('[fetchLeaders] fetch game leaders', () => {
    fetchAPI.fetchLeaders().then((response) => {
      expect(response.length).toEqual(2);
      expect(response[1].name).toEqual('test2');
      expect(response[1].maxpoints).toEqual(4);
    });
  });
  test('[fetchPlayer] fetch one players', () => {
    fetchAPI.fetchPlayer('id').then((response) => {
      expect(response[0].name).toEqual('test1');
    });
  });
  test('[addPlayer] add a player', () => {
    fetchAPI.addPlayer({ name: 'test1' }).then((response) => {
      expect(response).toEqual('existUser');
    });
  });
  test('[updatePlayer] update a player', () => {
    fetchAPI.updatePlayer('randomId', { data: 'data' }).then((response) => {
      expect(response.id).toEqual('randomId');
      expect(response.maxpoints).toEqual(100);
    });
  });
  test('[deletePlayer] delete a player', () => {
    fetchAPI.deletePlayer('randomId').then((response) => {
      expect(response.id).toEqual('deleteId');
      expect(response.name).toEqual('deleteName');
    });
  });
});
