"use client"

import React from 'react'
import styles from './TransactinsTable.module.css';
import { Transaction } from '../../../../types/types';

function TransactinsTable({ transactions }: { transactions: Transaction[] }) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Sum</th>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <tr key={index}>
                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                        <td>{transaction?.amount}</td>
                        <td>{transaction?.category}</td>
                        <td>{transaction.description || "N/A"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TransactinsTable