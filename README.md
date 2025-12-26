## Запустите веб-версию:
```bash
cd web
cp .env.example .env
npm i
```
В `.env` указывайте либо `http://127.0.0.1:8000` (если не будете запускать в андроид студио), иначе `http://10.0.2.2:8000`. Далее
```
npm run dev -- --host     
```

## Запустите бэк:
```bash
cd llm_backend
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
