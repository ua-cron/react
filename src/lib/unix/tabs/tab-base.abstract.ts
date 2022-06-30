import { CronUnixUIService } from '@sbzen/cron-core';

import { CronTabBaseComponent, CronTabBaseProps } from './../../cron-tab-base.abstract';
import { UnixCronDI } from './../unix-di';

export abstract class UnixTabBaseComponent<P extends CronTabBaseProps> extends CronTabBaseComponent<P, CronUnixUIService> {
  protected getQuartzCron() {
    return UnixCronDI.get(this.props.session);
  }
}
