## Запустите веб-версию:
```bash
cd web
npm i
npm run dev -- --host     
```

## Запустите бэк:
```bash
cd .. && cd llm_backend
cp .env.example .env
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
Укажите в `.env` апи ключ openrouter. Далее
```bash
uvicorn main:app --reload
```


## Запустите андроид версию:
1) Откройте директорию `android` в Android Studio.
2) Дождитесь gradle project sync process, затем запустите, нажав на зеленый треугольник.
