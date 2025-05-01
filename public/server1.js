const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

const app = express();
const PORT = 5001;

app.use(cors());

const DATASET_PATH = path.join(__dirname, 'village_dataset');

// Helper function to read CSV files
const readCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

// Get all states
app.get('/api/states', async (req, res) => {
    try {
        const states = fs.readdirSync(DATASET_PATH).filter(file => file.endsWith('.csv'));
        res.json(states.map(state => state.replace('.csv', '')));
    } catch (error) {
        res.status(500).json({ error: 'Error fetching states' });
    }
});

// Get districts by state
app.get('/api/districts/:state', async (req, res) => {
    const { state } = req.params;
    const filePath = path.join(DATASET_PATH, `${state}.csv`);
    try {
        const data = await readCSV(filePath);
        const districts = [...new Set(data.map(row => row.District))];
        res.json(districts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching districts' });
    }
});

// Get blocks/tehsils by district
app.get('/api/blocks/:state/:district', async (req, res) => {
    const { state, district } = req.params;
    const filePath = path.join(DATASET_PATH, `${state}.csv`);
    try {
        const data = await readCSV(filePath);
        const blocks = [...new Set(data.filter(row => row.District === district).map(row => row.Block))];
        res.json(blocks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blocks' });
    }
});

// Get villages by block
app.get('/api/villages/:state/:district/:block', async (req, res) => {
    const { state, district, block } = req.params;
    const filePath = path.join(DATASET_PATH, `${state}.csv`);
    try {
        const data = await readCSV(filePath);
        const villages = data.filter(row => row.District === district && row.Block === block)
                            .map(row => ({ name: row['Habitation Name'], latitude: row.Lattitude, longitude: row.Longitude }));
        res.json(villages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching villages' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
