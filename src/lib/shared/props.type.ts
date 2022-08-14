import { CronBaseProps } from './../cron-base-props.type';

export type SharedProps = {
  segmentId: string,
  disabled?: boolean,
  checked?: boolean,
  onSelect: () => void
} & CronBaseProps;
