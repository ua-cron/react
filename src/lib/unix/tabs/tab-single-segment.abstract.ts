import { CronUnixUIService } from '@sbzen/cron-core';

import { CronTabSingleSegmentComponent } from './../../cron-tab-single-segment.abstract';
import { CronTabBaseProps } from './../../cron-tab-base.abstract';
import { UnixCronDI } from './../unix-di';

export abstract class UnixTabSingleSegmentComponent<K extends CronTabBaseProps = CronTabBaseProps> extends CronTabSingleSegmentComponent<CronUnixUIService, K> {
  protected getQuartzCron() {
    return UnixCronDI.get(this.props.session);
  }
}
