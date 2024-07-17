import React from 'react'
import moment from 'moment'
import { useMyScheduleCalendar } from '../../../store/ScheduleCalendar.store'
import { IconButton } from '@mui/material'

const Filter = () => {
  const {
    switchCalendarBackWeek,
    switchCalendarForwardWeek,
    weekFrom,
    weekTo,
  } = useMyScheduleCalendar()

  return (
    <div className="WeekFilter myCenterAlign ">
      <div className="img" onClick={() => switchCalendarBackWeek()}>
        <IconButton>
          <span
            className="material-symbols-outlined"
            style={{ cursor: 'pointer' }}
          >
            arrow_forward
          </span>
        </IconButton>
      </div>
      <div className="filterDates">
        <p>
          {' '}
          {moment(weekFrom).format('DD-MM-YYYY')} -{' '}
          {moment(weekTo).format('DD-MM-YYYY')}{' '}
        </p>
      </div>
      <div className="img" onClick={() => switchCalendarForwardWeek()}>
        <IconButton>
          <span
            className="material-symbols-outlined"
            style={{ cursor: 'pointer' }}
          >
            arrow_back
          </span>
        </IconButton>
      </div>
    </div>
  )
}

export default Filter
