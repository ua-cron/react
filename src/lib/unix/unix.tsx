import React from 'react';
import { Type } from '@sbzen/cron-core';

import { CronHostComponent, CronHostProps } from './../cron-host.abstract';
import { UnixCronMinute, UnixCronHour, UnixCronMonth, UnixCronDay } from './tabs';
import { UnixCronDI } from './unix-di';

import './../cron.scss';

export type ReUnixCronProps = CronHostProps;
export class ReUnixCron extends CronHostComponent {
  override componentWillUnmount() {
    UnixCronDI.destroy(this.session);
  }

  override render() {
    return this.renderHost(this.state.tab, 'c-unix')
  }

  protected getTabs() {
    const cronTabs = this.props.tabs ||  [
      Type.MINUTES,
      Type.HOURS,
      Type.DAY,
      Type.MONTH
    ];

    return cronTabs.filter(t => ![
      Type.SECONDS,
      Type.YEAR
    ].includes(t));
  }

  protected genContent() {
    const cronLocalization = this.getLocalization();

    const minute = (
      <UnixCronMinute
        localization={cronLocalization}
        session={this.session}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const hour = (
      <UnixCronHour
        localization={cronLocalization}
        session={this.session}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const month = (
      <UnixCronMonth
        localization={cronLocalization}
        session={this.session}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const day = (
      <UnixCronDay
        localization={cronLocalization}
        session={this.session}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const map = new Map<Type, JSX.Element>([
      [Type.MINUTES, minute],
      [Type.HOURS, hour],
      [Type.MONTH, month],
      [Type.DAY, day]
    ]);
    return map.get(this.state.tab) || null;
  }

  protected getQuartzCron() {
    return UnixCronDI.get(this.session);
  }
}

export default ReUnixCron;
