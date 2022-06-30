export const localization = {
  common: {
    month: {
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December'
    },
    dayOfWeek: {
      sunday: 'Sunday',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday'
    },
    dayOfMonth: {
      '1st': '1st',
      '2nd': '2nd',
      '3rd': '3rd',
      '4th': '4th',
      '5th': '5th',
      '6th': '6th',
      '7th': '7th',
      '8th': '8th',
      '9th': '9th',
      '10th': '10th',
      '11th': '11th',
      '12th': '12th',
      '13th': '13th',
      '14th': '14th',
      '15th': '15th',
      '16th': '16th',
      '17th': '17th',
      '18th': '18th',
      '19th': '19th',
      '20th': '20th',
      '21st': '21st',
      '22nd': '22nd',
      '23rd': '23rd',
      '24th': '24th',
      '25th': '25th',
      '26th': '26th',
      '27th': '27th',
      '28th': '28th',
      '29th': '29th',
      '30th': '30th',
      '31st': '31st'
    }
  },
  tabs: {
    seconds: 'Seconds',
    minutes: 'Minutes',
    hours: 'Hours',
    day: 'Day',
    month: 'Month',
    year: 'Year'
  },
  quartz: {
    day: {
      every: {
        label: 'Every day'
      },
      dayOfWeekIncrement: {
        label1: 'Every',
        label2: 'day(s) starting on'
      },
      dayOfMonthIncrement: {
        label1: 'Every',
        label2: 'day(s) starting on the',
        label3: 'of the month'
      },
      dayOfWeekAnd: {
        label: 'Specific day of week (choose one or many)'
      },
      dayOfWeekRange: {
        label1: 'Every day between',
        label2: 'and'
      },
      dayOfMonthAnd: {
        label: 'Specific day of month (choose one or many)'
      },
      dayOfMonthLastDay: {
        label: 'On the last day of the month'
      },
      dayOfMonthLastDayWeek: {
        label: 'On the last weekday of the month'
      },
      dayOfWeekLastNTHDayWeek: {
        label1: 'On the last',
        label2: 'of the month'
      },
      dayOfMonthDaysBeforeEndMonth: {
        label: 'day(s) before the end of the month'
      },
      dayOfMonthNearestWeekDayOfMonth: {
        label1: 'Nearest weekday (Monday to Friday) to the',
        label2: 'of the month'
      },
      dayOfWeekNTHWeekDayOfMonth: {
        label1: 'On the',
        label2: 'of the month'
      }
    },
    month: {
      every: {
        label: 'Every month'
      },
      increment: {
        label1: 'Every',
        label2: 'month(s) starting at month',
      },
      and: {
        label: 'Specific month (choose one or many)'
      },
      range: {
        label1: 'Every month between month',
        label2: 'and month'
      }
    },
    second: {
      every: {
        label: 'Every second'
      },
      increment: {
        label1: 'Every',
        label2: 'second(s) starting at second',
      },
      and: {
        label: 'Specific second (choose one or many)'
      },
      range: {
        label1: 'Every second between second',
        label2: 'and second'
      }
    },
    minute: {
      every: {
        label: 'Every minute'
      },
      increment: {
        label1: 'Every',
        label2: 'minute(s) starting at minute',
      },
      and: {
        label: 'Specific minute (choose one or many)'
      },
      range: {
        label1: 'Every minute between minute',
        label2: 'and minute'
      }
    },
    hour: {
      every: {
        label: 'Every hour'
      },
      increment: {
        label1: 'Every',
        label2: 'hour(s) starting at hour',
      },
      and: {
        label: 'Specific hour (choose one or many)'
      },
      range: {
        label1: 'Every hour between hour',
        label2: 'and hour'
      }
    },
    year: {
      every: {
        label: 'Any year'
      },
      increment: {
        label1: 'Every',
        label2: 'year(s) starting at year',
      },
      and: {
        label: 'Specific year (choose one or many)'
      },
      range: {
        label1: 'Every year between year',
        label2: 'and year'
      }
    }
  },
  unix: {
    day: {
      every: {
        label: 'Every day'
      },
      dayOfWeekIncrement: {
        label1: 'Every',
        label2: 'day(s) of week'
      },
      dayOfMonthIncrement: {
        label1: 'Every',
        label2: 'day(s) of month'
      },
      dayOfWeekAnd: {
        label: 'Specific day of week (choose one or many)'
      },
      dayOfMonthAnd: {
        label: 'Specific day of month (choose one or many)'
      }
    },
    month: {
      every: {
        label: 'Every month'
      },
      increment: {
        label1: 'Every',
        label2: 'month(s)',
      },
      and: {
        label: 'Specific month (choose one or many)'
      },
      range: {
        label1: 'Every month between month',
        label2: 'and month'
      }
    },
    minute: {
      every: {
        label: 'Every minute'
      },
      increment: {
        label1: 'Every',
        label2: 'minute(s)',
      },
      and: {
        label: 'Specific minute (choose one or many)'
      },
      range: {
        label1: 'Every minute between minute',
        label2: 'and minute'
      }
    },
    hour: {
      every: {
        label: 'Every hour'
      },
      increment: {
        label1: 'Every',
        label2: 'hour(s)',
      },
      and: {
        label: 'Specific hour (choose one or many)'
      },
      range: {
        label1: 'Every hour between hour',
        label2: 'and hour'
      }
    }
  }
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type CronLocalization = DeepPartial<typeof localization>;
