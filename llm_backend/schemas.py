from pydantic import BaseModel
from typing import List, Optional


class Debt(BaseModel):
    id: int
    lender: str
    amount: float
    dueDate: Optional[str] = None
    category: Optional[str] = None

class Expense(BaseModel):
    id: int
    amount: float
    categoryId: str
    description: Optional[str] = None
    date: str


class Income(BaseModel):
    id: int
    amount: float
    categoryId: str
    source: str
    date: str
    comment: Optional[str] = None
    recurring: Optional[bool] = None

class DebtAdviceRequest(BaseModel):
    debts: List[Debt]
    incomes: List[Income]
    expenses: List[Expense]
