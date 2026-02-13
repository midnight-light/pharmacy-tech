## Быстрый старт

```
npm install
npm run dev       # Запуск dev сервера
npm run build     # Сборка
npm run lint      # Линтинг
```

## Структура проекта

```
src/
├── main.tsx                    # Entry point: React root + ChakraProvider
├── App.tsx                     # Корневой компонент: Grid (Header + MainLayout)
│
├── app/
│   └── styles/                 # Стили
│       └── index.css
│
├── components/
│   └── ui/                     # Переиспользуемые UI-компоненты (обертки Chakra)
│       ├── provider.tsx        # ChakraProvider с кастомной темой
│       ├── color-mode.tsx      # Компоненты dark/light режима
│       ├── field.tsx           # Обертка для полей форм (label, error, helper)
│       ├── toaster.tsx         # Компонент тостов
│       └── tooltip.tsx         # Обертка тултипов
│
├── features/
│   └── applications/           # Единственный feature модуль
│
├── hooks/                      # Общие хуки
│   ├── use-is-mobile.ts        # Определение мобильного брейкпоинта
│   ├── use-debounce.ts         # Debounce-callback с cancel (для будущей фичи поиска)
│   └── use-color-mode.ts       # Управление темой (light/dark)
│
├── layouts/                    # Основные слои
│   └── main-layout.tsx         # Основной layout (Box с ApplicationsPage)
│
├── pages/
│   └── applications-page.tsx   # Страница заявок
├── widgets/                    # Общие композитные компоненты
│   └── header.tsx
│
├── lib/│
└── utils/
    └── cn.ts                   # Утилита clsx для merge классов
```

## Архитектура

### Диаграмма зависимостей компонентов

```
App
├── Header
│   └── useTabStore (Zustand)
│
└── MainLayout (memo)
    └── ApplicationsPage
        └── Tabs.Root
            └── ApplicationsContent (lazy, memo)
                ├── useApplicationModal
                ├── useApplicationsStore
                ├── useIsMobile
                │
                ├── ApplicationTableHeader
                │   ├── APPLICATIONS_STATUS (фильтры)
                │   └── onCreateApplication => modal toggle
                │
                ├── ApplicationsTable (desktop)
                │   ├── PriorityBadge
                │   ├── StatusBadge
                │   ├── CompletedAtBadge
                │   ├── ResolutionTimeBadge
                │   ├── FormattedDate
                │   └── PharmacyCell
                │
                ├── ApplicationCardList (mobile)
                │   └── ApplicationCard
                │       ├── PriorityBadge
                │       └── StatusBadge
                │
                └── CreateApplicationModal
                    └── CreateApplicationForm
                        ├── useCreateApplication
                        ├── PRIORITY_CONFIG_MAP
                        └── PHARMACIES / CATEGORIES (mock collections)
```
