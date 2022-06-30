import React from 'react';
import { Segment, Mode, Type, getList } from '@sbzen/cron-core';

import { SimpleEvery, SimpleAnd, SimpleRange } from './../../../shared';
import { CronTabBaseProps } from './../../../cron-tab-base.abstract';
import { QuartzTabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { SimpleIncrement } from './../shared';

export class QuartzCronHour extends QuartzTabSingleSegmentComponent {
  private readonly uiService = this.getQuartzCron();
  private readonly uiServiceApi = this.uiService.getApi<Type.HOURS>(Type.HOURS);
  private readonly hourCodes = getList(Segment.hours, true);
  private readonly hoursList = getList(Segment.hours);

  constructor(props: CronTabBaseProps) {
    super(props, [Segment.hours]);
  }

  protected genEvery() {
    return (
      <SimpleEvery
        cssClassPrefix={this.getCssClassPrefix()}
        checked={this.uiServiceApi.isEverySelected()}
        disabled={this.uiService.isDisabled()}
        segmentId={this.genId(Mode.EVERY)}
        onSelect={() => this.uiServiceApi.selectEvery()}
        label={this.props.localization.quartz.hour.every.label}/>
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
        label1={this.props.localization.quartz.hour.increment.label1}
        label2={this.props.localization.quartz.hour.increment.label2}
        primaryOptions={this.hourCodes}
        primaryValue={this.uiServiceApi.getIncrementPrimaryValue()}
        onPrimaryValueChange={this.uiServiceApi.setIncrementPrimaryValue}
        secondaryOptions={this.hoursList}
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
        label={this.props.localization.quartz.hour.and.label}
        onValueChange={this.uiServiceApi.selectAndValue}
        isValueSelected={value => this.uiServiceApi.isSelectedAndValue(value)}
        options={this.hoursList}/>
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
        label1={this.props.localization.quartz.hour.range.label1}
        label2={this.props.localization.quartz.hour.range.label2}
        primaryOptions={this.hoursList}
        primaryValue={this.uiServiceApi.getRangePrimaryValue()}
        onPrimaryValueChange={this.uiServiceApi.setRangePrimaryValue}
        secondaryOptions={this.hoursList}
        secondaryValue={this.uiServiceApi.getRangeSecondaryValue()}
        onSecondaryValueChange={this.uiServiceApi.setRangeSecondaryValue}/>
    );
  }
}
