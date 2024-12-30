import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { FixedExpense } from "../../../types/types";
import styles from "./HorizontalBarChart.module.css";

interface Props {
    expenses: FixedExpense[];
}

const HorizontalBarChart: React.FC<Props> = ({ expenses }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const dailyExpenses: { [key: number]: number } = {};

        const filteredExpenses = expenses.filter(expense => {
            if (!expense.totalInstallments || expense.totalInstallments <= 0) return true;

            const firstPaymentDate = new Date(expense.firstPaymentDate);
            const currentDate = new Date();
            const monthsBetween = (currentDate.getFullYear() - firstPaymentDate.getFullYear()) * 12 + currentDate.getMonth() - firstPaymentDate.getMonth();

            return monthsBetween < expense.totalInstallments;
        });

        filteredExpenses.forEach((expense) => {
            const day = new Date(expense.firstPaymentDate).getDate();
            dailyExpenses[day] = (dailyExpenses[day] || 0) + expense.amount;
        });

        const labels = Object.keys(dailyExpenses).map((day) => ` ${day}`);
        const data = Object.values(dailyExpenses);

        chartInstanceRef.current = new Chart(chartRef.current, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor: "rgba(239, 90, 111, 0.5)",
                        borderWidth: 1,
                        borderRadius: 10,
                    },
                ],
            },
            options: {
                indexAxis: "y",
                responsive: true,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Total expenses (₪)",
                            font: { size: 14, weight: "bold" },
                            color: "#536493",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "days",
                            font: { size: 14, weight: "bold" },
                            color: "#536493",
                        },
                    },
                },
            },
        });
    }, [expenses]);

    return (
        <div className={styles.container}>
            <div className={styles.barHeader}>
                <span className={styles.category}>Your expected expenses this month</span>
            </div>
            <div className={styles.barBackground}>
                <canvas ref={chartRef} />
            </div>
        </div>
    );
};

export default HorizontalBarChart;
