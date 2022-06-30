import React from 'react';
import { Segment, Mode, Type, getDaysOfWeekCodes, getList } from '@sbzen/cron-core';

import { SimpleRange } from './../../../shared';
import { CronTabBaseProps } from './../../../cron-tab-base.abstract';
import { genClassName } from './../../../helpers';
import { QuartzTabBaseComponent } from './../tab-base.abstract';

export class QuartzCronDay extends QuartzTabBaseComponent<CronTabBaseProps> {
  private readonly uiService = this.getQuartzCron();
  private readonly uiServiceApi = this.uiService.getApi<Type.DAY>(Type.DAY);
  private readonly daysOfWeekEvery = getList(Segment.dayOfWeek, true);
  private readonly daysOfWeek = getList(Segment.dayOfWeek);
  private readonly daysOfWeekCodes = getDaysOfWeekCodes();
  private readonly daysOfMonthEvery = getList(Segment.dayOfMonth, true);
  private readonly daysOfMonth = getList(Segment.dayOfMonth);
  private readonly limitedDaysOfMonth = this.daysOfMonthEvery.slice(0, 5);

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
        {this.getDayOfWeekRange()}
        {this.genDayOfMonthAnd()}
        {this.genDayOfMonthLastDay()}
        {this.genDayOfMonthLastDayWeek()}
        {this.genDayOfWeekLastNTHDayWeek()}
        {this.genDayOfMonthDaysBeforeEndMonth()}
        {this.genDayOfMonthNearestWeekDayOfMonth()}
        {this.genDayOfWeekNTHWeekDayOfMonth()}
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

            {this.props.localization.quartz.day.every.label}
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

            {this.props.localization.quartz.day.dayOfWeekIncrement.label1}
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
          {this.props.localization.quartz.day.dayOfWeekIncrement.label2}
        </label>

