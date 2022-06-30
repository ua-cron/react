import { CronQuartzUIService } from '@sbzen/cron-core';

import { CronTabBaseComponent, CronTabBaseProps } from './../../cron-tab-base.abstract';
import { QuartzCronDI } from './../quartz-di';

export abstract class QuartzTabBaseComponent<P extends CronTabBaseProps> extends CronTabBaseComponent<P, CronQuartzUIService> {
  protected getQuartzCron() {
    return QuartzCronDI.get(this.props.session);
  }
}
