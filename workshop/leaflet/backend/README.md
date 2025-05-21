## Instructions to run the server

- You will need
  - [MongoDB connection](https://www.mongodb.com/)
  - [OpenCage API key](https://opencagedata.com/) (register to obtain a key)
- Create a `.env` file in the project root with the following keys:
  ```
  MONGO_URI=your_mongodb_connection_string
  OPENCAGE_KEY=your_opencage_api_key
  ```
- Run the following commands to start the server:
  ```bash
  npm install
  npm run dev
  ```
