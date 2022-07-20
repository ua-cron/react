import React from 'react';
import { Mode } from '@sbzen/cron-core';

import { genClassName } from './../helpers';
import { SharedProps } from './props.type';

type Props = {
  disabledControls?: boolean;
  primaryOptions: {
    label: string|number,
    value: string
  }[];
  primaryValue: string;
  onPrimaryValueChange: (value: string) => void;
  secondaryOptions: {
    label: string|number,
    value: string
  }[];
  secondaryValue: string;
  onSecondaryValueChange: (value: string) => void;
  label1: string;
  label2: string;
} & SharedProps;

export const SimpleRange = ({
  cssClassPrefix = '',
  checked = false,
  disabled = false,
  disabledControls = false,
  label1,
  label2,
  onSelect,
  primaryOptions,
  primaryValue,
  onPrimaryValueChange,
  secondaryOptions,
  secondaryValue,
  onSecondaryValueChange,
  segmentId
}: Props) => (
  <div className={genClassName(cssClassPrefix, ['form-group', 'form-inline'], ['c-range', 'c-segment'])}>
    <div className={genClassName(cssClassPrefix, ['form-check'], ['c-range-check'])}>

      <input
        className={genClassName(cssClassPrefix, ['form-check-input'], ['c-range-option'])}
        type="radio"
        id={segmentId}
        value={Mode.RANGE}
        checked={checked}
        disabled={disabled}
        onChange={onSelect}/>

      <label
        className={genClassName(cssClassPrefix, ['form-check-label'], ['c-range-option-label'])}
        htmlFor={segmentId}>
        {label1}
      </label>
    </div>

    <select
      className={genClassName(cssClassPrefix, ['form-control', 'form-control-sm', 'mx-1'], ['c-range-from'])}
      disabled={disabledControls}
      value={primaryValue}
      onChange={(e) => onPrimaryValueChange(e.target.value)}>

      {primaryOptions.map(item => {
        return (
          <option
            key={item.value}
            value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>

    <label
      className="c-range-option-label2"
      htmlFor={segmentId}>
      {label2}
    </label>

    <select
      className={genClassName(cssClassPrefix, ['form-control', 'form-control-sm', 'ml-1'], ['c-range-to'])}
      disabled={disabledControls}
      value={secondaryValue}
      onChange={(e) => onSecondaryValueChange(e.target.value)}>

      {secondaryOptions.map(item => {
        return (
          <option
            key={item.value}
            value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  </div>
);
