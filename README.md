# Dental CRM

> Веб-приложение для управления стоматологической клиникой — пациенты, врачи, расписание, услуги, финансы и внутренние задачи.

---

## Статус модулей

| Модуль        | Статус           | Что есть |
| ------------- | ---------------- | -------- |
| **Пациенты**  | ✅ готово        | Таблица, CRUD, поиск, фильтр, сортировка, пагинация, карточка профиля |
| **Врачи**     | ✅ готово        | Таблица, CRUD, поиск, сортировка, пагинация, карточка |
| **Записи**    | ✅ почти готово  | Таблица, CRUD, смена статуса, сортировка, пагинация; список записей в карточке пациента; вкладка «Календарь» — заглушка |
| **Dashboard** | ⏳ заглушка      | Layout и приветствие |
| **Услуги**    | 📋 в плане       | Пункт меню отключён; entity + `useServices` уже используются в форме записи |
| **Финансы**   | 📋 в плане       | Пункт меню отключён |
| **Задачи**    | 📋 в плане       | Пункт меню отключён |

---

## Стек технологий

**Core**: Next.js 16, React 19, TypeScript

**Стилизация**: Tailwind CSS 4, shadcn/ui

**Состояние и данные**: TanStack Query, Zustand, Axios

**Формы и UI**: React Hook Form, Zod, TanStack Table, date-fns, next-themes

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
├── widgets/          # sidebar, header, patient/doctor/appointment tables & cards
├── features/         # create/edit/delete/filter для patient, doctor, appointment
├── entities/         # patient, doctor, appointment, service
└── shared/           # ui, api, config, utils
```

Импорты только сверху вниз: `app → pages → widgets → features → entities → shared`.

Общие UI-паттерны вынесены в shared: `EntityCard`, `EntityDetailLayout`, `SearchInput`, `TablePagination`, `SortableTableHead`.

---

## Этапы разработки

- [x] **Этап 1** — Настройка, FSD, layout, sidebar, тема
- [x] **Этап 2** — Пациенты: таблица, CRUD, формы, фильтры, карточка профиля
- [x] **Этап 3** — Врачи: таблица, CRUD, поиск, сортировка, карточка
- [x] **Этап 4** — Записи: таблица, CRUD, статусы, записи в карточке пациента
- [ ] **Этап 5** — Календарь записей ← **текущий**
- [ ] **Этап 6** — Dashboard и аналитика (Recharts)
- [ ] **Этап 7** — Услуги и финансы
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

Аналогично CRUD для остальных коллекций. В `db.json` также есть `payments` и `tasks` — UI пока не подключён.

Base URL: `http://localhost:3001`

---

## Маршруты

### Работают

```
/                          → редирект на /dashboard
/dashboard                 → заглушка главной
/patients                  → список пациентов
/patients/:id              → карточка пациента (+ список записей)
/doctors                   → список врачей
/doctors/:id               → карточка врача (профиль + записи)
/appointments              → таблица записей (+ вкладка календаря-заглушка)
```

### В меню, но пока недоступны

```
/services                  → услуги (disabled)
/finance                   → финансы (disabled)
/tasks                     → задачи (disabled)
```

Создание пациента / врача / записи — через диалоги на страницах списков (отдельных `/create` страниц нет).

---

## Планы развития

- Календарь записей и фильтры по статусу / врачу / дате
- Dashboard: статистика и графики (Recharts)
- CRUD услуг, платежи в карточке пациента
- Kanban задач (dnd-kit)
- Авторизация и роли
- Backend (NestJS + PostgreSQL) вместо json-server
