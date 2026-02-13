export const TabEnum = {
  APPLICATIONS: 'applications',
  REPORTS: 'reports',
  REFERENCE: 'reference',
} as const;

export type TabEnumType = (typeof TabEnum)[keyof typeof TabEnum];

export interface TabItem {
  value: TabEnumType;
  label: string;
}

export interface TabContentProps {
  className?: string;
}
