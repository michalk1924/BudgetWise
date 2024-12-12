import { Alert, Saving } from "@/types/types";

const budgetMultiplier = 1.5;
const minBalanceMultiplier = 0.2;

let balanceAlert:Alert;
let savingAlert:Alert;


function validateAccountBalance(
  balance: number,
  budget: number,
) {

    /* if (isNaN(balance))
        throw("Account balance is invalid (NaN)."); */
    
    if (balance < 0) {
        balanceAlert={
            alertId: "balanceAlert",
            type: "balance",
            triggerCondition: "Account balance is negative",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            severityLevel: "critical",
            solutions: [
                {
                    id: "addIncome",
                    description: "Add new income to stabilize account balance.",
                    actionLink: "/income/add",
                    isRecommended: true,
                },
                {
                    id: "reduceExpenses",
                    description: "Review your expenses and reduce non-essential categories.",
                    actionLink: "/transactions",
                },
                {
                    id: "transferSavings",
                    description: "Transfer funds from your savings to cover the balance.",
                    actionLink: "/savings",
                },
            ],
        }
    } 

    if (balance > budgetMultiplier * budget){ 
        balanceAlert={
            alertId: "balanceAlert",
            type: "balance",
            triggerCondition: "Account balance is large",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            severityLevel: "critical",
            solutions: [
                {
                    id: "transferToSavings",
                    description: "Transfer surplus funds to savings for long-term goals",
                    actionLink: "/savings",
                    isRecommended: true,
                },
                {
                    id: "investFunds",
                    description: "Invest the surplus funds in suitable investment opportunities.",
                    actionLink: "/investments",
                },
                {
                    id: "prepayLoans",
                    description: "Use the surplus balance to prepay loans or debts, reducing future interest.",
                },
                {
                    id: "increaseDiscretionaryBudget",
                    description: "Increase your budget for categories like entertainment or vacations.",
                    actionLink: "/categories",
                    isRecommended: false,
                },
            ],
            
        }
    }
    if (balance >= 0 && balance < minBalanceMultiplier * budget){
        balanceAlert={
            alertId: "balanceAlert",
            type: "balance",
            triggerCondition: "Account balance is critically low",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            severityLevel: "critical",
            solutions: [
                {
                    id: "addIncome",
                    description: "Add new income to stabilize account balance.",
                    actionLink: "/income/add",
                    isRecommended: true,
                },
                {
                    id: "reduceExpenses",
                    description: "Review your expenses and reduce non-essential categories.",
                    actionLink: "/expenses/review",
                },
                {
                    id: "transferSavings",
                    description: "Transfer funds from your savings to cover the balance.",
                    actionLink: "/savings/transfer",
                },
            ],
        }
    }

    return balanceAlert;
}

function validateSaving(saving:Saving){

if (saving.targetAmount<=saving.currentAmount){
    savingAlert={
        alertId: "savingAlert",
        type: "saving",
        triggerCondition: "Saving goal is met or exceeded",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        severityLevel: "Pay attention",
        solutions: [
            {
                id: "pullSaving",
                description: "Use saved fund to fulfill your goal",
                actionLink: "/savings",
                isRecommended: true,
            },
            {
                id: "increaseTarget",
                description: "Increase the target amount for saving goals.",
                actionLink: "/savings",
                isRecommended: false,
            },
            {
                id: "transferFunds",
                description: "Transfer funds from your savings to other goals.",
                actionLink: "/savings",
                isRecommended: false,
            },
        ],
    }
}

if (saving.currentAmount<saving.targetAmount && saving.deadline<new Date()){
    savingAlert={
        alertId: "savingAlert",
        type: "saving",
        triggerCondition: "Saving goal is not met and deadline is close",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        severityLevel: "Pay attention",
        solutions: [
            {
                id: "transferFunds",
                description: "Transfer funds from your savings to cover the balance.",
                actionLink: "/savings",
                isRecommended: true,
            },
            {
                id: "Postpone deadline",
                description: "Postpone the deadline to another date",
                actionLink: "/savings",
                isRecommended: true,
            },
            {
                id: "pullSaving",
                description: "Use saved fund to fulfill your goal",
                actionLink: "/savings",
                isRecommended: true,
            },
        ]
    }
}
if (saving.currentAmount===0){
    savingAlert={
        alertId: "savingAlert",
        type: "saving",
        triggerCondition: "No funds have been saved yet",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        severityLevel: "Pay attention",
        solutions: [
            {
                id: "transferFunds",
                description: "Transfer funds from your savings to cover the balance.",
                actionLink: "/savings",
                isRecommended: true,
            },
        ],
    }
}
/* let leftAmount=saving.targetAmount-saving.currentAmount;
let currentDate = new Date();
let pastTime=currentDate.getDate()-saving.createdAt.getDate();
let time=saving.deadline.getDate()-saving.createdAt.getDate();

if() */


}
