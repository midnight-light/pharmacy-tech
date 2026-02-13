import { z } from 'zod';
import { ApplicationPriority } from '../constants/applications-table-items.constants';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const fileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    'Размер файла не должен превышать 10MB',
  )
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    'Поддерживаются только форматы: JPG, PNG, WEBP, PDF',
  );

export const createApplicationSchema = z.object({
  pharmacyId: z.string().min(1, 'Выберите аптеку'),
  pharmacyLocation: z.string().min(1, 'Выберите аптеку'),
  title: z
    .string()
    .min(5, 'Минимум 5 символов')
    .max(100, 'Максимум 100 символов'),
  category: z.string().min(1, 'Выберите категорию'),
  priority: z.enum([
    ApplicationPriority.CRITICAL,
    ApplicationPriority.HIGH,
    ApplicationPriority.MEDIUM,
    ApplicationPriority.LOW,
  ]),
  description: z.string().optional(),
  files: z.array(fileSchema).max(5, 'Максимум 5 файлов'),
  isWarrantyCase: z.boolean().default(false),
});

export type CreateApplicationFormInput = z.input<
  typeof createApplicationSchema
>;

export type CreateApplicationFormData = z.infer<typeof createApplicationSchema>;
