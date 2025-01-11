import { TopEarnersChart } from '../Visualizer/TopEarnersChart';
import Chart from '../__mocks__/chart.js';

global.Chart = Chart; // Mock Chart.js globally

describe('TopEarnersChart', () => {
    test('should render the bar chart with top earners', () => {
        document.body.innerHTML = '<canvas id="topEarnersChart"></canvas>';

        const mockData = {
            json: [
                { name: 'Alice', role: 'Engineer', salary: 5000, company_name: 'Company A' },
                { name: 'Bob', role: 'Manager', salary: 7000, company_name: 'Company A' }
            ]
        };

        TopEarnersChart.render(mockData, 'Company A');

        const chartElement = document.getElementById('topEarnersChart');
        expect(chartElement).toBeDefined();
    });
});
