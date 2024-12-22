'use client';

import React, { useState, useEffect } from 'react';
import styles from './TransactionTable.module.css';
import { Transaction, Category } from '../../../../types/types';
import { DateFilter } from '@/consts/enums';
import { TransactionComp } from "../../index";
import useUserStore from "@/store/userStore";
import { ITEMS_PER_PAGE } from '@/consts/consts';

function TransactionsList({ transactions, updateTransaction }: { transactions: Transaction[], updateTransaction: (transaction: Transaction) => void }) {

    const { user } = useUserStore();

    const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [dateFilter, setDateFilter] = useState<DateFilter>(DateFilter.Last30Days);
    const categories = new Set(user?.categories?.map((cat: Category) => cat.name)); 
    const [isDropdownOpenCategory, setIsDropdownOpenCategory] = useState<boolean>(false);
    const [isDropdownOpenDate, setIsDropdownOpenDate] = useState<boolean>(false);

    type FilterTransactionsByDate = {
        [key in DateFilter]: (transaction: Transaction) => boolean;
    };

    const filterTransactionsByDate: FilterTransactionsByDate = {
        [DateFilter.Last3BusinessDays]: (transaction: Transaction) => {
            const currentDate = new Date();
            const threeBusinessDaysAgo = new Date(currentDate);
            threeBusinessDaysAgo.setDate(currentDate.getDate() - 3);
            return (new Date(transaction.date)).toISOString() >= threeBusinessDaysAgo.toISOString();
        },

        [DateFilter.Last30Days]: (transaction: Transaction) =>
            (new Date(transaction.date)).toISOString() >= new Date(Date.now() - 86400000 * 30).toISOString(),

        [DateFilter.PreviousCalendarMonth]: (transaction: Transaction) => {
            const currentDate = new Date();
            const firstDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            return (
                (new Date(transaction.date)).toISOString() >= firstDayOfPreviousMonth.toISOString() &&
                (new Date(transaction.date)).toISOString() <= lastDayOfPreviousMonth.toISOString()
            );
        },

        [DateFilter.Last3Months]: (transaction: Transaction) =>
            (new Date(transaction.date)).toISOString() >= new Date(Date.now() - 86400000 * 90).toISOString(),

        [DateFilter.Last6Months]: (transaction: Transaction) =>
            (new Date(transaction.date)).toISOString() >= new Date(Date.now() - 86400000 * 180).toISOString(),

        [DateFilter.LastYear]: (transaction: Transaction) =>
            (new Date(transaction.date)).toISOString() >= new Date(Date.now() - 86400000 * 365).toISOString(),

        [DateFilter.Last2Years]: (transaction: Transaction) =>
            (new Date(transaction.date)).toISOString() >= new Date(Date.now() - 86400000 * 730).toISOString(),

        [DateFilter.CustomDateRange]: (transaction: Transaction) => true, // Implement custom date range filtering logic here
    };

    const filterTransactions = () => {
        return transactions.filter((transaction) => {
            let isValid = true;
            if (categoryFilter && transaction.category !== categoryFilter) {
                isValid = false;
            }
            if (dateFilter && !filterTransactionsByDate[dateFilter](transaction)) {
                console.log("Filter transaction" + transaction.date);

                console.log(filterTransactionsByDate[dateFilter](transaction));

                isValid = false;
            }
            return isValid;
        });
    };

    useEffect(() => {
        const filteredTransactions = filterTransactions();
        const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
        setTotalPages(totalPages);
        const currentTransactions = filteredTransactions.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        );
        setCurrentTransactions(currentTransactions);
    }, [transactions, categoryFilter, dateFilter, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const toggleDropdown = () => {
        setIsDropdownOpenCategory(prevState => !prevState);
    };

    const handleCategoryChange = (category: string) => {
        setCategoryFilter(category);
        setIsDropdownOpenCategory(false);
    };

    const handleDateChange = (date: DateFilter) => {
        setDateFilter(date);
        setIsDropdownOpenDate(false);
    };

    return (
        <div className={styles.listContainer}>

            <div className={styles.header}>
                <div>
                    <div className={styles.dropdownContainer}>
                        <div
                            className={`${styles.filterSelect} ${isDropdownOpenDate ? styles.open : ''}`}
                            onClick={() => setIsDropdownOpenDate(prevState => !prevState)}
                        >
                            <span className={styles.categoryText}>Date</span>
                            <span className={styles.arrow}>▼</span>
                        </div>

                        {isDropdownOpenDate && (
                            <div className={styles.options}>
                                {Object.values(DateFilter)
                                    .filter((value) => typeof value === "string")
                                    .map((date: DateFilter, index: number) => (
                                        <div
                                            key={index}
                                            className={`${styles.option} ${date === dateFilter ? styles.selectedOption : ''}`}
                                            onClick={() => handleDateChange(date)}
                                        >
                                            {date}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>Sum</div>
                <div>
                    <div className={styles.dropdownContainer}>
                        <div
                            className={`${styles.filterSelect} ${isDropdownOpenCategory ? styles.open : ''}`}
                            onClick={toggleDropdown}
                        >
                            <span className={styles.categoryText}>Category</span>
                            <span className={styles.arrow}>▼</span>
                        </div>

                        {isDropdownOpenCategory && (
                            <div className={styles.options}>
                                <div
                                    className={`${styles.option} ${categoryFilter === '' ? styles.selectedOption : ''}`}
                                    onClick={() => handleCategoryChange('')}
                                >
                                    All Categories
                                </div>
                                {/* {categories.map((category, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.option} ${category === categoryFilter ? styles.selectedOption : ''}`}
                                        onClick={() => handleCategoryChange(category)}
                                    >
                                        {category}
                                    </div>
                                ))} */}
                                {Array.from(categories).map((category: string, index: number) => (
                                    <div
                                        key={index}
                                        className={`${styles.option} ${category === categoryFilter ? styles.selectedOption : ''}`}
                                        onClick={() => handleCategoryChange(category)}
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>Description</div>
                <div>Payment Method</div> {/* הכנס את השדה Payment Method כאן */}
            </div>

            {currentTransactions.map((transaction) => (
                <TransactionComp key={transaction._id} transaction={transaction} updateTransaction={updateTransaction} />
            ))}

            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    disabled={currentPage === 1 || currentPage === 0}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>

                <span className={styles.pageNumber}>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className={styles.pageButton}
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default TransactionsList;
