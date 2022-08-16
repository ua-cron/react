import React from 'react';
import { Segment, Mode, Type, getMonthCodes, getList } from '@sbzen/cron-core';

import { genId, getCssClassPrefix, localizeList } from './../../../helpers';
import { SimpleEvery, SimpleAnd, SimpleRange } from './../../../shared';
import { SimpleIncrement, CronQuartzTabProps } from './../shared';

export const QuartzCronMonth = ({
  service,
  localization,
  session,
  cssClassPrefix
}: CronQuartzTabProps) => {
  const { common, quartz } = localization;
  const { every, increment, and, range } = quartz.month;
  const classPrefix = getCssClassPrefix(cssClassPrefix);
  const api = service.getApi(Type.MONTH);
  const monthCodes = getMonthCodes();
  const monthes = getList(Segment.month);

  const genEvery = () => (
    <SimpleEvery
      cssClassPrefix={classPrefix}
      checked={api.isEverySelected()}
      disabled={service.isDisabled()}
      segmentId={genId(Mode.EVERY, session)}
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
      primaryOptions={monthes.map(({ value }, i) => ({ value, label: i + 1 }))}
      primaryValue={api.getIncrementPrimaryValue()}
      onPrimaryValueChange={api.setIncrementPrimaryValue}
      secondaryOptions={localizeList(monthes, common.month)}
      secondaryValue={api.getIncrementSecondaryValue()}
      onSecondaryValueChange={api.setIncrementSecondaryValue}/>
  );

  const genAnd = () => (
    <SimpleAnd
      cssClassPrefix={classPrefix}
      gridSize={['col-3', 'col-md-2']}
      segmentId={genId(Mode.AND, session)}
      checked={api.isAndSelected()}
      disabled={service.isDisabled()}
      disabledControls={api.isAndControlsDisabled()}
      onSelect={() => api.selectAnd()}
      label={and.label}
      onValueChange={api.selectAndValue}
      isValueSelected={value => api.isSelectedAndValue(value)}
      options={localizeList(monthCodes, common.month)}/>
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
      primaryOptions={localizeList(monthes, common.month)}
      primaryValue={api.getRangePrimaryValue()}
      onPrimaryValueChange={api.setRangePrimaryValue}
      secondaryOptions={localizeList(monthes, common.month)}
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
