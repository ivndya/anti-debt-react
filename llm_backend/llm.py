from pathlib import Path
from langchain_core.prompts import PromptTemplate
from langchain_classic.chains import LLMChain
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENROUTER_API_KEY")
os.environ["LANGCHAIN_TRACING_V2"] = "false"

# === LLM ===
llm = ChatOpenAI(
   model="openai/gpt-oss-20b:free",
   openai_api_key=api_key,
   temperature=0,
   request_timeout=20,
   base_url="https://openrouter.ai/api/v1"
)

# === Load prompt from txt ===
PROMPT_PATH = Path(__file__).parent / "system_prompt.txt"

# Создаем цепочку с шаблоном промпта
prompt_template = PromptTemplate(
    input_variables=["debts_list"],
    template=PROMPT_PATH.read_text(encoding="utf-8")
)

llm_chain = LLMChain(llm=llm, prompt=prompt_template)

def generate_debt_advice_text(debts_list: str) -> str:
    """Генерирует текст прогноза долгов через LLM"""
    result = llm_chain.run(debts_list=debts_list)
    return result
