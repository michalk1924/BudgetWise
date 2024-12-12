"use client"
import DoughnutChart from '../components/PieChart-monthly-expenses/PieChart-monthly-expenses';
import useUserStore from "@/store/userStore";


export default function Home() {
    const { user } = useUserStore();


    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <DoughnutChart transactions={user?.transactions ?? []} />    
            </div>
    );
}