import React from 'react';
import { Segment, getList, getDaysOfWeekCodes, Type, Mode } from '@sbzen/cron-core';

import { genId, getCssClassPrefix, localizeLabel, genClassName } from './../../../helpers';
import { CronUnixTabProps } from './../shared';

export const UnixCronDay = ({
  service,
  session,
  localization,
  cssClassPrefix
}: CronUnixTabProps) => {
  const { common, unix } = localization;
  const {
    every,
    dayOfWeekAnd,
    dayOfMonthAnd,
    dayOfWeekIncrement,
    dayOfMonthIncrement
  } = unix.day;
  const classPrefix = getCssClassPrefix(cssClassPrefix);
  const api = service.getApi<Type.DAY>(Type.DAY);
  const daysOfWeekEvery = getList(Segment.dayOfWeek, true);
  const daysOfWeekCodes = getDaysOfWeekCodes();
  const daysOfMonth = getList(Segment.dayOfMonth);

  const genEvery = () => (
    <div className={genClassName(cssClassPrefix, ['form-group'], ['c-every-weekday', 'c-segment'])}>
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
              className={genClassName(classPrefix, ['col-3', 'col-md-2'], ['c-and-weekday-item'])}
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
              className={genClassName(classPrefix, ['col-2', 'col-md-1'], ['c-and-monthday-item'])}
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

  return (
    <div>
      {genEvery()}
      {genDayOfWeekIncrement()}
      {genDayOfMonthIncrement()}
      {genDayOfWeekAnd()}
      {genDayOfMonthAnd()}
    </div>
  );
};
