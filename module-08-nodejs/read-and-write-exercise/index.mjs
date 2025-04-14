import { mkdir, access, appendFile, unlink } from 'fs/promises';
import { join } from 'path';

const createDirIfNotExists = async (folderName) => {
  // Check if directory exists, if not, create it
  try {
    // Check if the directory exists
    await access(folderName);
    return 'Directory already exists';
  } catch (error) {
    // Create the folder
    await mkdir(folderName, { recursive: true });
    return 'Directory created successfully';
  }
};

// Function to create a file with a message
const createFileWithMessage = async (message) => {
  try {
    // Get the current date and time
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); //Add a zero if month is single digit. Eg: 4 will be then 04
    const date = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const dirName = `${year}-${month}-${date}`; //Eg: 2025-04-14
    const fileName = `${hour}-${minutes}-${seconds}.txt`; //Eg: 16-37-45.txt

    await createDirIfNotExists(dirName);

    const filePath = join(dirName, fileName); //Eg: 2025-04-14/16-37-45.txt

    // Append message to the file if it exists, otherwise create the file
    await appendFile(filePath, message);
  } catch (error) {
    console.log(error);
  }
};

// Function to delete a file by name
const deleteFileByName = async (filePath) => {
  try {
    // Check if the file exists
    await access(filePath);
    //Delete the file
    await unlink(filePath);
    console.log('File was successfully deleted');
  } catch (error) {
    console.log('File not found!');
  }
};

// Terminal execution
const command = process.argv[2];
const argument = process.argv[3];
// Refer below link for process.argv explanation
// https://learn.wbscodingschool.com/courses/full-stack-web-app/lessons/%f0%9f%97%9e%ef%b8%8f-node-input-and-output/

if (command === 'create' && argument) {
  createFileWithMessage(argument);
} else if (command === 'delete' && argument) {
  deleteFileByName(argument);
} else {
  console.log(
    'Invalid command or missing argument. Use "create <message>" or "delete <fileName>".'
  );
}

// Example terminal commands
// node index.mjs create 'Hello'
// node index.mjs delete '2025-04-14/16-56-00.txt'
