import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";


// setting dimensions for grid

const numRows = 25;
const numCols = 25;

const neighborLocations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const generateRandomGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.65 ? 1 : 0)));
  }
  return rows;
};

const generateGlider = () => {
  const gliderGrid = generateEmptyGrid();

  gliderGrid[1][0] = 1;
  gliderGrid[2][1] = 1;
  gliderGrid[0][2] = 1;
  gliderGrid[1][2] = 1;
  gliderGrid[2][2] = 1;

  return gliderGrid;
};

const generateBlinker = () => {
  const blinkerGrid = generateEmptyGrid();

  blinkerGrid[2][1] = 1;
  blinkerGrid[2][2] = 1;
  blinkerGrid[2][3] = 1;

  return blinkerGrid;
};

const generatePulsar = () => {
  const pulsarGrid = generateEmptyGrid();

  pulsarGrid[4][2] = 1;
  pulsarGrid[5][2] = 1;
  pulsarGrid[6][2] = 1;
  pulsarGrid[10][2] = 1;
  pulsarGrid[11][2] = 1;
  pulsarGrid[12][2] = 1;

  pulsarGrid[4][7] = 1;
  pulsarGrid[5][7] = 1;
  pulsarGrid[6][7] = 1;
  pulsarGrid[10][7] = 1;
  pulsarGrid[11][7] = 1;
  pulsarGrid[12][7] = 1;

  pulsarGrid[4][9] = 1;
  pulsarGrid[5][9] = 1;
  pulsarGrid[6][9] = 1;
  pulsarGrid[10][9] = 1;
  pulsarGrid[11][9] = 1;
  pulsarGrid[12][9] = 1;

  pulsarGrid[4][14] = 1;
  pulsarGrid[5][14] = 1;
  pulsarGrid[6][14] = 1;
  pulsarGrid[10][14] = 1;
  pulsarGrid[11][14] = 1;
  pulsarGrid[12][14] = 1;

  pulsarGrid[2][4] = 1;
  pulsarGrid[7][4] = 1;
  pulsarGrid[9][4] = 1;
  pulsarGrid[14][4] = 1;

  pulsarGrid[2][5] = 1;
  pulsarGrid[7][5] = 1;
  pulsarGrid[9][5] = 1;
  pulsarGrid[14][5] = 1;

  pulsarGrid[2][6] = 1;
  pulsarGrid[7][6] = 1;
  pulsarGrid[9][6] = 1;
  pulsarGrid[14][6] = 1;

  pulsarGrid[2][10] = 1;
  pulsarGrid[7][10] = 1;
  pulsarGrid[9][10] = 1;
  pulsarGrid[14][10] = 1;

  pulsarGrid[2][11] = 1;
  pulsarGrid[7][11] = 1;
  pulsarGrid[9][11] = 1;
  pulsarGrid[14][11] = 1;

  pulsarGrid[2][12] = 1;
  pulsarGrid[7][12] = 1;
  pulsarGrid[9][12] = 1;
  pulsarGrid[14][12] = 1;

  return pulsarGrid;
};

