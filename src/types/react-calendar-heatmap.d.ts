declare module 'react-calendar-heatmap' {
  import * as React from 'react'
  export interface Value {
    date: string | Date
    count?: number
  }
  export interface CalendarHeatmapProps {
    startDate: string | Date
    endDate: string | Date
    values: Value[]
    classForValue?: (value: Value) => string
    showWeekdayLabels?: boolean
    tooltipDataAttrs?: (value: Value) => Record<string, string>
  }
  export default class CalendarHeatmap extends React.Component<CalendarHeatmapProps> {}
}

