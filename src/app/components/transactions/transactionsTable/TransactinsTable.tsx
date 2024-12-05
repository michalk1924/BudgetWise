'use client';

import React, { useState, useEffect } from 'react';
import styles from './TransactinsTable.module.css';
import { Transaction } from '../../../../types/types';
import { FaPencilAlt } from 'react-icons/fa';

const ITEMS_PER_PAGE = 8;

function TransactionsList({ transactions }: { transactions: Transaction[] }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {

        const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
        setTotalPages(totalPages);
        console.log(totalPages);
        

        const currentTransactions = transactions.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
        setCurrentTransactions(currentTransactions);

    }, [transactions, currentPage]);

    const isPositive = (type: string) => type === 'expense';

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.listContainer}>
            <div className={styles.header}>
                <div>Date</div>
                <div>Sum</div>
                <div>Category</div>
                <div>Description</div>
            </div>

            {currentTransactions.map((transaction, index) => {
                return (
                    <div
                        key={index}
                        className={`${styles.transactionItem} ${isPositive(transaction.type) ? styles.expense : styles.income
                            }`}
                    >
                        <div>{new Date(transaction.date).toLocaleDateString()}</div>
                        <div>{transaction?.amount}</div>
                        <div>{transaction?.category}</div>
                        <div>{transaction.description || 'N/A'}</div>
                        <div className={styles.icon}>
                            <FaPencilAlt />
                        </div>
                    </div>
                );
            })}

            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>

                <span className={styles.pageNumber}>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className={styles.pageButton}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default TransactionsList;
