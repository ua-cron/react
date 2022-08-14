import { Type } from '@sbzen/cron-core';

import { CronBaseProps } from './cron-base-props.type';
import { CronLocalization } from './cron-localization';

export type CronHostProps<T extends Type> = {
  localization?: CronLocalization,
  hideTabs?: boolean,
  value?: string,
  activeTab?: T,
  tabs?: T[],
  disabled?: boolean,
  renderYearsFrom?: number,
  renderYearsTo?: number,
  onChange?: (cronValue: string) => void,
  onTabChange?: (tab: T) => void
} & CronBaseProps;
