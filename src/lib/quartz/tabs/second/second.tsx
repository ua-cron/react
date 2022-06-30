import React from 'react';
import { Segment, Mode, Type, getList } from '@sbzen/cron-core';

import { SimpleEvery, SimpleAnd, SimpleRange } from './../../../shared';
import { CronTabBaseProps } from './../../../cron-tab-base.abstract';
import { QuartzTabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { SimpleIncrement } from './../shared';

export class QuartzCronSecond extends QuartzTabSingleSegmentComponent {
  private readonly uiService = this.getQuartzCron();
  private readonly uiServiceApi = this.uiService.getApi<Type.SECONDS>(Type.SECONDS);
  private readonly secondCodes = getList(Segment.seconds, true);
  private readonly secondsList = getList(Segment.seconds);

  constructor(props: CronTabBaseProps) {
    super(props, [Segment.seconds]);
  }

  protected genEvery() {
    return (
      <SimpleEvery
        cssClassPrefix={this.getCssClassPrefix()}
        checked={this.uiServiceApi.isEverySelected()}
        disabled={this.uiService.isDisabled()}
        segmentId={this.genId(Mode.EVERY)}
        onSelect={() => this.uiServiceApi.selectEvery()}
        label={this.props.localization.quartz.second.every.label}/>
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
        label1={this.props.localization.quartz.second.increment.label1}
        label2={this.props.localization.quartz.second.increment.label2}
        primaryOptions={this.secondCodes}
        primaryValue={this.uiServiceApi.getIncrementPrimaryValue()}
        onPrimaryValueChange={this.uiServiceApi.setIncrementPrimaryValue}
        secondaryOptions={this.secondsList}
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
        label={this.props.localization.quartz.second.and.label}
        onValueChange={this.uiServiceApi.selectAndValue}
        isValueSelected={value => this.uiServiceApi.isSelectedAndValue(value)}
        options={this.secondsList}/>
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
        label1={this.props.localization.quartz.second.range.label1}
        label2={this.props.localization.quartz.second.range.label2}
        primaryOptions={this.secondsList}
        primaryValue={this.uiServiceApi.getRangePrimaryValue()}
        onPrimaryValueChange={this.uiServiceApi.setRangePrimaryValue}
        secondaryOptions={this.secondsList}
        secondaryValue={this.uiServiceApi.getRangeSecondaryValue()}
        onSecondaryValueChange={this.uiServiceApi.setRangeSecondaryValue}/>
    );
  }
}
