/*
 * @Description : This is the file that acts directly with the MongoDB database cluster.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-21 20:51:45
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-27 18:00:06
 */

/* eslint-disable no-underscore-dangle */
const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');

const server = 'mongodb+srv://junyong:cis557@cluster0.mfyhy.mongodb.net/homework4?retryWrites=true&w=majority';

// connect to the database and return a db object
const connect = async () => {
  try {
    const database = (await MongoClient.connect(
      server,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    return database;
  } catch (error) {
    return null;
  }
};

// get all users as an array of user object
const getUsers = async (db) => {
  try {
    const data = [];
    const response = await db.collection('game').find({}).toArray();
    for (let index = 0; index < response.length; index += 1) {
      const entry = {
        id: response[index]._id.toString(),
        name: response[index].name,
        points: response[index].points,
        maxpoints: response[index].maxpoints,
      };
      data.push(entry);
    }
    return data;
  } catch (error) {
    return null;
  }
};

// get game leaders by a top n number
const getLeaders = async (db, n) => {
  try {
    const data = [];
    const response = await db.collection('game').find({})
      .sort({ maxpoints: -1 }).limit(n)
      .toArray();
    for (let index = 0; index < response.length; index += 1) {
      const entry = {
        id: response[index]._id.toString(),
        name: response[index].name,
        points: response[index].points,
        maxpoints: response[index].maxpoints,
      };
      data.push(entry);
    }
    return data;
  } catch (error) {
    return null;
  }
};

const getUser = async (db, id) => {
  try {
    const response = await db.collection('game').findOne({ _id: ObjectId(id) });
    return ({
      id: response._id.toString(),
      name: response.name,
      points: response.points,
      maxpoints: response.maxpoints,
    });
  } catch (error) {
    return null;
  }
};

// add an user, return the added user object
const addUser = async (db, newUser) => new Promise((resolve, reject) => {
  db.collection('game').insertOne(newUser, (error, response) => {
    if (error) {
      reject(new Error('got an error'));
    } else {
      resolve({
        id: response.insertedId.toString(),
        name: newUser.name,
        points: newUser.points,
        maxpoints: newUser.maxpoints,
      });
    }
  });
});

const updateUser = async (db, id, newUser) => {
  try {
    const response = await db.collection('game').findOne({ _id: ObjectId(id) });
    if (response === null) {
      return null;
    }
    await db.collection('game').updateOne(
      { _id: response._id },
      { $set: { points: newUser.points, maxpoints: newUser.maxpoints } },
    );
    return ({
      id: response._id.toString(),
      name: newUser.name,
      points: newUser.points,
      maxpoints: newUser.maxpoints,
    });
  } catch (error) {
    return null;
  }
};

// delete user and return the deleted user object
const deleteUser = async (db, id) => {
  try {
    const response = await db.collection('game').findOne({ _id: ObjectId(id) });
    if (response === null) {
      return null;
    }
    await db.collection('game').deleteOne({ _id: response._id });
    return ({
      id: response._id.toString(),
      name: response.name,
      points: response.points,
      maxpoints: response.maxpoints,
    });
  } catch (error) {
    return null;
  }
};

module.exports = {
  connect, getUsers, getLeaders, getUser, addUser, updateUser, deleteUser,
};
