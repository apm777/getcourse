const FISRT_DAY_OF_MOUNT = 1
const COUNT_DAYS_OF_WEEK = 7

const calendar = {
  month: 9,
  dates: [
    [
      { day: 31, name: '', href: '' },
      { day: 1, name: '', href: '' },
      { day: 2, name: '', href: '' },
      { day: 3, name: '', href: '' },
      { day: 4, name: '', href: '' },
      { day: 5, name: '', href: '' },
      { day: 6, name: 'Бесплатный вебинар', href: '' },
    ],
    [
      { day: 7, name: '', href: '' },
      {
        day: 8,
        name: 'Атомы и молекулы',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114544',
      },
      { day: 9, name: '', href: '' },
      {
        day: 10,
        name: 'Разбор варианта',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114684',
      },
      { day: 11, name: '', href: '' },
      {
        day: 12,
        name: 'Строение атома',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114613',
      },
      { day: 13, name: 'Бесплатный вебинар', href: '' },
    ],
    [
      { day: 14, name: '', href: '' },
      {
        day: 15,
        name: 'Практика по 1 и 2 уроку',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114619',
      },
      { day: 16, name: '', href: '' },
      { day: 17, name: '', href: '' },
      { day: 18, name: '', href: '' },
      {
        day: 19,
        name: 'Периоди- ческий закон',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114626',
      },
      { day: 20, name: 'Бесплатный вебинар', href: '' },
    ],
    [
      { day: 21, name: '', href: '' },
      {
        day: 22,
        name: 'Валентность и степень окисления',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114641',
      },
      { day: 23, name: '', href: '' },
      {
        day: 24,
        name: 'Разбор варианта',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114687',
      },
      {
        day: 25,
        name: 'Посиделки',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114647',
      },
      {
        day: 26,
        name: 'Практика по 3 и 4 уроку',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114656',
      },
      { day: 27, name: 'Бесплатный вебинар', href: '' },
    ],
    [
      { day: 28, name: '', href: '' },
      {
        day: 29,
        name: 'Строение молекул',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114663',
      },
      { day: 30, name: '', href: '' },
      { day: 1, name: '', href: '' },
      { day: 2, name: '', href: '' },
      {
        day: 3,
        name: 'Основ. классы неорганических веществ',
        href: 'https://easypeasyschool.getcourse.ru/teach/control/lesson/view/id/168114674',
      },
      { day: 4, name: 'Бесплатный вебинар', href: '' },
    ],
  ],
}

const nameDay = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

const drawCalendar = () => {
  const { month, dates } = calendar

  $('.container-calendar').append(`<div class="calendar-head"></div>`)
  nameDay.forEach((name) => {
    $('.calendar-head').append(`<div class="calendar-head-day">${name}</div>`)
  })

  dates.forEach((week, index) => {
    $('.container-calendar').append(`<div class="calendar-week" data-number-week="${index}"></div>`)
    const currWeek = $(`div[data-number-week="${index}"]`)

    week.forEach((day, dayindex) => {
      console.log(day.day)
      currWeek.append(`<div class="calendar-day" data-number-day="${day.day}"></div>`)
      const currDay = $(`div[data-number-week="${index}"] div[data-number-day="${day.day}"]`)
      currDay.append(`<p class="calendar-day-number">${day.day}</p>`)
      currDay.append(
        `<div class="calendar-day-name-block">
          <div class="calendar-day-name-block2" >
            <p class="calendar-day-name">${day.name}</p>
          </div>
        </div>`,
      )

      if (day.name !== '') {
        currDay.attr('onClick', `window.location.href='${day.href}'`)
        if (dayindex !== 6) {
          currDay.addClass('calendar-day-lesson')
        } else {
          currDay.addClass('calendar-day-dayoff')
        }
      }
    })
  })
}

const getCountWeeks = (year, month) => {
  const beginDate = moment(new Date(year, month - 1, FISRT_DAY_OF_MOUNT))
  const countDayInMonth = beginDate.daysInMonth()
  const dayOfWeek = beginDate.isoWeekday()

  return Math.ceil((countDayInMonth + dayOfWeek - 1) / COUNT_DAYS_OF_WEEK)
}

const getDayOfWeek = (year, month) => moment(new Date(year, month - 1, FISRT_DAY_OF_MOUNT)).isoWeekday()

const getCalendarMonth = (year, month) => {
  const dataMonth = []
  const countWeeks = getCountWeeks(year, month)
  const dayOfWeek = getDayOfWeek(year, month)

  let numberDay = 0

  for (let i = 0; i < countWeeks; i += 1) {
    const dataWeek = []
    let secondBeginIndex = 0

    if (i === 0) {
      for (let j = 0; j < dayOfWeek - 1; j += 1) {
        const date = new Date(year, month - 1, 1 - (dayOfWeek - 1 - j))
        dataWeek.push({ date, day: date.getDate(), name: '', href: '' })
      }
      secondBeginIndex = dayOfWeek - 1
    }

    for (let j = secondBeginIndex; j < COUNT_DAYS_OF_WEEK; j += 1) {
      const date = new Date(year, month - 1, 1 + numberDay)
      dataWeek.push({ date, day: date.getDate(), name: '', href: '' })
      numberDay += 1
    }

    dataMonth.push(dataWeek)
  }
  return dataMonth
}

// onClick="window.location.href='http://ya.ru'"

$(() => {
  // drawCalendar()

  // let dataMonth = []
  // const month = 10
  // const year = 2020

  // dataMonth = getCalendarMonth(year, month)
  // dataMonth = getCalendarMonth(year, 2)
  // console.log(dataMonth)

  const regex = /(Пн|Вт|Ср|Чт|Пт|Сб|Вс)\s([0-3][0-9])\s([А-Я][а-я][а-я])\s(([0-2][0-9]:[0-5][0-9])|(20[2-4][0-9]))/gm
  const str = `Дата и время начала Вт 22 Сен 18:00`
  const m = regex.exec(str)
  console.log(m)
})
