from pydantic import BaseModel
from typing import List, Optional


class Debt(BaseModel):
    id: int
    lender: str
    amount: float
    dueDate: Optional[str] = None
    category: Optional[str] = None


class DebtAdviceRequest(BaseModel):
    debts: List[Debt]
