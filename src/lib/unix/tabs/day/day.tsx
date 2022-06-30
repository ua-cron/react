import React from 'react';
import { Segment, getList, getDaysOfWeekCodes, Type, Mode } from '@sbzen/cron-core';

import { CronTabBaseProps } from './../../../cron-tab-base.abstract';
import { genClassName } from './../../../helpers';
import { UnixTabBaseComponent } from './../tab-base.abstract';

export class UnixCronDay extends UnixTabBaseComponent<CronTabBaseProps> {
  private readonly uiService = this.getQuartzCron();
  private readonly uiServiceApi = this.uiService.getApi<Type.DAY>(Type.DAY);
  private readonly daysOfWeekEvery = getList(Segment.dayOfWeek, true);
  private readonly daysOfWeekCodes = getDaysOfWeekCodes();
  private readonly daysOfMonth = getList(Segment.dayOfMonth);

  constructor(props: CronTabBaseProps) {
    super(props, [Segment.dayOfMonth, Segment.dayOfWeek]);
  }

  override render() {
    return (
      <div>
        {this.genEvery()}
        {this.genDayOfWeekIncrement()}
        {this.genDayOfMonthIncrement()}
        {this.genDayOfWeekAnd()}
        {this.genDayOfMonthAnd()}
      </div>
    );
  }

  private genEvery() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group'], ['c-every-weekday', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-every-weekday-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-every-weekday-option'])}
            type="radio"
            id={this.genId(Mode.EVERY, Segment.dayOfWeek)}
            value={Mode.EVERY}
            checked={this.uiServiceApi.isEverySelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectEvery()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-every-weekday-option-label'])}
            htmlFor={this.genId(Mode.EVERY, Segment.dayOfWeek)}>

            {this.props.localization.unix.day.every.label}
          </label>
        </div>
      </div>
    );
  }

  private genDayOfWeekIncrement() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group', 'form-inline'], ['c-increment-weekday', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-increment-weekday-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-increment-weekday-option'])}
            type="radio"
            id={this.genId(Mode.INCREMENT, Segment.dayOfWeek)}
            value={Mode.INCREMENT}
            checked={this.uiServiceApi.isDayOfWeekIncrementSelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfWeekIncrement()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-increment-weekday-option-label'])}
            htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfWeek)}>

            {this.props.localization.unix.day.dayOfWeekIncrement.label1}
          </label>
        </div>

        <select
          className={genClassName(this.props.cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-every'])}
          disabled={this.uiServiceApi.isDayOfWeekIncrementControlsDisabled()}
          value={this.uiServiceApi.getDayOfWeekIncrementPrimary()}
          onChange={(e) => this.uiServiceApi.setDayOfWeekIncrementPrimary(e.target.value)}>

          {this.daysOfWeekEvery.map(item => {
            return (
              <option
                value={item.value}
                key={item.value}>
                {item.value}
              </option>
            );
          })}
        </select>

        <label
          className="c-increment-weekday-option-label2"
          htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfWeek)}>
          {this.props.localization.unix.day.dayOfWeekIncrement.label2}
        </label>
      </div>
    );
  }

  private genDayOfMonthIncrement() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group', 'form-inline'], ['c-increment-monthday', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-increment-monthday-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-increment-monthday-option'])}
            type="radio"
            id={this.genId(Mode.INCREMENT, Segment.dayOfMonth)}
            value={Mode.INCREMENT}
            checked={this.uiServiceApi.isDayOfMonthIncrementSelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfMonthIncrement()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-increment-monthday-option-label'])}
            htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfMonth)}>
            {this.props.localization.unix.day.dayOfMonthIncrement.label1}
          </label>
        </div>

        <select
          className={genClassName(this.props.cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-every'])}
          disabled={this.uiServiceApi.isDayOfMonthIncrementControlsDisabled()}
          value={this.uiServiceApi.getDayOfMonthIncrementPrimary()}
          onChange={(e) => this.uiServiceApi.setDayOfMonthIncrementPrimary(e.target.value)}>

          {this.daysOfMonth.map(item => {
            return (
              <option
                key={item.value}
                value={item.value}>
                {item.value}
              </option>
            );
          })}
        </select>

        <label
          className="c-increment-monthday-option-label2"
          htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfMonth)}>
          {this.props.localization.unix.day.dayOfMonthIncrement.label2}
        </label>
      </div>
    );
  }

  private genDayOfWeekAnd() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group'], ['c-and-weekday', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-and-weekday-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-and-weekday-option'])}
            type="radio"
            id={this.genId(Mode.AND, Segment.dayOfWeek)}
            value={Mode.INCREMENT}
            checked={this.uiServiceApi.isDayOfWeekAndSelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfWeekAnd()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-and-weekday-option-label'])}
            htmlFor={this.genId(Mode.AND, Segment.dayOfWeek)}>
            {this.props.localization.unix.day.dayOfWeekAnd.label}
          </label>
        </div>

        <div className={genClassName(this.props.cssClassPrefix, ['row', 'pl-3', 'pt-1'], ['c-and-weekday-list'])}>
          {this.daysOfWeekCodes.map(item => {
            return (
              <div
                className={genClassName(this.props.cssClassPrefix, ['col-2'], ['c-and-weekday-item'])}
                item-value={item.value}
                key={item.value}>

                <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-and-weekday-item-check'])}>
                  <input
                    className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-and-weekday-item-field'])}
                    type="checkbox"
                    id={this.genId(Mode.AND, Segment.dayOfWeek + item.value)}
                    value={item.value}
                    disabled={this.uiServiceApi.isDayOfWeekAndControlsDisabled()}
                    checked={this.uiServiceApi.isSelectedDayOfWeekAndValue(item.value)}
                    onChange={() => this.uiServiceApi.selectDayOfWeekAndValue(item.value)} />

                  <label
                    className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-and-weekday-item-label'])}
                    htmlFor={this.genId(Mode.AND, Segment.dayOfWeek + item.value)}>
                    {this.localizeLabel(item.label, this.props.localization.common.dayOfWeek)}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  private genDayOfMonthAnd() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group'], ['c-and-monthday', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-and-monthday-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-and-monthday-option'])}
            type="radio"
            id={this.genId(Mode.AND, Segment.dayOfMonth)}
            value={Mode.INCREMENT}
            checked={this.uiServiceApi.isDayOfMonthAndSelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfMonthAnd()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-and-monthday-option-label'])}
            htmlFor={this.genId(Mode.AND, Segment.dayOfMonth)}>
            {this.props.localization.unix.day.dayOfMonthAnd.label}
          </label>
        </div>

        <div className={genClassName(this.props.cssClassPrefix, ['row', 'pl-3', 'pt-1'], ['c-and-monthday-list'])}>
          {this.daysOfMonth.map(item => {
            return (
              <div
                className={genClassName(this.props.cssClassPrefix, ['col-1'], ['c-and-monthday-item'])}
                item-value={item.value}
                key={item.value}>

                <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-and-monthday-item-check'])}>
                  <input
                    className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-and-monthday-item-field'])}
                    type="checkbox"
                    id={this.genId(Mode.AND, Segment.dayOfMonth + item.value)}
                    value={item.value}
                    disabled={this.uiServiceApi.isDayOfMonthAndControlsDisabled()}
                    checked={this.uiServiceApi.isSelectedDayOfMonthAndValue(item.value)}
                    onChange={() => this.uiServiceApi.selectDayOfMonthAndValue(item.value)} />

                  <label
                    className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-and-monthday-item-label'])}
                    htmlFor={this.genId(Mode.AND, Segment.dayOfMonth + item.value)}>
                    {item.label}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
