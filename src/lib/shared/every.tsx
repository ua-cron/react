import React from 'react';
import { Mode } from '@sbzen/cron-core';

import { genClassName } from './../helpers';
import { SharedProps } from './props.type';

type Props = {
  label: string;
} & SharedProps;

export const SimpleEvery = ({
  cssClassPrefix = '',
  checked = false,
  disabled = false,
  label,
  onSelect,
  segmentId
}: Props) => (
  <div className={genClassName(cssClassPrefix, ['form-group'], ['c-every', 'c-segment'])}>
    <div className={genClassName(cssClassPrefix, ['form-check'], ['c-every-check'])}>
      <input
        className={genClassName(cssClassPrefix, ['form-check-input'], ['c-every-option'])}
        type="radio"
        id={segmentId}
        value={Mode.EVERY}
        checked={checked}
        disabled={disabled}
        onChange={onSelect} />

      <label
        className={genClassName(cssClassPrefix, ['form-check-label'], ['c-every-option-label'])}
        htmlFor={segmentId}>
        {label}
      </label>
    </div>
  </div>
);
