import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// ESM equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    constructor(port) {
        this.port = port || 3000;
        this.app = express();
        this.datasets = null;
        this.validFileTypes = ['json', 'csv', 'pdf', 'ppt'];
    }

    loadDatasets() {
        try {
            const datasetPath = path.resolve(__dirname, 'unified_dataset.json');

            // ESM way to load JSON
            this.datasets = JSON.parse(fs.readFileSync(datasetPath, 'utf-8'));
            console.log('Datasets loaded successfully.');
        } catch (error) {
            console.error('Error loading unified_dataset.json:', error.message);
            process.exit(1);
        }
    }

    setupMiddleware() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname))); // Serve frontend files
        this.app.use('/Visualizer', express.static(path.join(__dirname, 'Visualizer')));
    }

    setupRoutes() {
        this.app.get('/api/data', (req, res) => {
            if (!this.datasets) {
                return res.status(500).json({ error: 'Datasets not loaded.' });
            }
            res.json(this.datasets);
        });

        this.app.get('/api/data/:file_type', (req, res) => {
            const fileType = req.params.file_type.toLowerCase();

            if (!this.validFileTypes.includes(fileType)) {
                return res.status(400).json({
                    error: `Invalid file type. Valid types are: ${this.validFileTypes.join(', ')}`,
                });
            }

            if (this.datasets && this.datasets[fileType]) {
                res.json(this.datasets[fileType]);
            } else {
                res.status(404).json({ error: `File type '${fileType}' not found.` });
            }
        });

        this.app.use((req, res) => {
            res.status(404).json({ error: 'Endpoint not found.' });
        });
    }

    start() {
        this.loadDatasets();
        this.setupMiddleware();
        this.setupRoutes();
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}

const server = new Server(process.env.PORT || 3000);
server.start();
