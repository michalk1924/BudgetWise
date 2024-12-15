"use client"
import DoughnutChart from '../components/PieChart-monthly-expenses/PieChart-monthly-expenses';
import IncomeExpenseBarChart from '../components/IncomeExpenseBarChart/IncomeExpenseBarChart';
import useUserStore from "@/store/userStore";


export default function Home() {
    const { user } = useUserStore();


    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <DoughnutChart transactions={user?.transactions ?? []} />
            <IncomeExpenseBarChart transactions={user?.transactions ?? []} />
        </div>
    );
}