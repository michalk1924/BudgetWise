'use client';

import React, { useState, useEffect } from 'react';
import styles from './TransactionTable.module.css';
import { Transaction, Category } from '../../../../types/types';
import { DateFilter } from '@/consts/enums';
import { TransactionComp, UploadExcel } from "../../index";
import { ITEMS_PER_PAGE } from '@/consts/consts';

function TransactionsList({
    transactions,
    categories,
    updateTransaction,
    addTransaction,
    savingsNames
}: {
    transactions: Transaction[];
    updateTransaction: (transaction: Transaction) => void;
    addTransaction: (transaction: Transaction) => void;
    categories: Category[];
    savingsNames: string[];
}) {
    const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [dateFilter, setDateFilter] = useState<DateFilter>(DateFilter.Last30Days);
    const [isDropdownOpenCategory, setIsDropdownOpenCategory] = useState<boolean>(false);
    const [isDropdownOpenDate, setIsDropdownOpenDate] = useState<boolean>(false);

    const [isCreating, setIsCreating] = useState(false);
    const [newTransaction, setNewTransaction] = useState<Transaction | null>(null);

    type FilterTransactionsByDate = {
        [key in DateFilter]: (transaction: Transaction) => boolean;
    };

    const filterTransactionsByDate: FilterTransactionsByDate = {
        [DateFilter.Last3BusinessDays]: (transaction: Transaction) => {
            const currentDate = new Date();
            const threeBusinessDaysAgo = new Date(currentDate);
            threeBusinessDaysAgo.setDate(currentDate.getDate() - 3);
            return new Date(transaction.date) >= threeBusinessDaysAgo;
        },
        [DateFilter.Last30Days]: (transaction: Transaction) =>
            new Date(transaction.date) >= new Date(Date.now() - 86400000 * 30),
        [DateFilter.PreviousCalendarMonth]: (transaction: Transaction) => {
            const currentDate = new Date();
            const firstDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const lastDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            return (
                new Date(transaction.date) >= firstDayOfPreviousMonth &&
                new Date(transaction.date) <= lastDayOfPreviousMonth
            );
        },
        [DateFilter.Last3Months]: (transaction: Transaction) =>
            new Date(transaction.date) >= new Date(Date.now() - 86400000 * 90),
        [DateFilter.Last6Months]: (transaction: Transaction) =>
            new Date(transaction.date) >= new Date(Date.now() - 86400000 * 180),
        [DateFilter.LastYear]: (transaction: Transaction) =>
            new Date(transaction.date) >= new Date(Date.now() - 86400000 * 365),
        [DateFilter.Last2Years]: (transaction: Transaction) =>
            new Date(transaction.date) >= new Date(Date.now() - 86400000 * 730),
        [DateFilter.CustomDateRange]: (transaction: Transaction) => true, // Placeholder
    };

    const filterTransactions = () => {
        return transactions.filter((transaction) => {
            let isValid = true;
            if (categoryFilter && transaction?.category?.toString() !== categoryFilter) {
                isValid = false;
            }
            if (dateFilter && !filterTransactionsByDate[dateFilter](transaction)) {
                isValid = false;
            }
            return isValid;
        });
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [dateFilter])

    useEffect(() => {
        const filteredTransactions = filterTransactions();
        const sortedTransactions = filteredTransactions.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE);
        setTotalPages(totalPages);
        const currentTransactions = sortedTransactions
            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setCurrentTransactions(currentTransactions);
    }, [transactions, categoryFilter, currentPage, dateFilter]);

    const handleCreateNewTransaction = () => {
        setNewTransaction({
            _id: `temp-${Date.now()}`,
            category: "",
            type: 'expense', // Default type
            amount: 0,
            description: "",
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            paymentMethod: "cash",
        });
        setIsCreating(true);
    };

    const handleSaveNewTransaction = (transaction: Transaction) => {
        addTransaction(transaction);
        setIsCreating(false);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
                            onClick={() => setIsDropdownOpenDate((prevState) => !prevState)}
                        >
                            <span className={styles.categoryText}>Date</span>
                            <span className={styles.arrow}>▼</span>
                        </div>
                        {isDropdownOpenDate && (
                            <div className={styles.options}>
                                {Object.values(DateFilter)
                                    .filter((value) => typeof value === 'string')
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
                            onClick={() => setIsDropdownOpenCategory((prevState) => !prevState)}
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
                                {categories.map((category: Category, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.option} ${category.categoryName === categoryFilter ? styles.selectedOption : ''}`}
                                        onClick={() => handleCategoryChange(category.categoryName)}
                                    >
                                        {category.categoryName}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>Type</div>
                <div className={styles.hiddenOnSmall}>Description</div>
                <div className={styles.hiddenOnSmall}>Payment Method</div>
            </div>

            {currentTransactions.map((transaction) => (
                <TransactionComp
                    key={transaction._id}
                    transaction={transaction}
                    categories={categories}
                    updateTransaction={updateTransaction}
                    savings={savingsNames}
                    isEdit={false}
                />
            ))}

            {isCreating && newTransaction && (
                <TransactionComp
                    key={newTransaction._id}
                    transaction={newTransaction}
                    categories={categories}
                    updateTransaction={handleSaveNewTransaction}
                    savings={savingsNames}
                    isEdit={true}

                />
            )}

            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    disabled={currentPage === 1 || currentPage === 0}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    {"<<"}
                </button>
                <span className={styles.pageNumber}>
                    Page {totalPages > 0 ? currentPage : 0} of {totalPages}
                </span>
                <button
                    className={styles.pageButton}
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    {">>"}
                </button>
            </div>
            <div className={styles.pagination}>
                <UploadExcel />
                <button onClick={handleCreateNewTransaction} className={styles.addButton}>
                    + Add New Transaction
                </button>
            </div>
        </div>
    );
}

export default TransactionsList;
