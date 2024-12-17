"use client"
import {DoughnutChart, IncomeExpenseBarChart, SavingsBarChart} from '../components/index';
import useUserStore from "@/store/userStore";


export default function Home() {
    const { user } = useUserStore();


    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <DoughnutChart transactions={user?.transactions ?? []} />
            <IncomeExpenseBarChart transactions={user?.transactions ?? []} />
            <SavingsBarChart savings={user?.savings ?? []}/>
        </div>
    );
}