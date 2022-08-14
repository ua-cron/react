import React from 'react';
import { Mode } from '@sbzen/cron-core';

import { genClassName } from './../helpers';
import { SharedProps } from './props.type';

type Props = {
  disabledControls?: boolean;
  onValueChange: (value: string) => void;
  isValueSelected: (value: string) => boolean;
  options: {
    label: string,
    value: string
  }[],
  label: string;
  gridSize?: string;
} & SharedProps;

export const SimpleAnd = ({
  cssClassPrefix = '',
  checked = false,
  disabled = false,
  disabledControls = false,
  label,
  options,
  onSelect,
  onValueChange,
  isValueSelected,
  gridSize = 'col-2 col-md-1',
  segmentId
}: Props) => (
  <div className={genClassName(cssClassPrefix, ['form-group'], ['c-and', 'c-segment'])}>
    <div className={genClassName(cssClassPrefix, ['form-check'], ['c-and-check'])}>
      <input
        className={genClassName(cssClassPrefix, ['form-check-input'], ['c-and-option'])}
        type="radio"
        id={segmentId}
        value={Mode.AND}
        checked={checked}
        disabled={disabled}
        onChange={onSelect} />

      <label
        className={genClassName(cssClassPrefix, ['form-check-label'], ['c-and-option-label'])}
        htmlFor={segmentId}>
        {label}
      </label>
    </div>

    <div className={genClassName(cssClassPrefix, ['row', 'pl-3', 'pt-1'], ['c-and-list'])}>
      {options.map(item => {
        return (
          <div
            className={genClassName(cssClassPrefix, [gridSize], ['c-and-item'])}
            item-value={item.value}
            key={item.value}>

            <div className={genClassName(cssClassPrefix, ['form-check'], ['c-and-item-check'])}>
              <input
                className={genClassName(cssClassPrefix, ['form-check-input'], ['c-and-item-field'])}
                type="checkbox"
                id={`${segmentId}_${item.value}`}
                value={item.value}
                disabled={disabledControls}
                checked={isValueSelected(item.value)}
                onChange={() => onValueChange(item.value)} />

              <label
                className={genClassName(cssClassPrefix, ['form-check-label'], ['c-and-item-label'])}
                htmlFor={`${segmentId}_${item.value}`}>
                {item.label}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
