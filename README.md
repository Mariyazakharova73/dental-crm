# Dental CRM

> Веб-приложение для управления стоматологической клиникой — пациенты, врачи, расписание, услуги, финансы и внутренние задачи.

---

## Статус модулей

| Модуль        | Статус      | Что есть |
| ------------- | ----------- | -------- |
| **Пациенты**  | ✅ готово   | Таблица, CRUD, поиск, фильтр, сортировка, пагинация, карточка профиля |
| **Врачи**     | ✅ готово   | Таблица, CRUD, поиск, сортировка, пагинация |
| **Dashboard** | ⏳ заглушка | Layout и приветствие |
| **Записи**    | ⏳ заглушка | Страница-заголовок |
| **Услуги**    | 📋 в плане  | Пункт меню отключён |
| **Финансы**   | 📋 в плане  | Пункт меню отключён |
| **Задачи**    | 📋 в плане  | Пункт меню отключён |

Карточка пациента пока без вкладок визитов / записей / платежей (добавятся после модуля записей). Карточка врача и расписание — следующие шаги.

---

## Стек технологий

**Core**:
Next.js,
React,
TypeScript

**Стилизация**:
Tailwind CSS,
shadcn/ui

**Состояние и данные**:
TanStack Query,
Zustand,
Axios

**Формы и UI**:
React Hook Form,
Zod

---

## Архитектура

Роутинг Next.js App Router — в корневом `app/` (тонкие re-export). UI и логика — в `src/` по FSD ([гайд FSD + Next.js](https://fsd.how/ru/docs/guides/tech/with-nextjs/)).

```
app/                  # Next.js App Router (re-export)
pages/                # Заглушка (чтобы Next.js не брал src/pages)
server/               # Mock API: db.json (json-server)
src/
├── app/              # Providers, layouts, стили
├── pages/            # Композиция страниц
├── widgets/          # sidebar, header, patient-table, doctor-table, …
├── features/         # create/edit/delete/filter для patient и doctor
├── entities/         # patient, doctor
└── shared/           # ui, api, config, utils
```

Импорты только сверху вниз: `app → pages → widgets → features → entities → shared`.

---

## Этапы разработки

- [x] **Этап 1** — Настройка, FSD, layout, sidebar
- [x] **Этап 2** — Пациенты: таблица, CRUD, формы, фильтры, карточка профиля
- [x] **Этап 3** — Врачи: таблица, CRUD, поиск, сортировка
- [ ] **Этап 4** — Карточка врача и расписание
- [ ] **Этап 5** — Календарь записей
- [ ] **Этап 6** — Dashboard и аналитика
- [ ] **Этап 7** — Kanban задачи
- [ ] **Этап 8** — Полировка: анимации, адаптив, тесты

Текущий фокус: **этап 4** (карточка врача / расписание) или **этап 5** (записи).

---

## Быстрый старт

### Требования

- Node.js 20+
- npm

### Установка

```bash
git clone <repository-url>
cd dental-crm
npm install
```

### Запуск

Нужны **два терминала** — фронтенд и mock API:

```bash
# Терминал 1 — Mock API (порт 3001)
npm run server

# Терминал 2 — Frontend (порт 3000)
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

### Другие команды

```bash
npm run build         # Сборка production
npm run start         # Запуск production
npm run lint          # ESLint
npm run format:check  # Prettier
```

---

## API

На первом этапе используется **json-server** с данными из `server/db.json`.

| Метод    | Эндпоинт        | Описание          |
| -------- | --------------- | ----------------- |
| `GET`    | `/patients`     | Список пациентов  |
| `POST`   | `/patients`     | Создать пациента  |
| `PUT`    | `/patients/:id` | Обновить пациента |
| `DELETE` | `/patients/:id` | Удалить пациента  |

Аналогично для `doctors` (и в данных уже есть `appointments`, `services`, `payments`, `tasks` — UI для них ещё не подключён).

Base URL: `http://localhost:3001`

---

## Маршруты

### Работают

```
/                          → редирект на /dashboard
/dashboard                 → заглушка главной
/patients                  → список пациентов
/patients/:id              → карточка пациента
/doctors                   → список врачей
/appointments              → заглушка записей
```

### В меню, но пока недоступны

```
/services                  → услуги (disabled)
/finance                   → финансы (disabled)
/tasks                     → задачи (disabled)
```

Создание пациента/врача — через диалоги на страницах списков (отдельных `/create` страниц нет).

---

## Планы развития

- Карточка врача и расписание
- Календарь записей, статусы, перенос
- Dashboard: статистика и графики (Recharts)
- Вкладки в карточке пациента (записи, платежи)
- Kanban задач (dnd-kit)
- Авторизация и роли
- Backend (NestJS + PostgreSQL) вместо json-server
