"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexer_1 = __importDefault(require("./utils/indexer"));
const cors_1 = __importDefault(require("cors")); // Import the cors middleware
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001', // Allow requests from this origin
}));
// Define a route to index the directory and expose the result as JSON
app.get('/index-directory', async (req, res) => {
    const baseDir = '../test_data'; // Specify the base directory you want to index
    try {
        const index = await (0, indexer_1.default)(baseDir);
        res.json(index);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while indexing the directory.' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
