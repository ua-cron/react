import React from 'react';
import { Segment, getList, Mode, Type } from '@sbzen/cron-core';

import { SimpleEvery, SimpleAnd, SimpleRange } from './../../../shared';
import { genId, getCssClassPrefix } from './../../../helpers';
import { SimpleIncrement, CronUnixTabProps } from './../shared';

export const UnixCronHour = ({
  service,
  session,
  localization,
  cssClassPrefix
}: CronUnixTabProps) => {
  const { every, increment, and, range } = localization.unix.hour;
  const classPrefix = getCssClassPrefix(cssClassPrefix);
  const api = service.getApi<Type.HOURS>(Type.HOURS);
  const hourCodes = getList(Segment.hours, true);
  const hoursList = getList(Segment.hours);

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
      primaryOptions={hourCodes}
      primaryValue={api.getIncrementPrimaryValue()}
      onPrimaryValueChange={api.setIncrementPrimaryValue}/>
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
      options={hoursList}/>
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
      primaryOptions={hoursList}
      primaryValue={api.getRangePrimaryValue()}
      onPrimaryValueChange={api.setRangePrimaryValue}
      secondaryOptions={hoursList}
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
};
