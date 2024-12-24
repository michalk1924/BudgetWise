"use client";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, PieController } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // ייבוא plugin datalabels
import { Category } from "@/types/types";
import styles from './budgetDoughnutChart.module.css'

Chart.register(ArcElement, Tooltip, Legend, PieController, ChartDataLabels); // רישום ה-plugin

interface BudgetDoughnutChartProps {
    categories: Category[];
}

const BudgetDoughnutChart = ({ categories }: BudgetDoughnutChartProps) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                const sortedCategories = [...categories].sort((a, b) => b.budget - a.budget);
                const topCategories = sortedCategories.slice(0, 6);
                const othersBudget = sortedCategories.slice(6).reduce((acc, category) => acc + category.budget, 0);
                const labels = topCategories.map((category) => category.categoryName);
                const budgetData = topCategories.map((category) => category.budget);

                if (othersBudget > 0) {
                    labels.push("Others");
                    budgetData.push(othersBudget);
                }
                
                const colors = [
                    "#EF5A6F",
                    "#FFF1DB",
                    "#D4BDAC",
                    "#536493",
                    "#A1D6B2",
                    "#FF7A89",
                    "#B8A394",
                    "#4C829F",
                ];

                const myChart = new Chart(ctx, {
                    type: "pie", 
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Budget",
                                data: budgetData,
                                backgroundColor: colors.slice(0, budgetData.length), 
                                hoverOffset: 10,
                            },
                        ],
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false, 
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        const value = tooltipItem.raw as number;
                                        return `${tooltipItem.label}: ${value} units`;
                                    },
                                },
                            },
                            datalabels: {
                                display: false,
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
    }, [categories]);

    return (
        <div className="budgetPieChartContainer">
            <h3 className={styles.chartTitle}>Category-wise Budget Allocation At This Month </h3> 
            <canvas ref={chartRef} className="budget-pie-chart"></canvas>
        </div>
    );
};

export default BudgetDoughnutChart;
