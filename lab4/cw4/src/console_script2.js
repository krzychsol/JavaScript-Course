import fs from 'fs-extra';
import readLine from 'readline';
import { exec } from 'node:child_process';


/** Path to file witch stores number of script runs */
const filePath = 'counter.txt';

/** Synchronously read value from file counter.txt */
function readCounterSync() {
  try {
    const counter = fs.readFileSync(filePath, 'utf8');
    return parseInt(counter);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File doesn't exist yet, so return 0
      return 0;
    } else {
      throw err;
    }
  }
}

/** Synchronously write value to file counter.txt 
 * @param {int} counter - value from file counter.txt
*/
function writeCounterSync(counter) {
  fs.writeFileSync(filePath, counter.toString());
}

/** Asynchronously read value from file counter.txt */
function readCounterAsync() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // File doesn't exist yet, so resolve with 0
          resolve(0);
        } else {
          reject(err);
        }
      } else {
        const counter = parseInt(data);
        resolve(counter);
      }
    });
  });
}

/** Asynchronously write value to file counter.txt 
 * @param {int} counter - value from file counter.txt
*/
function writeCounterAsync(counter) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, counter.toString(), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/** Main function  */
async function run() {
    const option = process.argv[2];
    let readCounter, writeCounter;
    if (option === "--sync") {
        readCounter = readCounterSync;
        writeCounter = writeCounterSync;
    } else if (option === "--async") {
        readCounter = readCounterAsync;
        writeCounter = writeCounterAsync;
    } else {
        /**Execute system function from stdin */
        const rl = readLine.createInterface({
          input: process.stdin,
          output: process.stdout,
      });
      for await (const command of rl) {
          exec(command, (err, stdout, stderr) => {
              if (err) {
                  console.log(`error: ${err.message}`);
                  return;
              }
              if (stderr) {
                  console.log(`stderr: ${stderr}`);
                  return;
              }
              console.log(`stdout: ${stdout}`);
        });
      }
      return;
  }

  /** Read value from counter and then increment it and write new value to file */
  let counter = await readCounter();
  console.log(`Counter: ${counter}`);
  counter++;
  writeCounter(counter);
  console.log("Counter updated.");
}

/** Handle error while run script */
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
