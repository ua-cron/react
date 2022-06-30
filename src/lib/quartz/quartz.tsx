import React from 'react';
import { Type } from '@sbzen/cron-core';

import { CronHostComponent, CronHostProps } from './../cron-host.abstract';
import { QuartzCronSecond, QuartzCronMinute, QuartzCronHour, QuartzCronMonth, QuartzCronYear, QuartzCronDay } from './tabs';
import { QuartzCronDI } from './quartz-di';

import './../cron.scss';

export type ReQuartzCronProps = CronHostProps;
export class ReQuartzCron extends CronHostComponent {
  override componentWillUnmount() {
    QuartzCronDI.destroy(this.session);
  }

  override render() {
    return this.renderHost(this.state.tab, 'c-quartz');
  }

  protected getTabs() {
    return this.props.tabs || [
      Type.SECONDS,
      Type.MINUTES,
      Type.HOURS,
      Type.DAY,
      Type.MONTH,
      Type.YEAR
    ];
  }

  protected genContent() {
    const cronLocalization = this.getLocalization();
    const second = (
      <QuartzCronSecond
        localization={cronLocalization}
        session={this.session}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const minute = (
      <QuartzCronMinute
        localization={cronLocalization}
        session={this.session}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const hour = (
      <QuartzCronHour
        localization={cronLocalization}
        session={this.session}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const month = (
      <QuartzCronMonth
        localization={cronLocalization}
        session={this.session}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const year = (
      <QuartzCronYear
        localization={cronLocalization}
        session={this.session}
        renderYearsFrom={this.props.renderYearsFrom}
        renderYearsTo={this.props.renderYearsTo}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const day = (
      <QuartzCronDay
        localization={cronLocalization}
        session={this.session}
        cssClassPrefix={this.props.cssClassPrefix}
        disabled={this.props.disabled}
        onChange={() => this.applyChanges()} />
    );
    const map = new Map<Type, JSX.Element>([
      [Type.SECONDS, second],
      [Type.MINUTES, minute],
      [Type.HOURS, hour],
      [Type.MONTH, month],
      [Type.YEAR, year],
      [Type.DAY, day]
    ]);
    return map.get(this.state.tab) || null;
  }

  protected getQuartzCron() {
    return QuartzCronDI.get(this.session);
  }
}

export default ReQuartzCron;
