import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Loader from '../../../../shared/Loader'
import { useMyScheduleCalendar } from '../../../../store/ScheduleCalendar.store'
import { useModals } from '../../../../provider/ModalProvider'
import { ConvertHebrewNameDayToWeeksDate } from '../../../../helpers/ScheduleCalendar.helper'
import { HourOfDay } from '../../../../store/ScheduleCalendar.store'

const MobileMyScheduleCalendar = () => {
  const [todayName, setTodayName] = useState<string | null>(null)
  const { loading, ScheduleCalendarInfo, daysOfWeek, hoursOfDay } =
    useMyScheduleCalendar()
  const { setTaskModal } = useModals()
  const fetchCurrentDay = () => {
    const today = moment().locale('he')
    const dayName = today.format('dddd')
    let dayToday = null
    daysOfWeek.map((item) => {
      if (item == dayName) {
        dayToday = item
      }
    })
    setTodayName(dayToday)
  }

  const handleNextDay = () => {
    let previous = null
    for (let i = 0; i < daysOfWeek.length; i++) {
      if (daysOfWeek[i] === todayName) {
        previous = daysOfWeek[i + 1]
        break
      }
    }
    if (!previous) {
      const today = moment().locale('he')
      const dayName = today.format('dddd')
      let dayToday = null
      daysOfWeek.map((item) => {
        if (item == dayName) {
          dayToday = item
        }
      })
      previous = dayToday
    }
    setTodayName(previous)
  }

  const handlePreviousDay = () => {
    let previous = null
    for (let i = 0; i < daysOfWeek.length; i++) {
      if (daysOfWeek[i] === todayName) {
        previous = daysOfWeek[i - 1]
        break
      }
    }
    if (!previous) {
      const today = moment().locale('he')
      const dayName = today.format('dddd')
      let dayToday = null
      daysOfWeek.map((item) => {
        if (item == dayName) {
          dayToday = item
        }
      })
      previous = dayToday
    }
    setTodayName(previous)
  }

  useEffect(() => {
    fetchCurrentDay()
  }, [])
  return (
    <>
      <div className="myPadding myWidth">
        <div className="flex-container myCenterAlign">
          <div className="myPadding">
            <span
              className="material-symbols-outlined"
              onClick={() => handlePreviousDay()}
            >
              arrow_forward
            </span>
          </div>
          <div className="myPadding">
            <span>{todayName}</span>
          </div>
          <div className="myPadding">
            <span
              className="material-symbols-outlined"
              style={{ cursor: 'pointer' }}
              onClick={() => handleNextDay()}
            >
              arrow_back
            </span>
          </div>
        </div>
      </div>

      <div className="weekly-scheduler">
        <div className="header">
          <div className="cell img_time">
            <span className="material-symbols-outlined">schedule</span>
          </div>
          {daysOfWeek.map((day, index) => {
            if (day === todayName) {
              return (
                <div key={day} className="cell day myCenterAlign">
                  <p>
                    {day} - {ConvertHebrewNameDayToWeeksDate(index)}
                  </p>
                </div>
              )
            }
          })}
        </div>
        <div className="body">
          {loading ? (
            <div className="myCenterAlign loaderHeightMin">
              <Loader />
            </div>
          ) : (
            hoursOfDay.map((hour) => (
              <div key={hour} className="row">
                <div className="cell hour">
                  <p>{hour}</p>
                </div>
                {daysOfWeek.map((day) => {
                  if (day === todayName) {
                    return (
                      <div key={`${day}-${hour}`} className="cell">
                        {ScheduleCalendarInfo.map((event) => {
                          if (
                            event.choosedDay === day &&
                            event.hourFrom === hour
                          ) {
                            const eventDuration =
                              hoursOfDay.indexOf(event.hourTo as HourOfDay) -
                              hoursOfDay.indexOf(event.hourFrom as HourOfDay)
                            return (
                              <div
                                key={`${day}-${hour}-${event.hourFrom} event`}
                                className={`event_1`}
                                style={{ height: `${eventDuration * 100}px` }}
                                onClick={() => setTaskModal(true)}
                              >
                                <div className={`entire`}>
                                  <div className="head">
                                    <div className="hour_card">
                                      {event.hourTo}
                                    </div>
                                    <div className="hour_card">
                                      {event.hourFrom}
                                    </div>
                                  </div>
                                  <div className="cont_block">
                                    <div className="heading">
                                      {event.subTusk ? (
                                        <h3>{event.subTusk.length} משולב</h3>
                                      ) : (
                                        <h3>{event.objectiveType}</h3>
                                      )}
                                    </div>
                                    <div className="title_cont">
                                      {/* <p>
                                        {event.mission} {event.visit}
                                      </p> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        })}
                        {/* <button onClick={() => addEvent(day, hour, hoursOfDay[hoursOfDay.indexOf(hour) + 1])}>Add Event</button> */}
                      </div>
                    )
                  }
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default MobileMyScheduleCalendar
