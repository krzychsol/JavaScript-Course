import fs from 'fs-extra';
import readLine from 'readline';
import { exec } from 'node:child_process';

//:TODO przerywac po wcisnieciu CTRL+D

const filePath = 'counter.txt';

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

function writeCounterSync(counter) {
  fs.writeFileSync(filePath, counter.toString());
}

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

async function run() {
  const option = process.argv[2];
  let readCounter, writeCounter;
  if (option === '--sync') {
    readCounter = readCounterSync;
    writeCounter = writeCounterSync;
  } else if (option === '--async') {
    readCounter = readCounterAsync;
    writeCounter = writeCounterAsync;
  } else {
    // Execute system commands from stdin
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
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

  let counter = await readCounter();
  console.log(`Counter: ${counter}`);
  counter++;
  writeCounter(counter);
  console.log('Counter updated.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
