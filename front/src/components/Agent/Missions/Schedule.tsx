import React, { useState } from 'react'
import {
  useMyScheduleCalendar,
  HourOfDay,
} from '../../../store/ScheduleCalendar.store'
import Loader from '../../../utils/Loader'
import { ConvertHebrewNameDayToWeekDateByWeekName } from '../../../helpers/ScheduleCalendar.helper'
import { useMobile } from '../../../provider/MobileProvider'
import './MyScheduleCalendar.styles.scss'
import MySheduleCalendarItem from './MySheduleCalendarItem'
import hooks from '../../../hooks'

const Schedule = () => {
  const { daysOfWeek, hoursOfDay, weekFrom, weekTo, loading } =
    useMyScheduleCalendar()
  const { isMobile } = useMobile()
  const { data } = hooks.agent.useDataAgentMissions(weekFrom, weekTo)
  return (
    <>
      {!isMobile ? (
        <div className="weekly-scheduler myMarginBottom">
          <div className="header">
            <div className="cell img_time">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            {daysOfWeek.map((day, index) => (
              <div key={day} className="cell day">
                <p>
                  {day} -{' '}
                  {ConvertHebrewNameDayToWeekDateByWeekName(index, weekFrom)}
                </p>
              </div>
            ))}
          </div>
          <div className="body">
            {loading ? (
              <div className="myCenterAlign loaderHeightMin">
                <Loader />
              </div>
            ) : (
              hoursOfDay.map((hour, key1) => (
                <div key={key1} className="row">
                  <div className="cell hour">
                    <p>{hour}</p>
                  </div>
                  {daysOfWeek.map((day, key2) => (
                    <div key={`${key2}`} className="cell">
                      {data?.data.map((event, key3) => {
                        if (event.choosedDay == day && event.hourFrom == hour) {
                          const eventDuration =
                            hoursOfDay.indexOf(event.hourTo as HourOfDay) -
                            hoursOfDay.indexOf(event.hourFrom as HourOfDay)
                          return (
                            <MySheduleCalendarItem
                              key={key3}
                              event={event}
                              day={day}
                              hour={hour}
                              eventDuration={eventDuration}
                            />
                          )
                        }
                        return null
                      })}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <>{/* <MobileMyScheduleCalendar /> */}</>
      )}
    </>
  )
}

export default Schedule
