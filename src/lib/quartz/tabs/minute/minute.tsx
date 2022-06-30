import React from 'react';
import { Segment, Mode, Type, getList } from '@sbzen/cron-core';

import { SimpleEvery, SimpleAnd, SimpleRange } from './../../../shared';
import { CronTabBaseProps } from './../../../cron-tab-base.abstract';
import { QuartzTabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { SimpleIncrement } from './../shared';

export class QuartzCronMinute extends QuartzTabSingleSegmentComponent {
  private readonly uiService = this.getQuartzCron();
  private readonly uiServiceApi = this.uiService.getApi<Type.MINUTES>(Type.MINUTES);
  private readonly minuteCodes = getList(Segment.minutes, true);
  private readonly minutesList = getList(Segment.minutes);

  constructor(props: CronTabBaseProps) {
    super(props, [Segment.minutes]);
  }

  protected genEvery() {
    return (
      <SimpleEvery
        cssClassPrefix={this.getCssClassPrefix()}
        checked={this.uiServiceApi.isEverySelected()}
        disabled={this.uiService.isDisabled()}
        segmentId={this.genId(Mode.EVERY)}
        onSelect={() => this.uiServiceApi.selectEvery()}
        label={this.props.localization.quartz.minute.every.label}/>
    );
  }

  protected genIncrement() {
    return (
      <SimpleIncrement
        cssClassPrefix={this.getCssClassPrefix()}
        segmentId={this.genId(Mode.INCREMENT)}
        checked={this.uiServiceApi.isIncrementSelected()}
        disabled={this.uiService.isDisabled()}
        disabledControls={this.uiServiceApi.isIncrementControlsDisabled()}
        onSelect={() => this.uiServiceApi.selectIncrement()}
        label1={this.props.localization.quartz.minute.increment.label1}
        label2={this.props.localization.quartz.minute.increment.label2}
        primaryOptions={this.minuteCodes}
        primaryValue={this.uiServiceApi.getIncrementPrimaryValue()}
        onPrimaryValueChange={this.uiServiceApi.setIncrementPrimaryValue}
        secondaryOptions={this.minutesList}
        secondaryValue={this.uiServiceApi.getIncrementSecondaryValue()}
        onSecondaryValueChange={this.uiServiceApi.setIncrementSecondaryValue}/>
    );
  }

  protected genAnd() {
    return (
      <SimpleAnd
        cssClassPrefix={this.getCssClassPrefix()}
        segmentId={this.genId(Mode.AND)}
        checked={this.uiServiceApi.isAndSelected()}
        disabled={this.uiService.isDisabled()}
        disabledControls={this.uiServiceApi.isAndControlsDisabled()}
        onSelect={() => this.uiServiceApi.selectAnd()}
        label={this.props.localization.quartz.minute.and.label}
        onValueChange={this.uiServiceApi.selectAndValue}
        isValueSelected={value => this.uiServiceApi.isSelectedAndValue(value)}
        options={this.minutesList}/>
    );
  }

  protected genRange() {
    return (
      <SimpleRange
        cssClassPrefix={this.getCssClassPrefix()}
        segmentId={this.genId(Mode.RANGE)}
        checked={this.uiServiceApi.isRangeSelected()}
        disabled={this.uiService.isDisabled()}
        onSelect={() => this.uiServiceApi.selectRange()}
        disabledControls={this.uiServiceApi.isRangeControlsDisabled()}
        label1={this.props.localization.quartz.minute.range.label1}
        label2={this.props.localization.quartz.minute.range.label2}
        primaryOptions={this.minutesList}
        primaryValue={this.uiServiceApi.getRangePrimaryValue()}
        onPrimaryValueChange={this.uiServiceApi.setRangePrimaryValue}
        secondaryOptions={this.minutesList}
        secondaryValue={this.uiServiceApi.getRangeSecondaryValue()}
        onSecondaryValueChange={this.uiServiceApi.setRangeSecondaryValue}/>
    );
  }
}
