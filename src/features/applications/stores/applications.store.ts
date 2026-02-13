import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import {
  APPLICATIONS_TABLE_ITEMS,
  type ApplicationTableItem,
} from '../constants/applications-table-items.constants';

interface ApplicationsState {
  applications: ApplicationTableItem[];
}

interface ApplicationsActions {
  addApplication: (application: ApplicationTableItem) => void;
  removeApplication: (id: string) => void;
  updateApplication: (id: string, patch: Partial<ApplicationTableItem>) => void;
  updateStatus: (id: string, status: ApplicationTableItem['status']) => void;
  resetApplications: () => void;
}

export type ApplicationsStore = ApplicationsState & ApplicationsActions;

const INITIAL_APPLICATIONS: ApplicationTableItem[] = APPLICATIONS_TABLE_ITEMS;

/**
 * @description Zustand store for applications management
 * Features:
 * - Persist applications in sessionStorage
 * - DevTools integration for debugging
 * - CRUD operations for ApplicationTableItem[]
 */
export const useApplicationsStore = create<ApplicationsStore>()(
  devtools(
    persist(
      (set) => ({
        applications: INITIAL_APPLICATIONS,

        addApplication: (application) =>
          set(
            (state) => ({
              applications: [application, ...state.applications],
            }),
            false,
            'addApplication',
          ),

        removeApplication: (id) =>
          set(
            (state) => ({
              applications: state.applications.filter((app) => app.id !== id),
            }),
            false,
            'removeApplication',
          ),

        updateApplication: (id, patch) =>
          set(
            (state) => ({
              applications: state.applications.map((app) =>
                app.id === id ? { ...app, ...patch } : app,
              ),
            }),
            false,
            'updateApplication',
          ),

        updateStatus: (id, status) =>
          set(
            (state) => ({
              applications: state.applications.map((app) =>
                app.id === id ? { ...app, status } : app,
              ),
            }),
            false,
            'updateStatus',
          ),

        resetApplications: () =>
          set(
            { applications: INITIAL_APPLICATIONS },
            false,
            'resetApplications',
          ),
      }),
      {
        name: 'applications-storage',
        partialize: (state) => ({
          applications: state.applications,
        }),
      },
    ),
    {
      name: 'ApplicationsStore',
      enabled: import.meta.env.DEV,
    },
  ),
);

export const selectApplications = (state: ApplicationsStore) =>
  state.applications;

export const selectAddApplication = (state: ApplicationsStore) =>
  state.addApplication;
