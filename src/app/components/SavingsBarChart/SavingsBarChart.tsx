"use client"

import { useEffect, useRef } from 'react';
import { Chart, BarController, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Saving } from '@/types/types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const COLORS = ['#EF5A6F', '#FFF1DB', '#D4BDAC', '#536493', '#A1D6B2', '#FF7A89', '#B8A394', '#4C829F'];

Chart.register(BarController, BarElement, Tooltip, Legend, CategoryScale, LinearScale, ChartDataLabels);

interface DoughnutChartProps {
    savings: Saving[];
}

const SavingsBarChart = ({ savings }: DoughnutChartProps) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                const savingsForNext5Days = analyzeSavingsProgress(savings);

                const labels = getNext5DaysLabels();

                const categories = Array.from(new Set(
                    savingsForNext5Days.flatMap(daySavings =>
                        daySavings
                            .filter(saving => saving && typeof saving === 'object')
                            .map(saving => {
                                const keys = Object.keys(saving);
                                return keys.length > 0 ? keys[0] : null;
                            })
                            .filter(key => key !== null)
                    )
                ));

                const datasets = categories.map((category, index) => {

                    const data = savingsForNext5Days.map(daySavings => {
                        const saving = daySavings.find(s => s.hasOwnProperty(category));
                        return saving ? saving[category] : null;
                    }).filter(value => value !== null && value > 0);

                    if (data.length === 0) return null;

                    return {
                        label: category,
                        data,
                        backgroundColor: COLORS[index % COLORS.length],
                        borderColor: "black",
                        borderWidth: 1,
                    };
                }).filter(dataset => dataset !== null);

                const totalSums = savingsForNext5Days.map(daySavings =>
                    daySavings.reduce((sum, saving) => sum + Object.values(saving)[0], 0)
                );

                datasets.push({
                    label: "Total",
                    data: totalSums,
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    borderWidth: 0,
                });

                const myChart = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels,
                        datasets,
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    filter: function (legendItem) {
                                        return legendItem.text !== "Total";
                                    }
                                },
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (tooltipItem) {
                                        return tooltipItem.label + ': ' + tooltipItem.raw + ' units';
                                    }
                                }
                            },
                            datalabels: {
                                anchor: "end",
                                align: "bottom",
                                formatter: (value, context) => {
                                    if (context.dataset.label === "Total") {
                                        return `Total: ${value}`;
                                    }
                                    return value;
                                },
                                color: "black",
                                font: {
                                    weight: "bold",
                                    size: 12,
                                },
                            },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Days",
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: "save for your savings",
                                },
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
    }, [savings]);

    const analyzeSavingsProgress = (savings: Saving[]) => {

        const savings2 = savings.map((saving: Saving) => {

            const { goalName, targetAmount, currentAmount, deadline } = saving;

            const today = new Date();

            const differenceInMs = new Date(deadline).getTime() - today.getTime();
            const remainingTimeInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
            const remainingAmount = targetAmount - currentAmount;
            const dailyRequiredSaving = remainingAmount > 0 ? Math.ceil(remainingAmount / remainingTimeInDays) : 0;
            const progressPercentage = ((currentAmount / targetAmount) * 100);

            return {
                goalName,
                remainingTimeInDays,
                remainingAmount,
                dailyRequiredSaving,
                progressPercentage: `${progressPercentage}%`,
                status: remainingAmount <= 0 ? "Goal Achieved!" : "In Progress"
            };

        })

        const today = new Date();
        const fiveDaysFromToday = new Date();
        fiveDaysFromToday.setDate(today.getDate() + 5);

        const savingsForNext5Days: { [key: string]: number }[][] = Array(5).fill(null).map(() => []);

        for (const saving of savings2) {
            const { goalName, remainingTimeInDays, dailyRequiredSaving } = saving;

            if (remainingTimeInDays > 0) {
                for (let i = 0; i < Math.min(remainingTimeInDays, 5); i++) {
                    savingsForNext5Days[i].push({ [goalName]: dailyRequiredSaving });
                }
            }
        }

        return savingsForNext5Days;
    }

    const getNext5DaysLabels = () => {
        const labels = [];
        const today = new Date();

        for (let i = 0; i < 5; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            const formattedDate = nextDay.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short"
            });
            labels.push(formattedDate);
        }

        return labels;
    };


    return (
        <div className="doughnut-chart-container">
            <canvas ref={chartRef} className="doughnut-chart"></canvas>
        </div>
    );
};

export default SavingsBarChart;
