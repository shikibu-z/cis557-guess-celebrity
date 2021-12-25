/*
 * @Description : This is the unit and integration test for the server.js endpoints.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-24 14:31:24
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-27 18:01:15
 */

let db;
const request = require('supertest');
const webapp = require('./server');
const libDB = require('./database');

const cleanup = async (database) => {
  try {
    const response = await database.collection('game').deleteOne({ name: 'intetest' });
    const { successDelete } = response;
    if (successDelete === 1) {
      // console.log('[DEBUG] cleanup success');
    } else {
      // console.log('[TEST] cleanup unsuccess');
    }
  } catch (error) {
    // console.log(`[TEST] error: ${error.message}`);
  }
};

beforeEach(async () => {
  const testData = { name: 'intetest', points: 1, maxpoints: 7 };
  db = await libDB.connect();
  await libDB.addUser(db, testData);
});

afterEach(async () => {
  await cleanup(db);
});

describe('[TEST] server endpoint and integration tests', () => {
  test('[TEST] get all players', async () => {
    await request(webapp).get('/players')
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).filter((entry) => entry.name === 'intetest')[0].maxpoints).toEqual(7);
      });
  });

  test('[TEST] get leaders', async () => {
    await request(webapp).get('/leaders/5')
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).filter((entry) => entry.name === 'intetest')[0].points).toEqual(1);
      });
  });

  test('[TEST] get one player', async () => {
    await db.collection('game').deleteOne({ name: 'intetest' });
    const player = await libDB.addUser(db, { name: 'intetest', points: 0, maxpoints: 0 });
    await request(webapp).get(`/player/${player.id}`)
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).points).toEqual(0);
      });
  });

  test('[TEST] get one player exception', async () => {
    await request(webapp).get('/player/invalid id')
      .expect(404)
      .then((response) => {
        expect(JSON.parse(response.text).error).toEqual('player does not exist');
      });
  });

  test('[TEST] test add player', async () => {
    await db.collection('game').deleteOne({ name: 'intetest' });
    await request(webapp).post('/player').send({ name: 'intetest', points: 0, maxpoints: 0 })
      .expect(201)
      .then((response) => {
        expect(JSON.parse(response.text).id.length).toEqual(24);
      });
  });

  test('[TEST] test add player exception', async () => {
    await request(webapp).post('/player').send({ name: 'intetest' })
      .expect(400)
      .then((response) => {
        expect(JSON.parse(response.text).error).toEqual('invalid input');
      });
  });

  test('[TEST] test delete a player', async () => {
    const player = await libDB.addUser(db, { name: 'unitdelete', points: 0, maxpoints: 0 });
    await request(webapp).delete(`/player/${player.id}`)
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).id.length).toEqual(24);
      });
  });

  test('[TEST] test delete a player exception', async () => {
    await request(webapp).delete('/player/invalid id')
      .expect(404)
      .then((response) => {
        expect(JSON.parse(response.text).error).toEqual('player not found');
      });
  });

  test('[TEST] test update a player', async () => {
    const player = await libDB.addUser(db, { name: 'unitupdate', points: 0, maxpoints: 0 });
    await request(webapp).put(`/player/${player.id}`).send({ points: 10, maxpoints: 10 })
      .expect(200)
      .then((response) => {
        expect(JSON.parse(response.text).maxpoints).toEqual(10);
      });
    await libDB.deleteUser(db, player.id);
  });

  test('[TEST] test update a player exception', async () => {
    const player = await libDB.addUser(db, { name: 'unitupdate', points: 0, maxpoints: 0 });
    await request(webapp).put(`/player/${player.id}`).send({})
      .expect(404)
      .then((response) => {
        expect(JSON.parse(response.text).error).toEqual('invalid input');
      });
    await libDB.deleteUser(db, player.id);

    await request(webapp).put('/player/invalid id').send({ points: 10, maxpoints: 10 })
      .expect(404)
      .then((response) => {
        expect(JSON.parse(response.text).error).toEqual('player not found');
      });
  });
});
