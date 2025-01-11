export class ActivityPieChart {
    static render(data) {
        const activityRevenueMap = {};
        
        // Aggregate revenue by activity
        data.csv.forEach(item => {
            const activity = item.Activity;
            const revenue = parseFloat(item.Revenue);
            if (activityRevenueMap[activity]) {
                activityRevenueMap[activity] += revenue;
            } else {
                activityRevenueMap[activity] = revenue;
            }
        });

        // Prepare Data for Chart.js
        const activities = Object.keys(activityRevenueMap); // Activity names (labels)
        const revenues = Object.values(activityRevenueMap); // Aggregated revenues (data)
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9966FF', '#FF9F40', '#66FF66','#BF2C34'];

        new Chart(document.getElementById('activityPieChart'), {
            type: 'pie',
            data: {
                labels: activities,
                datasets: [{
                    data: revenues,
                    backgroundColor: colors.slice(0, activities.length),
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 10
                            }
                        }
                    },
                    title: { 
                        display: true, 
                        text: 'Revenue Contribution by Activity',
                        font: {
                            size: 18
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                return `${label}: $${value.toFixed(2)}`;
                            }
                        }
                    }
                },
                layout: {
                    padding: 20
                },
            },
            plugins: [{
                id: 'customLabel',
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    chart.data.datasets[0].data.forEach((value, index) => {
                        const meta = chart.getDatasetMeta(0).data[index];
                        const position = meta.tooltipPosition();
                        
                        // Get the activity name and revenue
                        const activity = chart.data.labels[index];
                        const revenue = value.toFixed(2);
                        
                        // Configure text style
                        ctx.fillStyle = '#000';
                        ctx.font = '6px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        
                        // Write activity name and revenue on the slice
                        const text = `${activity}\n$${revenue}`;
                        const lines = text.split('\n');
                        
                        lines.forEach((line, i) => {
                            ctx.fillText(
                                line, 
                                position.x, 
                                position.y + (i * 10 - (lines.length - 1) * 5)
                            );
                        });
                    });
                }
            }]
        });
    }
}
