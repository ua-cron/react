import React from 'react';

import { Mode } from '@sbzen/cron-core';

export type CronBaseProps = {
  cssClassPrefix?: string;
}

export abstract class CronBaseComponent<P extends { session: string } & CronBaseProps> extends React.Component<P> {
  protected getCssClassPrefix() {
    return this.props.cssClassPrefix || '';
  }

  protected genId(mode: Mode, extra?: string) {
    return `${mode}-${extra}${this.props.session}`;
  }
}
