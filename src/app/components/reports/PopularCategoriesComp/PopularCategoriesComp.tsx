"use client"

import React, { useEffect, useRef, useState } from 'react';
import userService from '@/services/user';
import { useQuery, QueryClient } from '@tanstack/react-query';
import { ONE_DAY } from "@/consts/consts";
import { Category, User } from "@/types/types";
import styles from "./PopularCategoriesComp.module.css";

import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const popularCategoriesComp = () => {

    const chartRef = useRef<HTMLCanvasElement | null>(null);

    const { data } = useQuery({
        queryKey: ['test'],
        queryFn: () => userService.getUserById('67693c7994db639cbeefbf42'),
        staleTime:  24 * 60 * 60 * 1000,
    });

    const { data: users, isLoading, error } = useQuery({
        queryKey: ['users_data'],
        queryFn: userService.getAllUsers,
        staleTime:  24 * 60 * 60 * 1000,
        gcTime :  24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    const getPopularCategories = () => {

        const categoryCount: { [key: string]: number } = {};

        users?.forEach(user => {
            if (user.categories) {
                user.categories.forEach((category: Category) => {
                    if (!category.categoryName) return;
                    const categoryName = category.categoryName;
                    categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
                });
            }
        });

        const sortedCategories = Object.entries(categoryCount)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([categoryName, count]) => ({ name: categoryName, count }));

        return sortedCategories.slice(0, 5);
    };

    useEffect(() => {

        if (isLoading || !users || !chartRef.current) return;

        const popularCategories = getPopularCategories();


        const categoryNames = popularCategories.map(cat => cat.name);
        const categoryCounts = popularCategories.map(cat => cat.count);

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const existingChart = Chart.getChart(chartRef.current);
        if (existingChart) {
            existingChart.destroy();
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: categoryNames,
                datasets: [{
                    label: 'Number of Users',
                    data: categoryCounts,
                    backgroundColor: '#A1D6B2',
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            },
        });
    }, [users]);

    if (error) return <div className={styles.loader}>Error loading data</div>;

    return (
        <div className="comparison-chart-container" style={{ width: '90%' }}>
            {isLoading && <div className={styles.loader} />}
            {!isLoading && <canvas ref={chartRef}></canvas>}
        </div>
    );
};

export default popularCategoriesComp;
