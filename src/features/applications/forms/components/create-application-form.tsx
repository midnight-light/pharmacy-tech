import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Stack,
  Textarea,
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValueText,
  createListCollection,
  Portal,
  SelectPositioner,
  Grid,
  GridItem,
  Checkbox,
  FileUpload,
  Icon,
  SelectIndicator,
  Flex,
} from '@chakra-ui/react';
import type { SubmitHandler } from 'react-hook-form';

import { useCreateApplication } from '../../hooks/use-create-application';
import {
  createApplicationSchema,
  type CreateApplicationFormData,
  type CreateApplicationFormInput,
} from '../../types/application-form.types';
import {
  ApplicationPriority,
  type ApplicationPriorityType,
} from '../../constants/applications-table-items.constants';
import { Field } from '@/components/ui/field';
import { LuUpload } from 'react-icons/lu';
import { MdAdd } from 'react-icons/md';
import { LuChevronDown } from 'react-icons/lu';
import {
  PRIORITY_CONFIG_MAP,
  PRIORITY_LIST,
} from '../../utils/helpers/priority-mapper';
import { useIsMobile } from '../../../../hooks/use-is-mobile';

interface CreateApplicationFormProps {
  onSuccess?: (data: CreateApplicationFormData) => void;
  onCancel?: () => void;
}

// Mock data
const PHARMACIES = createListCollection({
  items: [
    { value: '065', label: 'Островского 7' },
    { value: '150', label: 'Кореновск Красная 108' },
    { value: '045', label: 'Тимашевск Интернац 3Б' },
    { value: '164', label: 'РнД Сельмаш 92' },
    { value: '190', label: 'Геленджик Душистая 24' },
    { value: '267', label: 'Анапа Парковая 67к2' },
  ],
});

const CATEGORIES = createListCollection({
  items: [
    { value: 'Кассы', label: 'Кассы' },
    { value: 'Холодильники', label: 'Холодильники' },
    { value: 'Кондиционеры', label: 'Кондиционеры' },
    { value: 'Изм. оборуд.', label: 'Измерительное оборудование' },
    { value: 'Помещения', label: 'Помещения' },
    { value: 'ИТ', label: 'ИТ' },
    { value: 'Сантехника', label: 'Сантехника' },
  ],
});

const PRIORITIES = createListCollection({
  items: [
    { value: ApplicationPriority.CRITICAL, label: 'Критический' },
    { value: ApplicationPriority.HIGH, label: 'Высокий' },
    { value: ApplicationPriority.MEDIUM, label: 'Средний' },
    { value: ApplicationPriority.LOW, label: 'Низкий' },
  ],
});