function App() {
  // setting state to initialize empty grid

  const [grid, setGrid] = useState(generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [speed, setSpeed] = useState(500);

  // gets current 'running' value for useCallback function below which only runs once
  const runningRef = useRef(running);
  runningRef.current = running;

  const speedRef = useRef(speed);
  speedRef.current = speed;

  // useCallback - so function isn't recreated every rerender
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      //basecase to stop simulating when not running
      return;
    }

    setGenerationCount((c) => c + 1);

    setGrid((oldGrid) => {
      return produce(oldGrid, (gridCopy) => {
        // iterating through each cell in grid
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;

            neighborLocations.forEach(([x, y]) => {
              const neighborI = i + x;
              const neighborJ = j + y;
              if (
                neighborI >= 0 &&
                neighborI < numRows &&
                neighborJ >= 0 &&
                neighborJ < numCols
              ) {
                neighbors += oldGrid[neighborI][neighborJ];
              }
            });

            // logic for killing + enlivening each cell based on number of neighbors
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (gridCopy[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speedRef.current);
  }, []);

  return (
    <div className="biggestContainer">
      <h1>
      Cellular Automaton{" "}
      </h1>
      <div className="bigContainer">
        <div className="leftContainer">
          <div className="topButtons">
            <button
              onClick={() => {
                setRunning(!running);
                if (!running) {
                  runningRef.current = true;
                  runSimulation();
                }
              }}
            >
              {running ? "Stop" : "Start"}
            </button>
            <button
              onClick={() => {
                setGrid(generateEmptyGrid());
                setGenerationCount(0);
              }}
            >
              Clear
            </button>
            <button> Generation: {generationCount}</button>
          </div>

          {/* end topButtons container */}
          <div className="grid">
            {grid.map((row, i) =>
              // mapping through individual cells
              row.map((col, k) => (
                <div
                  className="cells"
                  key={`${i}-${k}`}
                  onClick={() => {
                    if (!running) {
                      const newGrid = produce(grid, (gridCopy) => {
                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                      });
                      setGrid(newGrid);
                    }
                  }}
                  style={{
                    backgroundColor: grid[i][k] ? "green" : "white",
                  }}
                />
              ))
            )}
          </div>
          <div className="bottomButtons">
            <div> Preset patterns:</div>
            <button
              onClick={() => {
                setGrid(generateRandomGrid());
              }}
            >
              Random
            </button>

            <button
              onClick={() => {
                setGrid(generateGlider());
              }}
            >
              Glider
            </button>
            <button
              onClick={() => {
                setGrid(generateBlinker());
              }}
            >
              Blinker
            </button>
            <button
              onClick={() => {
                setGrid(generatePulsar());
              }}
            >
              Pulsar
            </button>
          </div>
          {/* end bottomButtons container */}
          <div className="bottomButtons2">
            <div> Adjust speed:</div>
            <button
              onClick={() => {
                setSpeed(1000);
              }}
            >
              {" "}
              Slow
            </button>
            <button
              onClick={() => {
                setSpeed(500);
              }}
            >
              {" "}
              Medium
            </button>
            <button
              onClick={() => {
                setSpeed(100);
              }}
            >
              {" "}
              Fast
            </button>
          </div>

          {/* end bottomButtons container2 */}
        </div>
        {/* end leftContainer */}
        <div className="rightContainer">
          <div className="description">
            <div className="play">
              <h3>Play</h3>
              Click the cells you would like to bring alive or select one of the
              preset patterns. Begin the simulation by clicking start.
            </div>
            <div className="rules">
              <h3> Algorithim rules </h3>
              <div className="rulesText">
                {" "}
                
               {" "}
                Any live cell with fewer than two neighbors dies.
              </div>
              <div className="rulesText">
             
                {" "}
                Any live cell with two or three live neighbors lives on.
              </div>
              <div className="rulesText">
                
               {" "}
                Any live cell with more than three live neighbors dies.{" "}
              </div>
              <div className="rulesText">
      
                
                {" "}
                Any dead cell with exactly three live neighbors is born.
              </div>
            </div>
          </div>
          {/* end description container */}
        </div>
        {/* end right container */}
      </div>
      {/* end bigContainer */}
      <div className="about">
        <h3>About</h3>
        Conway's Game of Life is a 'cellular automaton' invented by mathmetician{" "}
        <a href="https://www.youtube.com/watch?v=R9Plq-D1gEk">John Conway</a>.
        Using a few simple conditional rules (listed above), the Turing-complete
        program simulates a certain evolutionary process unfolding based upon
        it's initial state. {" "}
        <p>
        “All my life, I've prided myself on being a survivor. But surviving is just another loop.”
        — Maeve Millay,	Westworld, Season 1. 
        </p>
      </div>
      {/* end about container */}
    </div>
    // end biggestContainer
  );
}

export default App;