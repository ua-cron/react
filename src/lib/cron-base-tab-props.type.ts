import { CronUnixUIService, CronQuartzUIService } from '@sbzen/cron-core';

import { CronBaseProps } from './cron-base-props.type';
import { localization } from './cron-localization';

export type CronBaseTabProps<T extends CronUnixUIService|CronQuartzUIService> = {
  localization: typeof localization,
  session: string,
  service: T
} & CronBaseProps;
