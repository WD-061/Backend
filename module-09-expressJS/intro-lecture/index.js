// Import the express module (framework for Node.js)
import express from "express";

// Create an Express app instance
const app = express();

// Set the port (from env or default to 3000)
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Root route (Homepage/Landing Page etc.): responds with a simple message
app.get("/", (req, res) => {
  res.send("Hello World!"); // Send plain text response
});

// Route with URL params: returns the user id (mock)
app.get("/users/:id/:name", (req, res) => {
  const id = req.params.id; // Extract id from URL
  // This just returns the id as JSON
  res.json(id);
});

// Mock user creation route (does NOT save anything)
app.post("/users", (req, res) => {
  const { username, email } = req.body; // Extract data from request body
  // Respond with a fake user object, using random UUID (no DB involved)
  res.status(201).json({ id: crypto.randomUUID(), username, email });
});

// Mock user update route (does NOT update anything)
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { username, email } = req.body;
  // This is just a placeholder! No actual DB update happens here.
  // Example of what a real DB query might look like (not executed):
  // "UPDATE users SET username = $1, email = $2 WHERE id = $3", [username, email, id];
  res.send(`User ${id} updated (mock)`); // Fake update response
});

// Mock user deletion route (does NOT delete anything)
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  // No database operation is performed here
  res.send(`User ${id} deleted (mock)`);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
