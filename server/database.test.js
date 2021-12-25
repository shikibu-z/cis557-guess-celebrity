/*
 * @Description : This is the unit test for database operation functions.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-23 18:41:12
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-27 18:00:43
 */

let db;
const libDB = require('./database');

const cleanup = async (database) => {
  try {
    const response = await database.collection('game').deleteOne({ name: 'unittest' });
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

afterEach(async () => {
  await cleanup(db);
});

describe('[TEST] database operation tests', () => {
  const testData = { name: 'unittest', points: 1, maxpoints: 7 };
  test('[TEST] test get all players', async () => {
    db = await libDB.connect();
    await libDB.addUser(db, testData);
    const response = await libDB.getUsers(db);
    expect(response.filter((entry) => entry.name === 'unittest')[0].maxpoints).toEqual(7);
  });

  test('[TEST] test get leaders', async () => {
    db = await libDB.connect();
    await libDB.addUser(db, testData);
    const response = await libDB.getLeaders(db, 5);
    expect(response.filter((entry) => entry.name === 'unittest')[0].points).toEqual(1);
  });

  test('[TEST] test get one player', async () => {
    db = await libDB.connect();
    const player = await libDB.addUser(db, testData);
    const response = await libDB.getUser(db, player.id);
    expect(response.points).toEqual(1);
  });

  test('[TEST] test get one player exception', async () => {
    db = await libDB.connect();
    await libDB.addUser(db, testData);
    const response = await libDB.getUser(db, 'invalid id');
    expect(response).toEqual(null);
  });

  test('[TEST] test add a new player', async () => {
    db = await libDB.connect();
    const player = await libDB.addUser(db, testData);
    const validation = await db.collection('game').findOne({ name: 'unittest' });
    expect(player.id.length).toEqual(24);
    expect(validation.name).toEqual('unittest');
  });

  test('[TEST] test add a new player exception', async () => {
    db = await libDB.connect();
    const response = await libDB.addUser(db, {}).catch(() => null);
    expect(response).toEqual(null);
  });

  test('[TEST] test update a new player', async () => {
    db = await libDB.connect();
    const player = await libDB.addUser(db, testData);
    await libDB.updateUser(db, player.id, { points: 100, maxpoints: 100 });
    const response = await db.collection('game').findOne({ name: 'unittest' });
    expect(response.points).toEqual(100);
  });

  test('[TEST] test delete a player', async () => {
    db = await libDB.connect();
    const player = await libDB.addUser(db, testData);
    const response = await libDB.deleteUser(db, player.id);
    expect(response.id.length).toEqual(24);
  });

  test('[TEST] test delete exception', async () => {
    db = await libDB.connect();
    await libDB.addUser(db, testData);
    const response = await libDB.deleteUser(db, 'invalid id');
    expect(response).toEqual(null);
  });
});
