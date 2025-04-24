module Model

open System

type TransactionType = Income | Expense

type Transaction = {
    Id: Guid
    Type: TransactionType
    Description: string
    Category: string
    Amount: decimal
    Date: DateTime
}

type Model = {
    Transactions: Transaction list
    InputDescription: string
    InputAmount: string
    InputCategory: string
}

let initModel = {
    Transactions = []
    InputDescription = ""
    InputAmount = ""
    InputCategory = ""
}