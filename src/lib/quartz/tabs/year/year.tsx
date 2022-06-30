import React from 'react';
import { Segment, Mode, Type, getList } from '@sbzen/cron-core';

import { SimpleEvery, SimpleAnd, SimpleRange } from './../../../shared';
import { CronTabBaseProps } from './../../../cron-tab-base.abstract';
import { QuartzTabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { SimpleIncrement } from './../shared';

export type CronTabYearProps = {
  renderYearsFrom?: number,
  renderYearsTo?: number
} & CronTabBaseProps;

export class QuartzCronYear extends QuartzTabSingleSegmentComponent<CronTabYearProps> {
  private readonly uiService = this.getQuartzCron();
  private readonly uiServiceApi = this.uiService.getApi<Type.YEAR>(Type.YEAR);
  private readonly yearCodes = getList(Segment.year, true);
  private readonly years = getList(Segment.year);

  constructor(props: CronTabYearProps) {
    super(props, [Segment.year]);
    const { renderYearsFrom, renderYearsTo } = props;
    this.years = getList(Segment.year, false, renderYearsFrom, renderYearsTo);
  }

  protected genEvery() {
    return (
      <SimpleEvery
        cssClassPrefix={this.getCssClassPrefix()}
        checked={this.uiServiceApi.isEverySelected()}
        disabled={this.uiService.isDisabled()}
        segmentId={this.genId(Mode.EVERY)}
        onSelect={() => this.uiServiceApi.selectEvery()}
        label={this.props.localization.quartz.year.every.label}/>
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
        label1={this.props.localization.quartz.year.increment.label1}
        label2={this.props.localization.quartz.year.increment.label2}
        primaryOptions={this.yearCodes}
        primaryValue={this.uiServiceApi.getIncrementPrimaryValue()}
        onPrimaryValueChange={this.uiServiceApi.setIncrementPrimaryValue}
        secondaryOptions={this.years}
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
        label={this.props.localization.quartz.year.and.label}
        onValueChange={this.uiServiceApi.selectAndValue}
        isValueSelected={value => this.uiServiceApi.isSelectedAndValue(value)}
        options={this.years}/>
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
        label1={this.props.localization.quartz.year.range.label1}
        label2={this.props.localization.quartz.year.range.label2}
        primaryOptions={this.years}
        primaryValue={this.uiServiceApi.getRangePrimaryValue()}
        onPrimaryValueChange={this.uiServiceApi.setRangePrimaryValue}
        secondaryOptions={this.years}
        secondaryValue={this.uiServiceApi.getRangeSecondaryValue()}
        onSecondaryValueChange={this.uiServiceApi.setRangeSecondaryValue}/>
    );
  }
}
