import React from 'react';

import { Mode } from '@sbzen/cron-core';
import { CronBaseProps } from './cron-base-props.type';

export abstract class CronBaseComponent<P extends { session: string } & CronBaseProps> extends React.Component<P> {
  protected getCssClassPrefix() {
    return this.props.cssClassPrefix || '';
  }

  protected genId(mode: Mode, extra?: string) {
    return `${mode}-${extra}${this.props.session}`;
  }
}
