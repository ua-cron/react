import { CronBaseProps } from './../cron-base-props.type';

export type SharedProps = {
  segmentId: string;
  checked?: boolean;
  disabled?: boolean;
  onSelect: () => void;
} & CronBaseProps;
