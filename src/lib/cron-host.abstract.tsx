import React from 'react';
import { Type, CronQuartzUIService, CronUnixUIService } from '@sbzen/cron-core';

import { localization, CronLocalization, DeepPartial } from './cron-localization';
import { CronBaseProps } from './cron-base-props.type';
import { CronState } from './cron-state.type';
import { genClassName } from './helpers';

type RawObject = DeepPartial<{
  [key: string]: string|RawObject;
}>;

export type CronHostProps = {
  localization?: CronLocalization,
  hideTabs?: boolean,
  value?: string,
  activeTab?: Type,
  tabs?: Type[],
  disabled?: boolean,
  renderYearsFrom?: number,
  renderYearsTo?: number,
  onChange?: (cronValue: string) => void,
  onTabChange?: (tab: Type) => void
} & CronBaseProps;

export abstract class CronHostComponent extends React.Component<CronHostProps, CronState> {
  protected readonly session = `${Date.now()}_${Math.random()}`;

  protected abstract getTabs(): Type[];
  protected abstract genContent(): JSX.Element|null;
  protected abstract getQuartzCron(): CronQuartzUIService|CronUnixUIService;

  constructor(props: CronHostProps) {
    super(props);

    this.state = {
      tab: this.getActiveTab()
    };
  }

  override componentDidUpdate(prevProps: CronHostProps) {
    const servce = this.getQuartzCron();
    if (prevProps.activeTab !== this.props.activeTab) {
      this.setState({
        tab: this.getActiveTab()
      });
    }
    if (prevProps.disabled !== this.props.disabled) {
      servce.setDisabled(this.props.disabled);
    }
    if (prevProps.value !== this.props.value) {
      servce.fillFromExpression(this.props.value || '');
    }
  }

  override componentDidMount() {
    const servce = this.getQuartzCron();
    servce.fillFromExpression(this.props.value || '');
  }

  protected changeTab(tab: Type) {
    this.setState({ tab });
    if (this.props.onTabChange) {
      this.props.onTabChange(tab);
    }
  }

  protected applyChanges() {
    const str = this.getQuartzCron().toString();

    if (str !== this.props.value && this.props.onChange) {
      this.props.onChange(str);
    }
  }

  protected renderHost(activeTab: Type, addClass: string) {
    const hasTabs = !this.props.hideTabs && !!this.getTabs().length;
    return (
      <div className={`c-host ${addClass}`}>
        {hasTabs && this.genTabs(activeTab)}

        <div
          className="c-tab-content"
          role="tabpanel"
          tabIndex={0}
          tab-name={activeTab}>
          {this.genContent()}
        </div>
      </div>
    );
  }

  protected getLocalization() {
    const args: RawObject[] = [localization];
    if (this.props.localization) {
      args.push(this.props.localization);
    }
    return this.mergeDeep<typeof localization>(...args);
  }

  private getActiveTab() {
    const [activeTab] = this.props.activeTab ? [this.props.activeTab] : this.getTabs();
    return activeTab;
  }

  private genTabs(activeTab: Type) {
    const className = genClassName(this.props.cssClassPrefix, ['nav', 'nav-tabs', 'mb-2'], ['c-tabs']);
    return (
      <ul
        className={className}
        role="tablist"
        aria-label="Cron Generator Tabs">

        {this.getTabs().map(t => this.genTab(t, activeTab))}
      </ul>
    );
  }

  private genTab(tab: Type, activeTab: Type) {
    const { tabs: tabsLocalization } = this.getLocalization();
    const isActive = activeTab === tab;
    const className = genClassName(this.props.cssClassPrefix, ['nav-link'], [tab, 'c-tab', isActive ? 'active': '']);
    const tabKey = tab.toLowerCase() as keyof typeof tabsLocalization;

    return (
      <button
        key={tab}
        role="tab"
        type="button"
        className={className}
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={() => this.changeTab(tab)}>

        {tabsLocalization[tabKey]}
      </button>
    );
  }

  private mergeDeep<T extends RawObject>(...objects: RawObject[]) {
    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        const pVal = prev[key];
        const oVal = obj[key];

        if (pVal && typeof pVal === 'object' && oVal && typeof oVal === 'object') {
          prev[key] = this.mergeDeep(pVal, oVal);
        } else {
          prev[key] = oVal;
        }
      });

      return prev;
    }, {}) as T;
  }
}
