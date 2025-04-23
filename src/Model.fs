module Model

open System

 type TransactionType = Income | Expense

type Transaction = {
    Id: Guid
    Type: TransactionType
    Category: string
    Amount: decimal
    Date: DateTime
}

type Model = {
    Transactions: Transaction list
    InputType: TransactionType
    InputCategory: string
    InputAmount: string
    Filter: TransactionType option
}

let initModel = {
    Transactions = []
    InputType = Income
    InputCategory = ""
    InputAmount = ""
    Filter = None
}