"use client"
import {DoughnutChart, IncomeExpenseBarChart, SavingsBarChart} from '../components/index';
import useUserStore from "@/store/userStore";
import { ExpenseComparisonChart } from "../components/index";
import fetchDataAndCompare from '@/services/api';
import { useState, useEffect } from 'react';


export default function Home() {

    const { user } = useUserStore();

    const [comparisonResults, setComparisonResults] = useState<any[]>([]);

    useEffect(() => {
        const fetchComparisonData = async () => {
            try {
                const data = await fetchDataAndCompare(user);
                setComparisonResults(data ?? []);
            } catch (error) {
                console.error("Failed to fetch comparison results:", error);
            }
        };

        fetchComparisonData();
    }, [user]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <DoughnutChart transactions={user?.transactions ?? []} />
            <IncomeExpenseBarChart transactions={user?.transactions ?? []} />
            <SavingsBarChart savings={user?.savings ?? []}/>
            <ExpenseComparisonChart comparisonResults={comparisonResults} />
        </div>
    );
}