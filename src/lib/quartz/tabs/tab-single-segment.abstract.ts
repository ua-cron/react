import { CronQuartzUIService } from '@sbzen/cron-core';

import { CronTabSingleSegmentComponent } from './../../cron-tab-single-segment.abstract';
import { CronTabBaseProps } from './../../cron-tab-base.abstract';
import { QuartzCronDI } from './../quartz-di';

export abstract class QuartzTabSingleSegmentComponent<K extends CronTabBaseProps = CronTabBaseProps> extends CronTabSingleSegmentComponent<CronQuartzUIService, K> {
  protected getQuartzCron() {
    return QuartzCronDI.get(this.props.session);
  }
}
