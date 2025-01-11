const fetch = require("node-fetch");

const API_URL = 'http://localhost:3000/api/data';

describe('API Tests', () => {
    test('should return the unified dataset', async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        expect(response.status).toBe(200); // Ensure API responds with 200 status code
        expect(data).toBeDefined(); // Ensure data is returned
        expect(data.json).toBeDefined(); // Check JSON dataset
        expect(data.csv).toBeDefined(); // Check CSV dataset
        expect(data.pdf).toBeDefined(); // Check PDF dataset
        expect(data.ppt).toBeDefined(); // Check PPT dataset
    });

    test('should return 404 for invalid endpoint', async () => {
        const invalidResponse = await fetch('http://localhost:3000/api/invalid');
        expect(invalidResponse.status).toBe(404); // Ensure 404 for invalid endpoint
    });
});
