// We use promises instead of callbacks or synchronous
import fs from 'fs/promises';

const content = 'Hello world!';

// Since we use promises, the functions need to be async (or use .then & .catch)
async function writeFile() {
  try {
    await fs.writeFile('example.txt', content);
    console.log('File has been written!');
  } catch (error) {
    console.error('Something went wrong!');
  }
}

async function readFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf-8');
    console.log('File content: ', data);
  } catch (error) {
    console.error('Something went wrong!');
  }
}

// writeFile();
readFile();