export const CreateApplicationForm: React.FC<CreateApplicationFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { createApplication, isLoading, error } = useCreateApplication();
  const isMobile = useIsMobile();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm<CreateApplicationFormInput>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      pharmacyId: '',
      pharmacyLocation: '',
      title: '',
      category: '',
      priority: ApplicationPriority.MEDIUM,
      description: '',
      files: [],
      isWarrantyCase: false,
    },
  });

  const selectedPriority = watch('priority');
  const selectedPriorityConfig = selectedPriority
    ? PRIORITY_CONFIG_MAP[selectedPriority]
    : null;

  const onSubmit: SubmitHandler<CreateApplicationFormInput> = async (data) => {
    console.log('data', data);
    try {
      await createApplication({
        pharmacyId: data.pharmacyId,
        pharmacyLocation: data.pharmacyLocation,
        title: data.title,
        category: data.category,
        priority: data.priority,
        description: data.description,
        files: data.files,
        isWarrantyCase: data.isWarrantyCase ?? false,
      });

      reset();
      onSuccess?.(data as CreateApplicationFormData);
    } catch (err) {
      console.error('Failed to create application:', err);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap="6">
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Field
            label="Аптека"
            required
            invalid={!!errors.pharmacyId}
            errorText={errors.pharmacyId?.message}
          >
            <SelectRoot
              collection={PHARMACIES}
              onValueChange={(details) => {
                const selectedItem = details.items[0];

                setValue('pharmacyId', selectedItem.value, {
                  shouldValidate: true,
                });

                setValue('pharmacyLocation', selectedItem.label, {
                  shouldValidate: true,
                });
              }}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Выберите аптеку" />
                <SelectIndicator>
                  <LuChevronDown />
                </SelectIndicator>
              </SelectTrigger>
              <Portal>
                <SelectPositioner>
                  <SelectContent>
                    {PHARMACIES.items.map((pharmacy) => (
                      <SelectItem key={pharmacy.value} item={pharmacy}>
                        {pharmacy.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectPositioner>
              </Portal>
            </SelectRoot>
          </Field>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Field
            label="Категория заявки"
            required
            invalid={!!errors.category}
            errorText={errors.category?.message}
          >
            <SelectRoot
              collection={CATEGORIES}
              onValueChange={(details) => {
                setValue('category', details.value[0], {
                  shouldValidate: true,
                });
              }}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Выберите категорию" />
                <SelectIndicator>
                  <LuChevronDown />
                </SelectIndicator>
              </SelectTrigger>
              <Portal>
                <SelectPositioner>
                  <SelectContent>
                    {CATEGORIES.items.map((category) => (
                      <SelectItem key={category.value} item={category}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectPositioner>
              </Portal>
            </SelectRoot>
          </Field>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Field
            label="Тема"
            required
            invalid={!!errors.title}
            errorText={errors.title?.message}
          >
            <Textarea
              {...register('title')}
              placeholder="Дайте заявке краткое название: например, сломался холодильник или не работает кондиционер"
              height="20"
              resize="none"
              disabled={isLoading}
            />
          </Field>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Field
            label="Приоритет"
            required
            invalid={!!errors.priority}
            errorText={errors.priority?.message}
          >
            <SelectRoot
              collection={PRIORITIES}
              defaultValue={[ApplicationPriority.MEDIUM]}
              onValueChange={(details) => {
                setValue(
                  'priority',
                  details.value[0] as ApplicationPriorityType,
                  {
                    shouldValidate: true,
                  },
                );
              }}
              disabled={isLoading}
            >
              <SelectTrigger>
                <Flex alignItems="center" gap="2" flex="1">
                  {selectedPriorityConfig && (
                    <Icon
                      as={selectedPriorityConfig.icon}
                      color={selectedPriorityConfig.color}
                      boxSize={5}
                      {...selectedPriorityConfig.iconProps}
                    />
                  )}
                  <SelectValueText placeholder="Выберите приоритет" />
                </Flex>
                <SelectIndicator>
                  <LuChevronDown />
                </SelectIndicator>
              </SelectTrigger>
              <Portal>
                <SelectPositioner>
                  <SelectContent>
                    {PRIORITY_LIST.map((config) => (
                      <SelectItem
                        key={config.value}
                        item={{ value: config.value, label: config.label }}
                      >
                        <Flex alignItems="center" gap="2">
                          <Icon
                            as={config.icon}
                            color={config.color}
                            boxSize={5}
                            {...config.iconProps}
                          />
                          {config.label}
                        </Flex>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectPositioner>
              </Portal>
            </SelectRoot>
          </Field>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 1 }}>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Гарантийный случай</Checkbox.Label>
          </Checkbox.Root>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <Field
            label="Описание"
            invalid={!!errors.description}
            errorText={errors.description?.message}
          >
            <Textarea
              {...register('description')}
              placeholder="Кратко опишите проблему:

• что случилось?
• дата и время произошедшего?
• сколько длится проблема?
• насколько она влияет на вашу работу?"
              rows={9}
              resize="none"
              disabled={isLoading}
            />
          </Field>
        </GridItem>
        <GridItem
          colSpan={{ base: 1, md: 2 }}
          colStart={{ base: undefined, md: 3 }}
        >
          <Field
            label={isMobile ? '' : 'Файлы'}
            invalid={!!errors.files}
            errorText={errors.files?.message}
          >
            <FileUpload.Root maxW="md" maxHeight="8rem" alignItems="stretch">
              <FileUpload.HiddenInput />
              {/* Mobile: кнопка */}
              <FileUpload.Trigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  display={{ base: 'flex', md: 'none' }}
                >
                  <Icon size="sm">
                    <MdAdd />
                  </Icon>
                  Прикрепить файлы
                </Button>
              </FileUpload.Trigger>

              {/* Desktop: dropzone */}
              <FileUpload.Dropzone
                display={{ base: 'none', md: 'flex' }}
                h="8rem"
                minH="8rem"
              >
                <FileUpload.DropzoneContent>
                  <Box>Выберите или перетащите фото или файл</Box>
                </FileUpload.DropzoneContent>
                <Icon size="md" color="fg.muted">
                  <LuUpload />
                </Icon>
              </FileUpload.Dropzone>
              <FileUpload.List clearable />
            </FileUpload.Root>
          </Field>
        </GridItem>
        <GridItem colSpan={{ base: 1, md: 4 }}>
          <Stack gap={4}>
            {error && (
              <Box color="red.500" fontSize="sm">
                {error.message}
              </Box>
            )}

            <Stack direction="row" gap={3} justify="flex-start">
              <Button
                type="submit"
                width={{ base: '100%', md: 'auto' }}
                colorScheme="blue"
                loading={isLoading}
                disabled={!isDirty}
              >
                Создать заявку
              </Button>
              {onCancel && (
                <Button
                  display={{ base: 'none', md: 'flex' }}
                  variant="outline"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Отмена
                </Button>
              )}
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

CreateApplicationForm.displayName = 'CreateApplicationForm';
