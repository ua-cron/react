import React, { useState, useEffect } from 'react';
import {
  CronQuartzUIService,
  QuartzType,
  Type,
  getSegmentsList,
  getTypeSegments,
  getQuartzTypes
} from '@sbzen/cron-core';

import { getLocalization, genSessionId, genClassName } from './../helpers';
import { CronHostProps } from './../cron-props.type';
import {
  QuartzCronSecond,
  QuartzCronMinute,
  QuartzCronHour,
  QuartzCronMonth,
  QuartzCronYear,
  QuartzCronDay
} from './tabs';

export type ReQuartzCronProps = CronHostProps<QuartzType>;
export const ReQuartzCron = ({
  localization: propLocalization,
  hideTabs: propHideTabs,
  value = '',
  activeTab,
  tabs = getQuartzTypes(),
  renderYearsFrom,
  renderYearsTo,
  cssClassPrefix,
  disabled,
  onTabChange,
  onChange
}: ReQuartzCronProps) => {
  const [tab, setTab] = useState(activeTab || tabs[0]);
  const [service] = useState(new CronQuartzUIService(renderYearsFrom));
  const [renderCount, setRenderCount] = useState(0);
  const [session] = useState(genSessionId());
  const localization = getLocalization(propLocalization);
  const hasTabs = !propHideTabs && !!tabs.length;
  const tabProps = {
    cssClassPrefix,
    localization,
    session,
    service
  };
  const yearTabProps = {
    ...tabProps,
    renderYearsFrom,
    renderYearsTo
  };

  useEffect(() => {
    const shouldUpdate = !!activeTab && activeTab !== tab;
    shouldUpdate && setTab(activeTab);
  }, [activeTab]);
  useEffect(() => () => service.destroy(), [service]);
  useEffect(() => listenChangas());
  useEffect(() => service.fillFromExpression(value), [value]);
  useEffect(() => service.setDisabled(disabled), [disabled]);

  const listenChangas = () => {
    const segments = getSegmentsList();
    return service.listen(segments, (_, segment) => {
      const shouldApply = getTypeSegments(tab).includes(segment);
      if (shouldApply) {
        applyChanges();
      }
    });
  };

  const genContent = () => {
    if (tab === Type.SECONDS) {
      return <QuartzCronSecond {...tabProps}/>;
    } else if (tab === Type.MINUTES) {
      return <QuartzCronMinute {...tabProps}/>;
    } else if (tab === Type.HOURS) {
      return <QuartzCronHour {...tabProps}/>;
    } else if (tab === Type.MONTH) {
      return <QuartzCronMonth {...tabProps}/>;
    } else if (tab === Type.YEAR) {
      return <QuartzCronYear {...yearTabProps}/>;
    } else {
      return <QuartzCronDay {...tabProps}/>;
    }
  };

  const genTabs = (activeTab: QuartzType) => {
    const className = genClassName(cssClassPrefix, ['nav', 'nav-tabs', 'mb-2'], ['c-tabs']);
    return (
      <ul
        className={className}
        role="tablist"
        aria-label="Cron Generator Tabs">

        {tabs.map(t => genTab(t, activeTab))}
      </ul>
    );
  };

  const genTab = (tab: QuartzType, activeTab: QuartzType) => {
    const { tabs: tabsLocalization } = localization;
    const isActive = activeTab === tab;
    const className = genClassName(cssClassPrefix, ['nav-link', isActive ? 'active': ''], [tab, 'c-tab']);
    const tabKey = tab.toLowerCase() as keyof typeof tabsLocalization;

    return (
      <li className={genClassName(cssClassPrefix, ['nav-item'], ['c-tab-item'])}>
        <button
          key={tab}
          role="tab"
          type="button"
          className={className}
          aria-selected={isActive}
          tabIndex={isActive ? 0 : -1}
          onClick={() => changeTab(tab)}>

          {tabsLocalization[tabKey]}
        </button>
      </li>
    );
  };

  const changeTab = (tab: QuartzType) => {
    setTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const applyChanges = () => {
    const str = service.toString();
    if (str !== value && onChange) {
      onChange(str);
    }
    setRenderCount(renderCount + 1);
  };

  return (
    <div className={'c-host c-quartz'}>
      {hasTabs && genTabs(tab)}

      <div
        className="c-tab-content"
        style={{ outline: 'none' }}
        role="tabpanel"
        tabIndex={0}
        tab-name={tab}>
        {genContent()}
      </div>
    </div>
  );
};

export default ReQuartzCron;
