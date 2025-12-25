from fastapi import FastAPI
from schemas import DebtAdviceRequest
from llm import generate_debt_advice_text

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Debt Advice API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/api/generate-debt-advice")
async def generate_debt_advice(request: DebtAdviceRequest):
    # Формируем текстовый список долгов
    debts_list_str = "\n".join(
        f"- {d.lender}, сумма: {d.amount} ₽, дата погашения: {d.dueDate or 'не указана'}"
        for d in request.debts
    )

    # Формируем текстовый список доходов
    incomes_list_str = "\n".join(
        f"- источник: {i.source}, сумма: {i.amount} ₽, дата: {i.date}"
        for i in request.incomes
    )

    # Формируем текстовый список расходов
    expenses_list_str = "\n".join(
        f"- категория: {e.categoryId}, сумма: {e.amount} ₽, дата: {e.date}, описание: {e.description or '—'}"
        for e in request.expenses
    )

    # Генерируем прогноз через LLM
    advice_text = generate_debt_advice_text(
        debts_list=debts_list_str,
        incomes_list=incomes_list_str,
        expenses_list=expenses_list_str,
    )
    return {"advice": advice_text}
