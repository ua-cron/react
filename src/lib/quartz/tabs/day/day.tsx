import React from 'react';
import { Segment, Mode, Type, getDaysOfWeekCodes, getList } from '@sbzen/cron-core';

import { genId, getCssClassPrefix, localizeLabel, genClassName } from './../../../helpers';
import { SimpleRange } from './../../../shared';
import { CronQuartzTabProps } from './../shared';

export const QuartzCronDay = ({
  service,
  session,
  localization,
  cssClassPrefix
}: CronQuartzTabProps) => {
  const { common, quartz } = localization;
  const {
    every,
    dayOfWeekIncrement,
    dayOfMonthLastDay,
    dayOfWeekNTHWeekDayOfMonth,
    dayOfMonthNearestWeekDayOfMonth,
    dayOfMonthDaysBeforeEndMonth,
    dayOfWeekLastNTHDayWeek,
    dayOfMonthLastDayWeek,
    dayOfMonthIncrement,
    dayOfWeekAnd,
    dayOfWeekRange,
    dayOfMonthAnd
  } = quartz.day;
  const classPrefix = getCssClassPrefix(cssClassPrefix);
  const api = service.getApi(Type.DAY);
  const daysOfWeekEvery = getList(Segment.dayOfWeek, true);
  const daysOfWeek = getList(Segment.dayOfWeek);
  const daysOfWeekCodes = getDaysOfWeekCodes();
  const daysOfMonthEvery = getList(Segment.dayOfMonth, true);
  const daysOfMonth = getList(Segment.dayOfMonth);
  const limitedDaysOfMonth = daysOfMonthEvery.slice(0, 5);

  const genEvery = () => (
    <div className={genClassName(classPrefix, ['form-group'], ['c-every-weekday', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-every-weekday-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-every-weekday-option'])}
          type="radio"
          id={genId(Mode.EVERY, session, Segment.dayOfWeek)}
          value={Mode.EVERY}
          checked={api.isEverySelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectEvery()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-every-weekday-option-label'])}
          htmlFor={genId(Mode.EVERY, session, Segment.dayOfWeek)}>

          {every.label}
        </label>
      </div>
    </div>
  );

  const genDayOfWeekIncrement = () => (
    <div className={genClassName(classPrefix, ['form-group', 'form-inline'], ['c-increment-weekday', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-increment-weekday-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-increment-weekday-option'])}
          type="radio"
          id={genId(Mode.INCREMENT, session, Segment.dayOfWeek)}
          value={Mode.INCREMENT}
          checked={api.isDayOfWeekIncrementSelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfWeekIncrement()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-increment-weekday-option-label'])}
          htmlFor={genId(Mode.INCREMENT, session, Segment.dayOfWeek)}>

          {dayOfWeekIncrement.label1}
        </label>
      </div>

      <select
        className={genClassName(classPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-every'])}
        disabled={api.isDayOfWeekIncrementControlsDisabled()}
        value={api.getDayOfWeekIncrementPrimary()}
        onChange={(e) => api.setDayOfWeekIncrementPrimary(e.target.value)}>

        {daysOfWeekEvery.map(item => {
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
        htmlFor={genId(Mode.INCREMENT, session, Segment.dayOfWeek)}>
        {dayOfWeekIncrement.label2}
      </label>

      <select
        className={genClassName(classPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-increment-weekday-from'])}
        disabled={api.isDayOfWeekIncrementControlsDisabled()}
        value={api.getDayOfWeekIncrementSecondary()}
        onChange={(e) => api.setDayOfWeekIncrementSecondary(e.target.value)}>

        {daysOfWeek.map(item => {
          return (
            <option
              key={item.value}
              value={item.value}>
              {localizeLabel(item.label, common.dayOfWeek)}
            </option>
          );
        })}
      </select>
    </div>
  );

  const genDayOfMonthIncrement = () => (
    <div className={genClassName(classPrefix, ['form-group', 'form-inline'], ['c-increment-monthday', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-increment-monthday-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-increment-monthday-option'])}
          type="radio"
          id={genId(Mode.INCREMENT, session, Segment.dayOfMonth)}
          value={Mode.INCREMENT}
          checked={api.isDayOfMonthIncrementSelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfMonthIncrement()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-increment-monthday-option-label'])}
          htmlFor={genId(Mode.INCREMENT, session, Segment.dayOfMonth)}>
          {dayOfMonthIncrement.label1}
        </label>
      </div>

      <select
        className={genClassName(classPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-every'])}
        disabled={api.isDayOfMonthIncrementControlsDisabled()}
        value={api.getDayOfMonthIncrementPrimary()}
        onChange={(e) => api.setDayOfMonthIncrementPrimary(e.target.value)}>

        {daysOfMonth.map(item => {
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
        htmlFor={genId(Mode.INCREMENT, session, Segment.dayOfMonth)}>
        {dayOfMonthIncrement.label2}
      </label>

      <select
        className={genClassName(classPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-increment-monthday-from'])}
        disabled={api.isDayOfMonthIncrementControlsDisabled()}
        value={api.getDayOfMonthIncrementSecondary()}
        onChange={(e) => api.setDayOfMonthIncrementSecondary(e.target.value)}>

        {daysOfMonthEvery.map(item => {
          return (
            <option
              key={item.value}
              value={item.value}>
              {localizeLabel(item.label, common.dayOfMonth)}
            </option>
          );
        })}
      </select>

      <label
        className="c-increment-monthday-option-label3"
        htmlFor={genId(Mode.INCREMENT, session, Segment.dayOfMonth)}>
        {dayOfMonthIncrement.label3}
      </label>
    </div>
  );

  const genDayOfWeekAnd = () => (
    <div className={genClassName(classPrefix, ['form-group'], ['c-and-weekday', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-and-weekday-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-and-weekday-option'])}
          type="radio"
          id={genId(Mode.AND, session, Segment.dayOfWeek)}
          value={Mode.INCREMENT}
          checked={api.isDayOfWeekAndSelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfWeekAnd()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-and-weekday-option-label'])}
          htmlFor={genId(Mode.AND, session, Segment.dayOfWeek)}>
          {dayOfWeekAnd.label}
        </label>
      </div>

      <div className={genClassName(classPrefix, ['row', 'pl-3', 'pt-1'], ['c-and-weekday-list'])}>
        {daysOfWeekCodes.map(item => {
          return (
            <div
              className={genClassName(classPrefix, ['col-3 col-md-2'], ['c-and-weekday-item'])}
              item-value={item.value}
              key={item.value}>

              <div className={genClassName(classPrefix, ['form-check'], ['c-and-weekday-item-check'])}>
                <input
                  className={genClassName(classPrefix, ['form-check-input'], ['c-and-weekday-item-field'])}
                  type="checkbox"
                  id={genId(Mode.AND, session, Segment.dayOfWeek + item.value)}
                  value={item.value}
                  disabled={api.isDayOfWeekAndControlsDisabled()}
                  checked={api.isSelectedDayOfWeekAndValue(item.value)}
                  onChange={() => api.selectDayOfWeekAndValue(item.value)} />

                <label
                  className={genClassName(classPrefix, ['form-check-label'], ['c-and-weekday-item-label'])}
                  htmlFor={genId(Mode.AND, session, Segment.dayOfWeek + item.value)}>
                  {localizeLabel(item.label, common.dayOfWeek)}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const getDayOfWeekRange = () => (
    <SimpleRange
      cssClassPrefix={classPrefix}
      segmentId={genId(Mode.RANGE, session)}
      checked={api.isDayOfWeekRangeSelected()}
      disabled={service.isDisabled()}
      onSelect={() => api.selectDayOfWeekRange()}
      disabledControls={api.isDayOfWeekRangeControlsDisabled()}
      label1={dayOfWeekRange.label1}
      label2={dayOfWeekRange.label2}
      primaryOptions={daysOfWeekCodes}
      primaryValue={api.getDayOfWeekRangePrimary()}
      onPrimaryValueChange={api.setDayOfWeekRangePrimary}
      secondaryOptions={daysOfWeekCodes}
      secondaryValue={api.getDayOfWeekRangeSecondary()}
      onSecondaryValueChange={api.setDayOfWeekRangeSecondary}/>
  );

  const genDayOfMonthAnd = () => (
    <div className={genClassName(classPrefix, ['form-group'], ['c-and-monthday', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-and-monthday-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-and-monthday-option'])}
          type="radio"
          id={genId(Mode.AND, session, Segment.dayOfMonth)}
          value={Mode.INCREMENT}
          checked={api.isDayOfMonthAndSelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfMonthAnd()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-and-monthday-option-label'])}
          htmlFor={genId(Mode.AND, session, Segment.dayOfMonth)}>
          {dayOfMonthAnd.label}
        </label>
      </div>

      <div className={genClassName(classPrefix, ['row', 'pl-3', 'pt-1'], ['c-and-monthday-list'])}>
        {daysOfMonth.map(item => {
          return (
            <div
              className={genClassName(classPrefix, ['col-2 col-md-1'], ['c-and-monthday-item'])}
              item-value={item.value}
              key={item.value}>

              <div className={genClassName(classPrefix, ['form-check'], ['c-and-monthday-item-check'])}>
                <input
                  className={genClassName(classPrefix, ['form-check-input'], ['c-and-monthday-item-field'])}
                  type="checkbox"
                  id={genId(Mode.AND, session, Segment.dayOfMonth + item.value)}
                  value={item.value}
                  disabled={api.isDayOfMonthAndControlsDisabled()}
                  checked={api.isSelectedDayOfMonthAndValue(item.value)}
                  onChange={() => api.selectDayOfMonthAndValue(item.value)} />

                <label
                  className={genClassName(classPrefix, ['form-check-label'], ['c-and-monthday-item-label'])}
                  htmlFor={genId(Mode.AND, session, Segment.dayOfMonth + item.value)}>
                  {item.label}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const genDayOfMonthLastDay = () => (
    <div className={genClassName(classPrefix, ['form-group'], ['c-last-monthday', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-last-monthday-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-last-monthday-option'])}
          type="radio"
          id={genId(Mode.LAST_DAY, session, Segment.dayOfMonth)}
          value={Mode.LAST_DAY}
          checked={api.isDayOfMonthLastDaySelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfMonthLastDay()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-last-monthday-option-label'])}
          htmlFor={genId(Mode.LAST_DAY, session, Segment.dayOfMonth)}>
          {dayOfMonthLastDay.label}
        </label>
      </div>
    </div>
  );

  const genDayOfMonthLastDayWeek = () => (
    <div className={genClassName(classPrefix, ['form-group'], ['c-last-weekday', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-last-weekday-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-last-weekday-option'])}
          type="radio"
          id={genId(Mode.LAST_DAY_WEEK, session, Segment.dayOfMonth)}
          value={Mode.LAST_DAY_WEEK}
          checked={api.isDayOfMonthLastDayWeekSelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfMonthLastDayWeek()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-last-weekday-option-label'])}
          htmlFor={genId(Mode.LAST_DAY_WEEK, session, Segment.dayOfMonth)}>
          {dayOfMonthLastDayWeek.label}
        </label>
      </div>
    </div>
  );

  const genDayOfWeekLastNTHDayWeek = () => (
    <div className={genClassName(classPrefix, ['form-group', 'form-inline'], ['c-last-nth', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-last-nth-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-last-nth-option'])}
          type="radio"
          id={genId(Mode.LAST_NTH_DAY_WEEK, session, Segment.dayOfWeek)}
          value={Mode.LAST_NTH_DAY_WEEK}
          checked={api.isDayOfWeekLastNTHDayWeekSelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfWeekLastNTHDayWeek()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-last-nth-option-label'])}
          htmlFor={genId(Mode.LAST_NTH_DAY_WEEK, session, Segment.dayOfWeek)}>

          {dayOfWeekLastNTHDayWeek.label1}
        </label>
      </div>

      <select
        className={genClassName(classPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-last-nth-weekday'])}
        disabled={api.isDayOfWeekLastNTHDayWeekControlsDisabled()}
        value={api.getDayOfWeekLastNTHDayWeekValue()}
        onChange={(e) => api.setDayOfWeekLastNTHDayWeekValue(e.target.value)}>

        {daysOfWeek.map(item => {
          return (
            <option
              value={item.value + 'L'}
              key={item.value + 'L'}>
              {localizeLabel(item.label, common.dayOfWeek)}
            </option>
          );
        })}
      </select>

      <label
        className="c-last-nth-option-label2"
        htmlFor={genId(Mode.LAST_NTH_DAY_WEEK, session, Segment.dayOfWeek)}>
        {dayOfWeekLastNTHDayWeek.label2}
      </label>
    </div>
  );

  const genDayOfMonthDaysBeforeEndMonth = () => (
    <div className={genClassName(classPrefix, ['form-group', 'form-inline'], ['c-day-before-end', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-day-before-end-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-day-before-end-option'])}
          type="radio"
          id={genId(Mode.DAYS_BEFORE_END_MONTH, session, Segment.dayOfMonth)}
          value={Mode.DAYS_BEFORE_END_MONTH}
          checked={api.isDayOfMonthDaysBeforeEndMonthSelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfMonthDaysBeforeEndMonth()} />
      </div>

      <select
        className={genClassName(classPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-day-before-end-monthday'])}
        disabled={api.isDayOfMonthDaysBeforeEndMonthControlsDisabled()}
        value={api.getDayOfMonthDaysBeforeEndMonthValue()}
        onChange={(e) => api.setDayOfMonthDaysBeforeEndMonthValue(e.target.value)}>

        {daysOfMonth.map(item => {
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
        htmlFor={genId(Mode.DAYS_BEFORE_END_MONTH, session, Segment.dayOfMonth)}>
        {dayOfMonthDaysBeforeEndMonth.label}
      </label>
    </div>
  );

  const genDayOfMonthNearestWeekDayOfMonth = () => (
    <div className={genClassName(classPrefix, ['form-group', 'form-inline'], ['c-nearest', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-nearest-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-nearest-option'])}
          type="radio"
          id={genId(Mode.NEAREST_WEEKDAY_OF_MONTH, session, Segment.dayOfMonth)}
          value={Mode.NEAREST_WEEKDAY_OF_MONTH}
          checked={api.isDayOfMonthNearestWeekDayOfMonthSelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfMonthNearestWeekDayOfMonth()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-nearest-option-label'])}
          htmlFor={genId(Mode.NEAREST_WEEKDAY_OF_MONTH, session, Segment.dayOfMonth)}>
          {dayOfMonthNearestWeekDayOfMonth.label1}
        </label>
      </div>

      <select
        className={genClassName(classPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-nearest-monthday'])}
        disabled={api.isDayOfMonthNearestWeekDayOfMonthControlsDisabled()}
        value={api.getDayOfMonthNearestWeekDayOfMonthValue()}
        onChange={(e) => api.setDayOfMonthNearestWeekDayOfMonthValue(e.target.value)}>

        {daysOfMonthEvery.map(item => {
          return (
            <option
              key={item.value + 'W'}
              value={item.value + 'W'}>
              {localizeLabel(item.label, common.dayOfMonth)}
            </option>
          );
        })}
      </select>

      <label
        className="c-nearest-option-label2"
        htmlFor={genId(Mode.NEAREST_WEEKDAY_OF_MONTH, session, Segment.dayOfMonth)}>
        {dayOfMonthNearestWeekDayOfMonth.label2}
      </label>
    </div>
  );

  const genDayOfWeekNTHWeekDayOfMonth = () => (
    <div className={genClassName(classPrefix, ['form-group', 'form-inline'], ['c-nth', 'c-segment'])}>
      <div className={genClassName(classPrefix, ['form-check'], ['c-nth-check'])}>
        <input
          className={genClassName(classPrefix, ['form-check-input'], ['c-nth-option'])}
          type="radio"
          id={genId(Mode.NTH_WEEKDAY_OF_MONTH, session, Segment.dayOfWeek)}
          value={Mode.NTH_WEEKDAY_OF_MONTH}
          checked={api.isDayOfWeekNTHWeekDayOfMonthSelected()}
          disabled={service.isDisabled()}
          onChange={() => api.selectDayOfWeekNTHWeekDayOfMonth()} />

        <label
          className={genClassName(classPrefix, ['form-check-label'], ['c-nth-option-label'])}
          htmlFor={genId(Mode.NTH_WEEKDAY_OF_MONTH, session, Segment.dayOfWeek)}>
          {dayOfWeekNTHWeekDayOfMonth.label1}
        </label>
      </div>

      <select
        className={genClassName(classPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every'])}
        disabled={api.isDayOfWeekNTHWeekDayOfMonthControlsDisabled()}
        value={api.getDayOfWeekNTHWeekDayOfMonthPrimaryValue()}
        onChange={(e) => api.setDayOfWeekNTHWeekDayOfMonthPrimaryValue(e.target.value)}>

        {limitedDaysOfMonth.map(item => {
          return (
            <option
              value={item.value}
              key={item.value}>
              {localizeLabel(item.label, common.dayOfMonth)}
            </option>
          );
        })}
      </select>

      <select
        className={genClassName(classPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-nth-every-weekday'])}
        disabled={api.isDayOfWeekNTHWeekDayOfMonthControlsDisabled()}
        value={api.getDayOfWeekNTHWeekDayOfMonthSecondaryValue()}
        onChange={(e) => api.setDayOfWeekNTHWeekDayOfMonthSecondaryValue(e.target.value)}>

        {daysOfWeek.map(item => {
          return (
            <option
              key={item.value}
              value={item.value}>
              {localizeLabel(item.label, common.dayOfWeek)}
            </option>
          );
        })}
      </select>

      <label
        className="c-nth-option-label2"
        htmlFor={genId(Mode.NTH_WEEKDAY_OF_MONTH, session, Segment.dayOfWeek)}>
        {dayOfWeekNTHWeekDayOfMonth.label2}
      </label>
    </div>
  );

  return (
    <div>
      {genEvery()}
      {genDayOfWeekIncrement()}
      {genDayOfMonthIncrement()}
      {genDayOfWeekAnd()}
      {getDayOfWeekRange()}
      {genDayOfMonthAnd()}
      {genDayOfMonthLastDay()}
      {genDayOfMonthLastDayWeek()}
      {genDayOfWeekLastNTHDayWeek()}
      {genDayOfMonthDaysBeforeEndMonth()}
      {genDayOfMonthNearestWeekDayOfMonth()}
      {genDayOfWeekNTHWeekDayOfMonth()}
    </div>
  );
}
