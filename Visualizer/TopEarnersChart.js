export class TopEarnersChart {
    static render(data, companyName) {
        // Filter data by the selected company
        const filteredData = data.json.filter(item => item.company_name === companyName);

        // Get the top 5 earners in the selected company
        const topEarners = filteredData
            .sort((a, b) => b.salary - a.salary)
            .slice(0, 5);

        // Combine name and role with a line break for labels
        const topEarnersLabels = topEarners.map(item => `${item.name}\n${item.role}`);
        const topEarnersSalaries = topEarners.map(item => item.salary);

        // Destroy the previous chart instance if it exists
        if (window.topEarnersChart && typeof window.topEarnersChart.destroy === 'function') {
            window.topEarnersChart.destroy();
        }

        // Create the bar chart
        window.topEarnersChart = new Chart(document.getElementById('topEarnersChart'), {
            type: 'bar',
            data: {
                labels: topEarnersLabels,
                datasets: [{
                    label: 'Salary',
                    data: topEarnersSalaries,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: `Top 5 Earners in ${companyName}` }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Employee' },
                        ticks: {
                            callback: function(value) {
                                const label = this.getLabelForValue(value);
                                return label.split('\n');
                            },
                            font: { size: 8 }
                        }
                    },
                    y: {
                        title: { display: true, text: 'Salary (in $)' },
                        ticks: { font: { size: 12 } }
                    }
                }
            }
        });
    }
}
