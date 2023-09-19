import express from 'express';
import indexDirectory from './utils/indexer';
import cors from 'cors'; // Import the cors middleware

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001', // Allow requests from this origin
}));

// Define a route to index the directory and expose the result as JSON
app.get('/index-directory', async (req, res) => {
  const baseDir = '../test_data'; // Specify the base directory you want to index

  try {
    const index = await indexDirectory(baseDir);
    res.json(index);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while indexing the directory.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});