import { Segment, CronUnixUIService, CronQuartzUIService } from '@sbzen/cron-core';

import { CronBaseComponent } from './cron-base.abstract';
import { CronBaseProps } from './cron-base-props.type';
import { localization } from './cron-localization';

export type CronTabBaseProps = {
  disabled?: boolean,
  onChange: () => void,
  localization: typeof localization,
  session: string
} & CronBaseProps;

export abstract class CronTabBaseComponent<P extends CronTabBaseProps, T extends CronUnixUIService|CronQuartzUIService> extends CronBaseComponent<P> {
  private unListener: (() => void)|null = null;
  private readonly segments: Segment[];

  constructor(props: P, segments: Segment[]) {
    super(props);
    this.segments = segments;
  }

  override componentDidMount() {
    this.unListener = this.getQuartzCron().listen(this.segments, () => {
      this.forceUpdate();
      this.props.onChange();
    });
  }

  override componentWillUnmount() {
    if (this.unListener) {
      this.unListener();
    }
  }

  protected localizeList(list: { value: string, label: string }[], localizationStore: { [key: string]: string }) {
    return list.map(v => ({
      ...v,
      label: this.localizeLabel(v.label, localizationStore)
    }));
  }

  protected localizeLabel(label: string, localizationStore: { [key: string]: string }) {
    return localizationStore[label.toLowerCase()]
  }

  protected abstract getQuartzCron(): T;
}
