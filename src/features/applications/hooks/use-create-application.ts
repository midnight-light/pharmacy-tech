import { useState } from 'react';
import {
  ApplicationStatus,
  type ApplicationTableItem,
} from '../constants/applications-table-items.constants';
import type { CreateApplicationFormData } from '../types/application-form.types';
import {
  selectAddApplication,
  useApplicationsStore,
} from '../stores/applications.store';

interface UseCreateApplicationReturn {
  createApplication: (
    data: CreateApplicationFormData,
  ) => Promise<ApplicationTableItem>;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

/**
 * @description Hook for creating a new application
 */
export const useCreateApplication = (): UseCreateApplicationReturn => {
  const addApplication = useApplicationsStore(selectAddApplication);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const createApplication = async (
    data: CreateApplicationFormData,
  ): Promise<ApplicationTableItem> => {
    setIsLoading(true);
    setError(null);

    try {
      const newApplication: ApplicationTableItem = {
        id: crypto.randomUUID(),
        pharmacy: { id: data.pharmacyId, location: data.pharmacyLocation },
        createdAt: new Date().toISOString().slice(0, 19),
        priority: data.priority,
        title: data.title,
        category: data.category,
        techSupport: null,
        resolutionTime: '00:00',
        completedAt: null,
        isApproved: false,
        status: ApplicationStatus.NEW,
      };
      addApplication(newApplication);

      return newApplication;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Произошла ошибка');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setIsLoading(false);
  };

  return {
    createApplication,
    isLoading,
    error,
    reset,
  };
};
