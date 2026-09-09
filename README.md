# Dental CRM

> Веб-приложение для управления стоматологической клиникой — пациенты, врачи, расписание, услуги, финансы и внутренние задачи.

---

## Статус модулей

| Модуль        | Статус              | Что есть |
| ------------- | ------------------- | -------- |
| **Пациенты**  | ✅ готово           | Таблица, CRUD, поиск, фильтр, сортировка, пагинация, карточка (обзор + записи + финансы) |
| **Врачи**     | ✅ готово           | Таблица, CRUD, поиск, сортировка, пагинация, карточка (обзор + записи) |
| **Записи**    | ✅ готово           | Календарь + таблица, CRUD, смена статуса, фильтры; списки в карточках пациента/врача |
| **Платежи**   | ✅ готово           | Вкладка «Финансы» у пациента: сводка, список, создание, редактирование, смена статуса |
| **Услуги**    | ✅ список           | Каталог (read-only таблица); CRUD пока нет |
| **Dashboard** | ⏳ заглушка         | Layout и приветствие ← **следующий этап** |
| **Финансы**   | ⏳ заглушка         | Пункт меню отключён; страница-заглушка |
| **Задачи**    | ⏳ заглушка         | Пункт меню отключён; страница-заглушка |
| **Документы** | ⏳ заглушка         | Вкладка в карточке пациента — placeholder |

---

## Стек технологий

**Core**: Next.js 16, React 19, TypeScript

**Стилизация**: Tailwind CSS 4, shadcn/ui

**Состояние и данные**: TanStack Query, Zustand, Axios

**Формы и UI**: React Hook Form, Zod, TanStack Table, date-fns, next-themes

**Календарь / графики / DnD**: FullCalendar, Recharts, dnd-kit (для задач — дальше)

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
├── widgets/          # sidebar, header, tables, cards, patient-payments
├── features/         # create/edit/delete/filter + change-*-status (patient, doctor, appointment, payment)
├── entities/         # patient, doctor, appointment, service, payment
└── shared/           # ui, api, config, lib (date), utils
```

Импорты только сверху вниз: `app → pages → widgets → features → entities → shared`.

Общие UI-паттерны вынесены в shared: `EntityCard`, `EntityDetailLayout`, `SearchInput`, `TablePagination`, `SortableTableHead`.

---

## Этапы разработки

- [x] **Этап 1** — Настройка, FSD, layout, sidebar, тема
- [x] **Этап 2** — Пациенты: таблица, CRUD, формы, фильтры, карточка (обзор)
- [x] **Этап 3** — Врачи: таблица, CRUD, поиск, сортировка, карточка
- [x] **Этап 4** — Записи: таблица, календарь, CRUD, статусы, записи в карточках
- [x] **Этап 5** — Платежи пациента (вкладка «Финансы»)
- [ ] **Этап 6** — Dashboard и аналитика (Recharts) ← **текущий**
- [ ] **Этап 7** — Документы пациента; CRUD услуг; страница финансов
- [ ] **Этап 8** — Kanban задачи (dnd-kit)
- [ ] **Этап 9** — Полировка: анимации, адаптив, тесты

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

| Метод    | Эндпоинт            | Описание         |
| -------- | ------------------- | ---------------- |
| `GET`    | `/patients`         | Список пациентов |
| `POST`   | `/patients`         | Создать пациента |
| `PUT`    | `/patients/:id`     | Обновить        |
| `DELETE` | `/patients/:id`     | Удалить         |
| `GET`    | `/doctors`          | Список врачей   |
| `GET`    | `/appointments`     | Список записей  |
| `GET`    | `/services`         | Список услуг    |
| `GET`    | `/payments`         | Список платежей |
| `POST`   | `/payments`         | Создать платёж  |
| `PUT`    | `/payments/:id`     | Обновить платёж |

Аналогично CRUD для остальных коллекций. В `db.json` также есть `tasks` — UI пока не подключён.

Base URL: `http://localhost:3001`

Статусы платежа: `pending` | `partial` | `paid`.

---

## Маршруты

### Работают

```
/                          → редирект на /dashboard
/dashboard                 → заглушка главной
/patients                  → список пациентов
/patients/:id              → карточка пациента (обзор)
/patients/:id/appointments → записи пациента
/patients/:id/payments     → финансы пациента (сводка + CRUD)
/doctors                   → список врачей
/doctors/:id               → карточка врача (профиль + записи)
/appointments              → календарь + таблица записей
/services                  → каталог услуг (read-only)
```

### Есть маршрут, UI ещё не готов

```
/patients/:id/documents    → документы (placeholder)
/finance                   → финансы клиники (меню disabled, заглушка)
/tasks                     → задачи (меню disabled, заглушка)
```

Создание пациента / врача / записи / платежа — через диалоги на страницах списков и вкладок (отдельных `/create` страниц нет).

---

## Планы развития

- Dashboard: статистика и графики (Recharts)
- Документы пациента; CRUD услуг; глобальная страница финансов
- Kanban задач (dnd-kit)
- Авторизация и роли
- Backend (NestJS + PostgreSQL) вместо json-server
