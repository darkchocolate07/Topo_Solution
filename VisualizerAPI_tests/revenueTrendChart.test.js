import { RevenueTrendChart } from '../Visualizer/RevenueTrendChart';
import Chart from '../__mocks__/chart.js';

global.Chart = Chart; // Mock Chart.js globally

describe('RevenueTrendChart', () => {
    test('should render the line chart for revenue trends', () => {
        document.body.innerHTML = '<canvas id="revenueLineChart"></canvas>';

        const mockData = {
            pdf: [
                { 'Year': '2022', 'Quarter': 'Q1', 'Revenue (in $)': '1000' },
                { 'Year': '2022', 'Quarter': 'Q2', 'Revenue (in $)': '1500' }
            ]
        };

        RevenueTrendChart.render(mockData);

        const chartElement = document.getElementById('revenueLineChart');
        expect(chartElement).toBeDefined();
    });
});
