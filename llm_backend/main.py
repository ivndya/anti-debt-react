from fastapi import FastAPI
from schemas import DebtAdviceRequest
from llm import generate_debt_advice_text

app = FastAPI(title="Debt Advice API")

@app.post("/api/generate-debt-advice")
async def generate_debt_advice(request: DebtAdviceRequest):
    # Формируем текстовый список долгов
    debts_list_str = "\n".join(
        f"- {d.lender}, сумма: {d.amount} ₽, дата погашения: {d.dueDate or 'не указана'}"
        for d in request.debts
    )

    # Генерируем прогноз через LLM
    advice_text = generate_debt_advice_text(debts_list_str)

    return {"advice": advice_text}
