export class CalendarType {
  constructor(
    public readonly value: string,
    public readonly label: string
  ) {}

  equals(other: CalendarType): boolean {
    return this.value === other.value
  }

  toString(): string {
    return `[CalendarType]{ value: '${this.value}', label: '${this.label}'}`
  }

  static fromValue(val: string): CalendarType | undefined {
    switch (val) {
      case CalendarTypes.WEEK_SQUARE.value:
        return CalendarTypes.WEEK_SQUARE
      case CalendarTypes.MONTH_SQUARE.value:
        return CalendarTypes.MONTH_SQUARE
      case CalendarTypes.FILL.value:
        return CalendarTypes.FILL
      case CalendarTypes.TIMER.value:
        return CalendarTypes.TIMER
    }
    return undefined
  }
}

export const CalendarTypes = {
  WEEK_SQUARE: new CalendarType('ws', 'Squares (Weeks)'),
  MONTH_SQUARE: new CalendarType('ms', 'Squares (Months)'),
  TIMER: new CalendarType('tm', 'Timer'),
  FILL: new CalendarType('fl', '3D')
} as const

export type CalendarTypeKeys = keyof typeof CalendarTypes
