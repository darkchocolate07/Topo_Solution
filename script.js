import { TopEarnersChart } from './Visualizer/TopEarnersChart.js';
import { ActivityPieChart } from './Visualizer/ActivityPieChart.js';
import { RevenueTrendChart } from './Visualizer/RevenueTrendChart.js';

const API_URL = "http://localhost:3000/api/data";

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderCharts(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.body.innerHTML = `<p style="color: red; text-align: center;">Failed to load data. Please try again later.</p>`;
    }
}

function renderCharts(data) {
    if (!data.json || !data.csv || !data.pdf) {
        console.error("Required datasets are missing or empty.");
        return;
    }

    // Populate company dropdown and render top earners chart
    const companyNames = [...new Set(data.json.map(item => item.company_name))];
    const companyDropdown = document.getElementById('companyFilter');

    companyNames.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyDropdown.appendChild(option);
    });

    companyDropdown.addEventListener('change', event => {
        const selectedCompany = event.target.value;
        TopEarnersChart.render(data, selectedCompany);
    });

    if (companyNames.length > 0) {
        TopEarnersChart.render(data, companyNames[0]);
    }

    // Render activity pie chart
    ActivityPieChart.render(data);

    // Render revenue trend chart
    RevenueTrendChart.render(data);
}

// Fetch data and render charts on page load
fetchData();
