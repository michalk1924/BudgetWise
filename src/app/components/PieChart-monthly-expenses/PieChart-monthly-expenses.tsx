"use client"
import { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export interface Transaction {
    _id: string;
    category: string;
    type: 'income' | 'expense' | 'saved';
    amount: number;
    description: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

interface DoughnutChartProps {
    transactions: Transaction[];
}

const DoughnutChart = ({ transactions }: DoughnutChartProps) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // קבוצת ההוצאות לפי קטגוריה
                const expenseCategories = transactions
                    .filter(transaction => transaction.type === 'expense')
                    .reduce((acc, transaction) => {
                        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
                        return acc;
                    }, {} as { [key: string]: number });

                // נתונים לגרף
                const data = Object.keys(expenseCategories).map(category => expenseCategories[category]);
                const labels = Object.keys(expenseCategories);

                const myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: labels, // קטגוריות כתיוגים
                        datasets: [{
                            label: 'Expense Breakdown by Category',
                            data: data,  // נתוני ההוצאות לפי קטגוריה
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#9C27B0'],  // צבעים
                            hoverOffset: 10
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top', // מיקום הלגנד
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        return tooltipItem.label + ': ' + tooltipItem.raw + ' units';
                                    }
                                }
                            }
                        }
                    }
                });

                return () => {
                    if (myChart) {
                        myChart.destroy(); // הורסים את הגרף כשמפסיקים את השימוש בו
                    }
                };
            }
        }
    }, [transactions]); // ריצה מחדש כשיש שינוי בנתוני הפעולות

    return (
        <div>
            <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
    );
};

export default DoughnutChart;
