/*
 * @Description : This is the main page component that renders puzzle, display
 * current user performance.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-10-27 15:00:18
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-22 21:07:26
 */

import React, { useState } from 'react';
import {
  fetchLeaders, fetchPlayer, updatePlayer,
} from './fetchData';

const puzzlePool = [
  ['images/benedict.jpg', 'Leonardo DiCaprio', 'Benedict Cumberbatch', 'Christian Bale', 'Nicole Kidman', 'B'],
  ['images/taylor.jpg', 'Blake Lively', 'Selena Gomez', 'Margot Robbie', 'Taylor Swift', 'D'],
  ['images/scarlett.jpg', 'Miley Cyrus', 'Margot Robbie', 'Selena Gomez', 'Scarlett Johansson', 'D'],
  ['images/sean.jpg', 'Sean Bean', 'Bradley Cooper', 'Robin Williams', 'Steve Jobs', 'A'],
  ['images/steve.jpg', 'Steve Jobs', 'Leonardo DiCaprio', 'Robin Williams', 'Bruce Willis', 'A'],
  ['images/yui.jpg', 'Nagasawa Masami', 'Aragaki Yui', 'Ishihara Satomi', 'Hashimoto Kanna', 'B'],
  ['images/rdj.jpg', 'Leonardo DiCaprio', 'Bradley Cooper', 'Robert Downey Jr.', 'Steve Carell', 'C'],
  ['images/ian.jpg', 'Matt Damon', 'Steve Carell', 'Ian McKellen', 'Willem Dafoe', 'C'],
  ['images/natalie.jpg', 'Nicole Kidman', 'Ellen Page', 'Rihanna', 'Natalie Portman', 'D'],
  ['images/hugo.jpg', 'Leonardo DiCaprio', 'Hugo Weaving', 'Christian Bale', 'Matt Damon', 'B'],
  ['images/samuel.jpg', 'Samuel Jackson', 'Bruce Willis', 'Christian Bale', 'Steve Carell', 'A'],
  ['images/hugh.jpg', 'Daniel Kaluuya', 'Matt Damon', 'Hugh Jackman', 'Willem Dafoe', 'C'],
];

function MainPage({
  currentUser, maxPoints, overAll, puzzleIndex,
}) {
  const [puzzleNum, setPuzzleNum] = useState(0);
  const [userScore, setUserScore] = useState([0, maxPoints, overAll]);
  let pictSrc = '';
  let optA = '';
  let optB = '';
  let optC = '';
  let optD = '';
  let index = '';
  if (puzzleNum > 9) {
    // don't do anything, this round should end now
  } else {
    // update next puzzle
    index = puzzleIndex[puzzleNum];
    [pictSrc] = puzzlePool[index];
    [, optA] = puzzlePool[index];
    [, , optB] = puzzlePool[index];
    [, , , optC] = puzzlePool[index];
    [, , , , optD] = puzzlePool[index];
  }
  // check user answer and determin if we need to update score
  const checkAnswer = (event) => {
    const userResp = event.target.id;
    let correctAns = '';
    [, , , , , correctAns] = puzzlePool[index];
    if (userResp[3] === correctAns) {
      fetchPlayer(currentUser).then((response) => {
        response.points = userScore[0] + 1;
        if (response.points > response.maxpoints) {
          response.maxpoints = response.points;
        }
        updatePlayer(currentUser, response).then((userObj) => {
          fetchLeaders(5).then((leaders) => {
            let newOverAll = 0;
            if (leaders.length !== 0) {
              newOverAll = leaders[0].maxpoints;
            }
            setUserScore([userScore[0] + 1, userObj.maxpoints, newOverAll]);
          });
        });
      });
    } else {
      fetchLeaders(5).then((leaders) => {
        let newOverAll = 0;
        if (leaders.length !== 0) {
          newOverAll = leaders[0].maxpoints;
        }
        setUserScore([userScore[0], userScore[1], newOverAll]);
      });
    }
    // trigger next puzzle render
    setPuzzleNum(puzzleNum + 1);
  };
  return (
    puzzleNum <= 9
      ? (
        <div id="puzzle">
          <img src={pictSrc} width="350px" alt="" />
          <div className="column">
            <h3 id="score">
              Current Score:
              {' '}
              {userScore[0]}
              <br />
              Your Highest Score:
              {' '}
              {userScore[1]}
              <br />
              Overall Highest Score:
              {' '}
              {userScore[2]}
            </h3>
            <button type="button" className="option" id="optA" onClick={checkAnswer}>{optA}</button>
            <button type="button" className="option" id="optB" onClick={checkAnswer}>{optB}</button>
            <button type="button" className="option" id="optC" onClick={checkAnswer}>{optC}</button>
            <button type="button" className="option" id="optD" onClick={checkAnswer}>{optD}</button>
          </div>
        </div>
      )
      : (
        <div id="puzzle">
          <h1>
            Game Over!
            <br />
            Your Final Score:
            {' '}
            {userScore[0]}
          </h1>
        </div>
      )
  );
}

export default MainPage;
