export class RevenueTrendChart {
    static render(data) {
        const quarters = data.pdf.map(item => `${item["Year"]} ${item["Quarter"]}`);
        const revenueTrend = data.pdf.map(item => parseFloat(item["Revenue (in $)"].replace(/,/g, '')));

        new Chart(document.getElementById('revenueLineChart'), {
            type: 'line',
            data: {
                labels: quarters,
                datasets: [{
                    label: 'Revenue',
                    data: revenueTrend,
                    borderColor: '#36A2EB',
                    backgroundColor: 'rgba(54,162,235,0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Revenue Trend Over Quarters' }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Quarter' },
                        ticks: { font: { size: 14 } }
                    },
                    y: {
                        title: { display: true, text: 'Revenue (in $)' },
                        ticks: { font: { size: 14 } }
                    }
                }
            }
        });
    }
}
