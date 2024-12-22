"use client"
import { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';
import { Transaction } from '@/types/types';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

interface DoughnutChartProps {
    transactions: Transaction[];
}

const DoughnutChart = ({ transactions }: DoughnutChartProps) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                const expenseCategories = transactions
                    .filter(transaction => transaction.type === 'expense')
                    .reduce((acc, transaction) => {
                        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
                        return acc;
                    }, {} as { [key: string]: number });

                const data = Object.keys(expenseCategories).map(category => expenseCategories[category]);
                const labels = Object.keys(expenseCategories);

                const myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Expense Breakdown by Category',
                            data: data,
                            backgroundColor: ['#EF5A6F', '#FFF1DB', '#D4BDAC', '#536493', '#A1D6B2', '#FF7A89', '#B8A394', '#4C829F'],
                            hoverOffset: 10
                        }]
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        return tooltipItem.label + ': ' + tooltipItem.raw + ' units';
                                    }
                                }
                            },
                            datalabels: {
                                display: false
                            }
                        }
                    }
                });

                return () => {
                    if (myChart) {
                        myChart.destroy();
                    }
                };
            }
        }
    }, [transactions]);

    return (
        <div className="doughnut-chart-container">
            <canvas ref={chartRef} className="doughnut-chart"></canvas>
        </div>
    );
};

export default DoughnutChart;
