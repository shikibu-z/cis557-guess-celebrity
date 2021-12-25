/*
 * @Description : This is the file that handle front-end requests with routes.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-22 17:58:08
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-27 18:07:10
 */

const path = require('path');
const cors = require('cors');
const express = require('express');
const libDB = require('./database');

const webapp = express();
webapp.use(cors());
webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);
webapp.use(express.static(path.join(__dirname, '../client/build')));

let mongoDB;

// Start server
const port = process.env.PORT || 8080;
webapp.listen(port, async () => {
  mongoDB = await libDB.connect();
  // console.log(`Server running on port:${port}`);
});

// get all players
webapp.get('/players', async (req, res) => {
  try {
    const response = await libDB.getUsers(mongoDB);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get leaders
webapp.get('/leaders/:n', async (req, res) => {
  if (req.params.n === undefined) {
    res.status(400).json({ error: 'bad url' });
  }
  const top = Number(req.params.n);
  try {
    const response = await libDB.getLeaders(mongoDB, top);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get a single player
webapp.get('/player/:id', async (req, res) => {
  if (req.params.id === undefined) {
    res.status(404).json({ error: 'missing player id' });
    return;
  }
  try {
    const id = req.params.id.toString();
    const response = await libDB.getUser(mongoDB, id);
    if (response === null || response === undefined) {
      res.status(404).json({ error: 'player does not exist' });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// add a player
webapp.post('/player', async (req, res) => {
  if (!req.body.name
    || req.body.points === undefined
    || req.body.maxpoints === undefined) {
    res.status(400).json({ error: 'invalid input' });
    return;
  }
  const newUser = {
    name: req.body.name,
    points: req.body.points,
    maxpoints: req.body.maxpoints,
  };
  try {
    const response = await libDB.addUser(mongoDB, newUser);
    res.status(201).json(response);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

// delete a player
webapp.delete('/player/:id', async (req, res) => {
  if (req.params.id === undefined) {
    res.status(404).json({ error: 'missing player id' });
    return;
  }
  try {
    const id = req.params.id.toString();
    const response = await libDB.deleteUser(mongoDB, id);
    if (response === null) {
      res.status(404).json({ error: 'player not found' });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// update a player
webapp.put('/player/:id', async (req, res) => {
  if (req.params.id === undefined
    || req.body.points === undefined
    || req.body.maxpoints === undefined) {
    res.status(404).json({ error: 'invalid input' });
    return;
  }
  const id = req.params.id.toString();
  const newUser = {
    points: req.body.points,
    maxpoints: req.body.maxpoints,
  };
  try {
    const response = await libDB.updateUser(mongoDB, id, newUser);
    if (response === null) {
      res.status(404).json({ error: 'player not found' });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Root endpoint
webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp;