        <select
          className={genClassName(this.props.cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-from'])}
          disabled={this.uiServiceApi.isDayOfWeekIncrementControlsDisabled()}
          value={this.uiServiceApi.getDayOfWeekIncrementSecondary()}
          onChange={(e) => this.uiServiceApi.setDayOfWeekIncrementSecondary(e.target.value)}>

          {this.daysOfWeek.map(item => {
            return (
              <option
                key={item.value}
                value={item.value}>
                {this.localizeLabel(item.label, this.props.localization.common.dayOfWeek)}
              </option>
            );
          })}
        </select>
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
            {this.props.localization.quartz.day.dayOfMonthIncrement.label1}
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
          {this.props.localization.quartz.day.dayOfMonthIncrement.label2}
        </label>

        <select
          className={genClassName(this.props.cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-from'])}
          disabled={this.uiServiceApi.isDayOfMonthIncrementControlsDisabled()}
          value={this.uiServiceApi.getDayOfMonthIncrementSecondary()}
          onChange={(e) => this.uiServiceApi.setDayOfMonthIncrementSecondary(e.target.value)}>

          {this.daysOfMonthEvery.map(item => {
            return (
              <option
                key={item.value}
                value={item.value}>
                {this.localizeLabel(item.label, this.props.localization.common.dayOfMonth)}
              </option>
            );
          })}
        </select>

        <label
          className="c-increment-monthday-option-label3"
          htmlFor={this.genId(Mode.INCREMENT, Segment.dayOfMonth)}>
          {this.props.localization.quartz.day.dayOfMonthIncrement.label3}
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
            {this.props.localization.quartz.day.dayOfWeekAnd.label}
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

  private getDayOfWeekRange() {
    return (
      <SimpleRange
        cssClassPrefix={this.getCssClassPrefix()}
        segmentId={this.genId(Mode.RANGE)}
        checked={this.uiServiceApi.isDayOfWeekRangeSelected()}
        disabled={this.uiService.isDisabled()}
        onSelect={() => this.uiServiceApi.selectDayOfWeekRange()}
        disabledControls={this.uiServiceApi.isDayOfWeekRangeControlsDisabled()}
        label1={this.props.localization.quartz.day.dayOfWeekRange.label1}
        label2={this.props.localization.quartz.day.dayOfWeekRange.label2}
        primaryOptions={this.daysOfWeekCodes}
        primaryValue={this.uiServiceApi.getDayOfWeekRangePrimary()}
        onPrimaryValueChange={this.uiServiceApi.setDayOfWeekRangePrimary}
        secondaryOptions={this.daysOfWeekCodes}
        secondaryValue={this.uiServiceApi.getDayOfWeekRangeSecondary()}
        onSecondaryValueChange={this.uiServiceApi.setDayOfWeekRangeSecondary}/>
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
            {this.props.localization.quartz.day.dayOfMonthAnd.label}
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

  private genDayOfMonthLastDay() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group'], ['c-last-monthday', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-last-monthday-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-last-monthday-option'])}
            type="radio"
            id={this.genId(Mode.LAST_DAY, Segment.dayOfMonth)}
            value={Mode.LAST_DAY}
            checked={this.uiServiceApi.isDayOfMonthLastDaySelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfMonthLastDay()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-last-monthday-option-label'])}
            htmlFor={this.genId(Mode.LAST_DAY, Segment.dayOfMonth)}>
            {this.props.localization.quartz.day.dayOfMonthLastDay.label}
          </label>
        </div>
      </div>
    );
  }

  private genDayOfMonthLastDayWeek() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group'], ['c-last-weekday', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-last-weekday-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-last-weekday-option'])}
            type="radio"
            id={this.genId(Mode.LAST_DAY_WEEK, Segment.dayOfMonth)}
            value={Mode.LAST_DAY_WEEK}
            checked={this.uiServiceApi.isDayOfMonthLastDayWeekSelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfMonthLastDayWeek()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-last-weekday-option-label'])}
            htmlFor={this.genId(Mode.LAST_DAY_WEEK, Segment.dayOfMonth)}>
            {this.props.localization.quartz.day.dayOfMonthLastDayWeek.label}
          </label>
        </div>
      </div>
    );
  }

  private genDayOfWeekLastNTHDayWeek() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group', 'form-inline'], ['c-last-nth', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-last-nth-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-last-nth-option'])}
            type="radio"
            id={this.genId(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)}
            value={Mode.LAST_NTH_DAY_WEEK}
            checked={this.uiServiceApi.isDayOfWeekLastNTHDayWeekSelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfWeekLastNTHDayWeek()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-last-nth-option-label'])}
            htmlFor={this.genId(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)}>

            {this.props.localization.quartz.day.dayOfWeekLastNTHDayWeek.label1}
          </label>
        </div>

        <select
          className={genClassName(this.props.cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-last-nth-weekday'])}
          disabled={this.uiServiceApi.isDayOfWeekLastNTHDayWeekControlsDisabled()}
          value={this.uiServiceApi.getDayOfWeekLastNTHDayWeekValue()}
          onChange={(e) => this.uiServiceApi.setDayOfWeekLastNTHDayWeekValue(e.target.value)}>

          {this.daysOfWeek.map(item => {
            return (
              <option
                value={item.value + 'L'}
                key={item.value + 'L'}>
                {this.localizeLabel(item.label, this.props.localization.common.dayOfWeek)}
              </option>
            );
          })}
        </select>

        <label
          className="c-last-nth-option-label2"
          htmlFor={this.genId(Mode.LAST_NTH_DAY_WEEK, Segment.dayOfWeek)}>
          {this.props.localization.quartz.day.dayOfWeekLastNTHDayWeek.label2}
        </label>
      </div>
    );
  }

  private genDayOfMonthDaysBeforeEndMonth() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group', 'form-inline'], ['c-day-before-end', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-day-before-end-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-day-before-end-option'])}
            type="radio"
            id={this.genId(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth)}
            value={Mode.DAYS_BEFORE_END_MONTH}
            checked={this.uiServiceApi.isDayOfMonthDaysBeforeEndMonthSelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfMonthDaysBeforeEndMonth()} />
        </div>

        <select
          className={genClassName(this.props.cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-day-before-end-monthday'])}
          disabled={this.uiServiceApi.isDayOfMonthDaysBeforeEndMonthControlsDisabled()}
          value={this.uiServiceApi.getDayOfMonthDaysBeforeEndMonthValue()}
          onChange={(e) => this.uiServiceApi.setDayOfMonthDaysBeforeEndMonthValue(e.target.value)}>

          {this.daysOfMonth.map(item => {
            return (
              <option
                value={'L-' + item.value}
                key={'L-' + item.value}>
                {item.label}
              </option>
            );
          })}
        </select>

        <label
          className="c-day-before-end-option-label"
          htmlFor={this.genId(Mode.DAYS_BEFORE_END_MONTH, Segment.dayOfMonth)}>
          {this.props.localization.quartz.day.dayOfMonthDaysBeforeEndMonth.label}
        </label>
      </div>
    );
  }

  private genDayOfMonthNearestWeekDayOfMonth() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group', 'form-inline'], ['c-nearest', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-nearest-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-nearest-option'])}
            type="radio"
            id={this.genId(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)}
            value={Mode.NEAREST_WEEKDAY_OF_MONTH}
            checked={this.uiServiceApi.isDayOfMonthNearestWeekDayOfMonthSelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfMonthNearestWeekDayOfMonth()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-nearest-option-label'])}
            htmlFor={this.genId(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)}>
            {this.props.localization.quartz.day.dayOfMonthNearestWeekDayOfMonth.label1}
          </label>
        </div>

        <select
          className={genClassName(this.props.cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-nearest-monthday'])}
          disabled={this.uiServiceApi.isDayOfMonthNearestWeekDayOfMonthControlsDisabled()}
          value={this.uiServiceApi.getDayOfMonthNearestWeekDayOfMonthValue()}
          onChange={(e) => this.uiServiceApi.setDayOfMonthNearestWeekDayOfMonthValue(e.target.value)}>

          {this.daysOfMonthEvery.map(item => {
            return (
              <option
                key={item.value + 'W'}
                value={item.value + 'W'}>
                {this.localizeLabel(item.label, this.props.localization.common.dayOfMonth)}
              </option>
            );
          })}
        </select>

        <label
          className="c-nearest-option-label2"
          htmlFor={this.genId(Mode.NEAREST_WEEKDAY_OF_MONTH, Segment.dayOfMonth)}>
          {this.props.localization.quartz.day.dayOfMonthNearestWeekDayOfMonth.label2}
        </label>
      </div>
    );
  }

  private genDayOfWeekNTHWeekDayOfMonth() {
    return (
      <div className={genClassName(this.props.cssClassPrefix, ['form-group', 'form-inline'], ['c-nth', 'c-segment'])}>
        <div className={genClassName(this.props.cssClassPrefix, ['form-check'], ['c-nth-check'])}>
          <input
            className={genClassName(this.props.cssClassPrefix, ['form-check-input'], ['c-nth-option'])}
            type="radio"
            id={this.genId(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)}
            value={Mode.NTH_WEEKDAY_OF_MONTH}
            checked={this.uiServiceApi.isDayOfWeekNTHWeekDayOfMonthSelected()}
            disabled={this.uiService.isDisabled()}
            onChange={() => this.uiServiceApi.selectDayOfWeekNTHWeekDayOfMonth()} />

          <label
            className={genClassName(this.props.cssClassPrefix, ['form-check-label'], ['c-nth-option-label'])}
            htmlFor={this.genId(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)}>
            {this.props.localization.quartz.day.dayOfWeekNTHWeekDayOfMonth.label1}
          </label>
        </div>

        <select
          className={genClassName(this.props.cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every'])}
          disabled={this.uiServiceApi.isDayOfWeekNTHWeekDayOfMonthControlsDisabled()}
          value={this.uiServiceApi.getDayOfWeekNTHWeekDayOfMonthPrimaryValue()}
          onChange={(e) => this.uiServiceApi.setDayOfWeekNTHWeekDayOfMonthPrimaryValue(e.target.value)}>

          {this.limitedDaysOfMonth.map(item => {
            return (
              <option
                value={item.value}
                key={item.value}>
                {this.localizeLabel(item.label, this.props.localization.common.dayOfMonth)}
              </option>
            );
          })}
        </select>

        <select
          className={genClassName(this.props.cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every-weekday'])}
          disabled={this.uiServiceApi.isDayOfWeekNTHWeekDayOfMonthControlsDisabled()}
          value={this.uiServiceApi.getDayOfWeekNTHWeekDayOfMonthSecondaryValue()}
          onChange={(e) => this.uiServiceApi.setDayOfWeekNTHWeekDayOfMonthSecondaryValue(e.target.value)}>

          {this.daysOfWeek.map(item => {
            return (
              <option
                key={item.value}
                value={item.value}>
                {this.localizeLabel(item.label, this.props.localization.common.dayOfWeek)}
              </option>
            );
          })}
        </select>

        <label
          className="c-nth-option-label2"
          htmlFor={this.genId(Mode.NTH_WEEKDAY_OF_MONTH, Segment.dayOfWeek)}>
          {this.props.localization.quartz.day.dayOfWeekNTHWeekDayOfMonth.label2}
        </label>
      </div>
    );
  }
}
