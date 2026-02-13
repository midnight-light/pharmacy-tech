import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { TabEnum, type TabEnumType } from './tabs.types';

interface TabState {
  activeTab: TabEnumType;
  previousTab: TabEnumType | null;
}

interface TabActions {
  setActiveTab: (tab: TabEnumType) => void;
  resetTab: () => void;
  goToPreviousTab: () => void;
}

export type TabStore = TabState & TabActions;

const DEFAULT_TAB: TabEnumType = TabEnum.APPLICATIONS;

/**
 * @description store for tab management
 * Features:
 * - Persist tab state in sessionStorage
 * - DevTools integration for debugging
 * - History tracking (previous tab)
 */
export const useTabStore = create<TabStore>()(
  devtools(
    persist(
      (set, get) => ({
        activeTab: DEFAULT_TAB,
        previousTab: null,
        setActiveTab: (tab) =>
          set(
            (state) => ({
              activeTab: tab,
              previousTab: state.activeTab,
            }),
            false,
            'setActiveTab',
          ),
        resetTab: () =>
          set(
            {
              activeTab: DEFAULT_TAB,
              previousTab: null,
            },
            false,
            'resetTab',
          ),
        goToPreviousTab: () => {
          const { previousTab } = get();
          if (previousTab) {
            set(
              {
                activeTab: previousTab,
                previousTab: null,
              },
              false,
              'goToPreviousTab',
            );
          }
        },
      }),
      {
        name: 'tab-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          activeTab: state.activeTab,
        }),
      },
    ),
    {
      name: 'TabStore',

      enabled: import.meta.env.DEV,
    },
  ),
);

export const selectActiveTab = (state: TabStore) => state.activeTab;
export const selectSetActiveTab = (state: TabStore) => state.setActiveTab;
export const selectPreviousTab = (state: TabStore) => state.previousTab;
