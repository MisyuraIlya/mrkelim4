import React, { FC, useState } from 'react'
import { HourOfDay } from '../../../store/ScheduleCalendar.store'
import Modals from '../../Modals'

type DayOfWeek = 'ראשון' | 'שני' | 'שלישי' | 'רביעי' | 'חמישי' | 'שישי' | 'שבת'

interface MySheduleCalendarItemProps {
  key: number
  event: IAgentObjective
  day: DayOfWeek
  hour: HourOfDay
  eventDuration: number
}
const MySheduleCalendarItem: FC<MySheduleCalendarItemProps> = ({
  key,
  event,
  day,
  hour,
  eventDuration,
}) => {
  const [open, setOpen] = useState(false)

  const handleType = () => {
    if (event.objectiveType === 'mix') {
      return 'event_3'
    } else if (event.objectiveType === 'task') {
      return 'event_2'
    } else if (event.objectiveType === 'visit') {
      return 'event_1'
    } else {
      return 'event_1'
    }
  }
  return (
    <>
      <div
        key={`${key} event`}
        className={handleType()}
        style={{ height: `${eventDuration * 100}px` }}
        onClick={() => setOpen(!open)}
      >
        <div className={`entire`}>
          <div className="head">
            <div className="hour_card">{event.hourTo}</div>
            <div className="hour_card">{event.hourFrom}</div>
          </div>
          <div className="cont_block">
            <div className="heading">
              {event.subTusk ? (
                <h3>{event.subTusk.length} משולב</h3>
              ) : (
                <h3>{event.objectiveType == 'task' ? 'משימה' : 'ביקור'}</h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modals.Agent.Mission.Update item={event} open={open} setOpen={setOpen} />
    </>
  )
}

export default MySheduleCalendarItem
