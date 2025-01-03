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

    const relevantExpenses = expenses.filter((expense) => {
        if (!expense.totalInstallments || expense.totalInstallments <= 0) return true;

        const firstPaymentDate = expense.firstPaymentDate ? new Date(expense.firstPaymentDate) : new Date(); // או כל תאריך ברירת מחדל אחר
        const currentDate = new Date();
        const monthsBetween =
            (currentDate.getFullYear() - firstPaymentDate.getFullYear()) * 12 +
            currentDate.getMonth() -
            firstPaymentDate.getMonth();

        return monthsBetween < expense.totalInstallments;
    });

    const totalRelevantExpenses = relevantExpenses.reduce((sum, expense) => sum + (expense?.amount||0), 0);

    useEffect(() => {
        if (!chartRef.current) return;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const dailyExpenses: { [key: number]: number } = {};

        relevantExpenses.forEach((expense) => {
            const day = expense.firstPaymentDate ? new Date(expense.firstPaymentDate).getDate() : 0; // במקום null, מחזיר 0
            dailyExpenses[day] = (dailyExpenses[day] || 0) + (expense.amount||0);
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
                        backgroundColor: "#EF5A6F",
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
    }, [expenses, relevantExpenses]);

    return (
        <div className={styles.container}>
            <div className={styles.barHeader}>
                <span className={styles.category}>Your expected expenses this month</span>
                <span className={styles.totalExpenses}>
                    Total: ₪{totalRelevantExpenses.toFixed(2)}
                </span>
            </div>
            <div className={styles.barBackground}>
                <canvas ref={chartRef} />
            </div>
        </div>
    );
};

export default HorizontalBarChart;
