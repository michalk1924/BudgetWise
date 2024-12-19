"use servvice"

import axios from "axios";
import { Transaction, User } from "@/types/types";
import { Categories } from "@/consts/enums";
import { ONE_DAY, CACHE_TIMESTAMP_KEY, CACHE_KEY } from "@/consts/consts";

//fetches market data for a specific category.
const getMarketDataForCategory = async (category: string) => {
    const apiKey = process.env.API_KEY;
    const url = `https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=${category}&api_key=${apiKey}&file_type=json`;

    try {
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${category}`, error);
        return null;
    }
};

//fetches user's expenses for a specific year.
const fetchMarketDataForAllCategories = async (): Promise<any> => {
    const marketDataByYear: { [year: number]: any[] } = {};

    for (const category of Object.values(Categories)) {
        try {
            const data = await getMarketDataForCategory(category);

            if (data && data.observations && Array.isArray(data.observations)) {
                data.observations.forEach((observation: { date: string, value: string }) => {
                    const observationYear = new Date(observation.date).getFullYear();
                    const value = parseFloat(observation.value);

                    if (!marketDataByYear[observationYear]) {
                        marketDataByYear[observationYear] = [];
                    }

                    marketDataByYear[observationYear].push({
                        category,
                        year: observationYear,
                        total_price: value
                    });
                });
            }
        } catch (error) {
            console.error(`Error fetching data for category ${category}:`, error);
        }
    }
    return marketDataByYear;
};

//compares the user's expenses with market data and calculates the differences.
const compareUserWithMarket = (userExpenses: any, marketTrends: any) => {
    const comparisons: any[] = [];

    Object.keys(userExpenses).forEach((year: string) => {
        const yearExpenses = userExpenses[year];

        Object.keys(yearExpenses).forEach((category: string) => {
            const userAmount = yearExpenses[category];

            const marketData = marketTrends[parseInt(year)]?.find((data: any) => data.category === category);

            if (marketData) {

                const expenseDifference = marketData.total_price - userAmount;
                const percentageDifference = ((userAmount / marketData.total_price) * 100).toFixed(2);

                const categoryKey = Object.keys(Categories).find((key) => Categories[key as keyof typeof Categories] === category);

                comparisons.push({
                    category: categoryKey,
                    year: parseInt(year),
                    userAmount,
                    marketPrice: marketData.total_price,
                    expenseDifference,
                    percentageDifference: parseInt(percentageDifference),
                });
            }
        });
    });

    return comparisons;
};

//group by category and year
const groupExpensesByCategoryAndYear = (userExpenses: any) => {
    const groupedExpenses = userExpenses.reduce((acc: any, transaction: Transaction) => {
        let year = new Date(transaction.date).getFullYear();
        year = year - 3;
        const category = Categories[transaction.category as keyof typeof Categories] || transaction.category;

        if (!acc[year]) {
            acc[year] = {};
        }

        if (!acc[year][category]) {
            acc[year][category] = 0;
        }

        acc[year][category] += transaction.amount;

        return acc;
    }, {});

    return groupedExpenses;
};

//the main function that performs all of the tasks—fetching user data, retrieving market data, and performing the comparison.
const fetchDataAndCompare = async (user: User | null) => {
    try {

        if (!user) return;

        let marketTrends = {};

        const now = new Date().getTime();

        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cachedData && cachedTimestamp && now - parseInt(cachedTimestamp) < ONE_DAY) {
            marketTrends = JSON.parse(cachedData);
        }
        else {
            marketTrends = await fetchMarketDataForAllCategories();
            localStorage.setItem(CACHE_KEY, JSON.stringify(marketTrends));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());
            // marketTrends = {
            //     2021: [
            //         {
            //             category: "Health",
            //             total_price: 1000
            //         },
            //         {
            //             category: "Food",
            //             total_price: 1500
            //         },
            //         {
            //             category: "Transport",
            //             total_price: 2000
            //         },
            //         {
            //             category: "Entertainment",
            //             total_price: 1200
            //         }
            //     ],
            //     2025: [
            //         {
            //             category: "Health",
            //             market_price: 1200
            //         },
            //         {
            //             category: "Food",
            //             market_price: 1800
            //         },
            //         {
            //             category: "Transport",
            //             market_price: 2200
            //         },
            //         {
            //             category: "Entertainment",
            //             market_price: 1400
            //         },
            //         {
            //             category: "Utilities",
            //             market_price: 1500
            //         },
            //         {
            //             category: "Others",
            //             market_price: 1000
            //         }
            //     ],
            // };
        }

        const userExpenses = user?.transactions.filter(t => t.type == "expense");
        const groupedExpenses = groupExpensesByCategoryAndYear(userExpenses);

        console.log("user expenses", groupedExpenses);
        console.log("data", marketTrends);

        const comparisonResults = compareUserWithMarket(groupedExpenses, marketTrends);
        console.log("comparison results" + JSON.stringify(comparisonResults));

        const year = new Date(Date.now()).getFullYear() - 3;

        const comparisonResultsForThisYear = comparisonResults.filter(
            (result) => result.year === year
        )

        if (comparisonResultsForThisYear) {
            console.log("Comparison results for this year", comparisonResultsForThisYear);
            return comparisonResultsForThisYear
        } else {
            console.log("No comparison results for this year");
        }

    }
    catch (error) {
        console.error("Error comparing user with market data", error);
        return null;
    }
}

export default fetchDataAndCompare;