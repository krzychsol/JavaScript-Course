import http from 'node:http';
import { URL } from 'node:url';
import fs from 'fs-extra';
import { exec } from 'node:child_process';
import './console_script2';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<form method="post" action="/submit">');
    res.write('<label for="mode">Tryb:</label>');
    res.write('<select id="mode" name="mode">');
    res.write('<option value="-">-</option>');
    res.write('<option value="sync">sync</option>');
    res.write('<option value="async">async</option>');
    res.write('</select>');
    res.write('<br>');
    res.write('<label for="input">Komendy:</label>');
    res.write('<textarea id="input" name="input"></textarea>');
    res.write('<br>');
    res.write('<button type="submit">Wykonaj</button>');
    res.write('</form>');
    res.end();
  } else if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const mode = body.split('&')[0].split('=')[1];
      const input = decodeURIComponent(body.split('&')[1].split('=')[1]);

      if (mode === '-') {
        const output = execCommand(input);
        res.setHeader('Content-Type', 'text/plain');
        res.write(`<pre>${output}</pre>`);
        res.end();
      } else if (mode === 'sync') {
        const output = readWriteSync();
        res.setHeader('Content-Type', 'text/html');
        res.write(`<p>Liczba uruchomien: ${output}</p>`);
        res.end();
      } else if (mode === 'async') {
        readWriteAsync((err, output) => {
          if (err) {
            res.setHeader('Content-Type', 'text/plain');
            res.write('<p>Blad odczytu/zapisu pliku</p>');
          } else {
            res.setHeader('Content-Type', 'text/html');
            res.write(`<p>Liczba uruchomien: ${output}</p>`);
          }
          res.end();
        });
      }
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

function readWriteSync() {
  let count = 0;
  try {
    const data = fs.readFileSync('counter.txt', 'utf-8');
    count = parseInt(data) + 1;
    fs.writeFileSync('counter.txt', count.toString());
  } catch (err) {
    console.error(err);
  }
  return count;
}

function readWriteAsync(callback) {
  fs.readFile('counter.txt', 'utf-8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      let count = parseInt(data) + 1;
      fs.writeFile('counter.txt', count.toString(), err => {
        if (err) {
          callback(err);
        } else {
          callback(null, count);
        }
      });
    }
  });
}

function execCommand(command) {
  try {
    const output = exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(`error: ${err.message}`);
        return `${err.message}`;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return `${stderr}`;
      }
      console.log(`stdout: ${stdout}`);
      return `${stdout}`;
    });
    console.log(output.toString);
    return output.toString();
  } catch (err) {
    console.error(err);
    return '';
  }
}

server.listen(8000, () => {
  console.log('Server listening on port 8000');
});
