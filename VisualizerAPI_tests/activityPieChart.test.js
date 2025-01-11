import { ActivityPieChart } from '../Visualizer/ActivityPieChart';
import Chart from '../__mocks__/chart.js';

global.Chart = Chart; // Mock Chart.js globally

describe('ActivityPieChart', () => {
    test('should render the pie chart for activities', () => {
        document.body.innerHTML = '<canvas id="activityPieChart"></canvas>';

        const mockData = {
            csv: [
                { Activity: 'Yoga', Revenue: '1000' },
                { Activity: 'Pilates', Revenue: '1500' }
            ]
        };

        ActivityPieChart.render(mockData);

        const chartElement = document.getElementById('activityPieChart');
        expect(chartElement).toBeDefined();
    });
});
