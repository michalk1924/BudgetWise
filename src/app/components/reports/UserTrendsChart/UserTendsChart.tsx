"use client"
import { useEffect, useRef } from "react";
import { Chart, LineController, LineElement, PointElement, } from "chart.js";
import { Transaction } from "@/types/types";
import { MONTHS } from "@/consts/consts"


Chart.register(LineController, LineElement, PointElement);

interface LineChartProps {
    transactions: Transaction[] | [];
}

const UserTrends: React.FC<LineChartProps> = ({ transactions }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {

        const labels = getLastFiveMonths();

        interface Data {
            [key: string]: number;
        }

        const data: Data = labels.reduce((acc, label) => {
            acc[label] = 0;
            return acc;
        }, {} as Data);

        transactions?.forEach((transaction: Transaction) => {
            const monthName: string = MONTHS[new Date(transaction.date).getMonth()];
            console.log("monthName", monthName, "amount" + transaction.amount);

            if (labels.includes(monthName)) {
                if (transaction.type == 'expense') {
                    data[monthName] -= transaction.amount;
                }
                else if (transaction.type == 'income') {
                    data[monthName] += transaction.amount;
                }
            }
        });

        const ctx = chartRef.current?.getContext("2d");
        if (!ctx) return;

        const chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Balance Trends",
                        data: labels.map((label) => data[label]),
                        borderColor: "#536493",
                        backgroundColor: (context: any) => {
                            const value = context.raw;
                            return value < 0 ? "#EF5A6F" : "#A1D6B2";
                        },
                        fill: true,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Time Period",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Values",
                        },
                    },
                },
            },
        });

        return () => {
            chartInstance.destroy();
        };

    }, [transactions]);

    const getLastFiveMonths = (): string[] => {

        const today = new Date();
        return Array.from({ length: 5 }, (_, i) => {
            const date = new Date(today.getFullYear(), today.getMonth() - i - 1, 1);
            return MONTHS[date.getMonth()];
        }).reverse();
    };


    return (
        <div className="line-chart-container" style={{ width: '90%' }}>
            <canvas ref={chartRef} className="line-chart"></canvas>
        </div>
    );
};

export default UserTrends;
