"use client";

import { useEffect, useRef } from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Transaction } from "@/types/types";
import styles from "./IncomeExpenseBarChart.module.css"

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
    transactions: Transaction[];
}

const IncomeExpenseBarChart = ({ transactions }: BarChartProps) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                const monthlyData = transactions.reduce((acc, transaction) => {
                    const date = new Date(transaction.date);
                    const month = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: "YYYY-MM"

                    if (!acc[month]) {
                        acc[month] = { income: 0, expense: 0 };
                    }

                    if (transaction.type === "income") {
                        acc[month].income += transaction.amount;
                    } else if (transaction.type === "expense") {
                        acc[month].expense += transaction.amount;
                    }

                    return acc;
                }, {} as { [month: string]: { income: number; expense: number } });

                const labels = Object.keys(monthlyData).sort();
                const incomeData = labels.map((month) => monthlyData[month].income);
                const expenseData = labels.map((month) => monthlyData[month].expense);

                const myChart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Income",
                                data: incomeData,
                                backgroundColor: "#A1D6B2",
                                barThickness: 20,
                            },
                            {
                                label: "Expense",
                                data: expenseData,
                                backgroundColor: "#EF5A6F",
                                barThickness: 20,
                            },
                        ],
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "top",
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw} units`;
                                    },
                                },
                            },
                            datalabels: {
                                display: false
                            }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Months",
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Amount",
                                },
                                beginAtZero: true,
                            },
                        },
                    },
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
        <div className="bar-chart-container">
            
            <canvas ref={chartRef} className={styles.barchart}></canvas>
        </div>
    );
};

export default IncomeExpenseBarChart;
