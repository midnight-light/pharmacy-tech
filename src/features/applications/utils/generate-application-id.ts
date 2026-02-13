const CATEGORY_PREFIX_MAP: Record<string, string> = {
  Кассы: 'КС',
  Холодильники: 'ХЛ',
  Кондиционеры: 'КН',
  'Изм. оборуд.': 'ИЗ',
  Помещения: 'ПО',
  ИТ: 'ИТ',
  Сантехника: 'СА',
};

const generateNumericSuffix = (): string =>
  String(Math.floor(Math.random() * 10000)).padStart(4, '0');

export const generateApplicationId = (category: string): string => {
  const prefix = CATEGORY_PREFIX_MAP[category];
  const suffix = generateNumericSuffix();

  if (!prefix) {
    const fallbackPrefix = category.slice(0, 2).toUpperCase();
    return `${fallbackPrefix}-${suffix}`;
  }

  return `${prefix}-${suffix}`;
};
