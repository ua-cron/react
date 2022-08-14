import React from 'react';
import { Segment, Mode, Type, getList } from '@sbzen/cron-core';

import { SimpleEvery, SimpleAnd, SimpleRange } from './../../../shared';
import { genId, getCssClassPrefix } from './../../../helpers';
import { SimpleIncrement, CronQuartzTabProps } from './../shared';

export type CronTabYearProps = {
  renderYearsFrom?: number,
  renderYearsTo?: number
} & CronQuartzTabProps;

export const QuartzCronYear = (props: CronTabYearProps) => {
  const { service, localization, session, cssClassPrefix, renderYearsFrom, renderYearsTo } = props;
  const { every, increment, and, range } = localization.quartz.year;
  const classPrefix = getCssClassPrefix(cssClassPrefix);
  const api = service.getApi(Type.YEAR);
  const yearCodes = getList(Segment.year, true);
  const years = getList(Segment.year, false, renderYearsFrom, renderYearsTo);

  const genEvery = () => (
    <SimpleEvery
      cssClassPrefix={classPrefix}
      segmentId={genId(Mode.EVERY, session)}
      checked={api.isEverySelected()}
      disabled={service.isDisabled()}
      onSelect={() => api.selectEvery()}
      label={every.label}/>
  );

  const genIncrement = () => (
    <SimpleIncrement
      cssClassPrefix={classPrefix}
      segmentId={genId(Mode.INCREMENT, session)}
      checked={api.isIncrementSelected()}
      disabled={service.isDisabled()}
      disabledControls={api.isIncrementControlsDisabled()}
      onSelect={() => api.selectIncrement()}
      label1={increment.label1}
      label2={increment.label2}
      primaryOptions={yearCodes}
      primaryValue={api.getIncrementPrimaryValue()}
      onPrimaryValueChange={api.setIncrementPrimaryValue}
      secondaryOptions={years}
      secondaryValue={api.getIncrementSecondaryValue()}
      onSecondaryValueChange={api.setIncrementSecondaryValue}/>
  );

  const genAnd = () => (
    <SimpleAnd
      cssClassPrefix={classPrefix}
      segmentId={genId(Mode.AND, session)}
      checked={api.isAndSelected()}
      disabled={service.isDisabled()}
      disabledControls={api.isAndControlsDisabled()}
      onSelect={() => api.selectAnd()}
      label={and.label}
      onValueChange={api.selectAndValue}
      isValueSelected={value => api.isSelectedAndValue(value)}
      options={years}/>
  );

  const genRange = () => (
    <SimpleRange
      cssClassPrefix={classPrefix}
      segmentId={genId(Mode.RANGE, session)}
      checked={api.isRangeSelected()}
      disabled={service.isDisabled()}
      onSelect={() => api.selectRange()}
      disabledControls={api.isRangeControlsDisabled()}
      label1={range.label1}
      label2={range.label2}
      primaryOptions={years}
      primaryValue={api.getRangePrimaryValue()}
      onPrimaryValueChange={api.setRangePrimaryValue}
      secondaryOptions={years}
      secondaryValue={api.getRangeSecondaryValue()}
      onSecondaryValueChange={api.setRangeSecondaryValue}/>
  );

  return (
    <div>
      {genEvery()}
      {genIncrement()}
      {genAnd()}
      {genRange()}
    </div>
  );
}
