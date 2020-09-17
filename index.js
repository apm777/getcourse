// const dataLessons = [
//   {
//     date: 'Дата начала Вт 08 Сен',
//     link: '/teach/control/lesson/view/id/171143310',
//     title: 'Входной тест',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата и время начала Ср 09 Сен 17:00',
//     link: '/teach/control/lesson/view/id/171143300',
//     title: 'Разделы науки о языке и части речи',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата и время начала Вс 13 Сен 13:00',
//     link: '/teach/control/lesson/view/id/171143301',
//     title: 'Понятие грамматической основы',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата и время начала Пн 14 Сен 17:00',
//     link: '/teach/control/lesson/view/id/171143311',
//     title: 'PROКачка Плюс. Разбор варианта',
//     description: 'PROКАЧКА Плюс',
//     enable: false,
//   },
//   {
//     date: 'Дата и время начала вчера 17:00',
//     link: '/teach/control/lesson/view/id/171143302',
//     title: 'Закрепление нового материала. Практика',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата и время начала Вс 20 Сен 13:00',
//     link: '/teach/control/lesson/view/id/171143303',
//     title: 'Пунктуация в простом ослож. пред-и',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата и время начала Вт 22 Сен 17:00',
//     link: '/teach/control/lesson/view/id/171143304',
//     title: 'Посиделки',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата и время начала Ср 23 Сен 17:00',
//     link: '/teach/control/lesson/view/id/171143305',
//     title: 'Пунктуация в простом ослож. пред-и',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата и время начала Вс 27 Сен 13:00',
//     link: '/teach/control/lesson/view/id/171143306',
//     title: 'Пунктуация при обращ-ях, уточнениях',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата и время начала Пн 28 Сен 17:00',
//     link: '/teach/control/lesson/view/id/171143312',
//     title: 'PROКачка Плюс. Разбор варианта',
//     description: 'PROКАЧКА Плюс',
//     enable: false,
//   },
//   {
//     date: 'Дата и время начала Ср 30 Сен 17:00',
//     link: '/teach/control/lesson/view/id/171143307',
//     title: 'Пунктуация в ССП и СПП',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата и время начала Вс 04 Окт 13:00',
//     link: '/teach/control/lesson/view/id/171143308',
//     title: 'Практика. Решение задания №3',
//     description: '',
//     enable: true,
//   },
//   {
//     date: 'Дата начала Ср 07 Окт',
//     link: '/teach/control/lesson/view/id/171143309',
//     title: 'Итоговый тест',
//     description: '',
//     enable: true,
//   },
// ]

const FISRT_DAY_OF_MOUNT = 1
const COUNT_DAYS_OF_WEEK = 7

const nameDay = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

const getCountWeeks = (year, month) => {
  const beginDate = moment(new Date(year, month - 1, FISRT_DAY_OF_MOUNT))
  const countDayInMonth = beginDate.daysInMonth()
  const dayOfWeek = beginDate.isoWeekday()

  return Math.ceil((countDayInMonth + dayOfWeek - 1) / COUNT_DAYS_OF_WEEK)
}

const getDayOfWeek = (year, month) => moment(new Date(year, month - 1, FISRT_DAY_OF_MOUNT)).isoWeekday()

const getDataLesson = (date, dataLessons) => {
  let name = ''
  let href = ''
  let description = ''
  let time = ''
  let enable = true

  const ind = dataLessons.findIndex((value) => moment(value.newDate).isSame(date, 'day'))

  if (ind !== -1) {
    name = dataLessons[ind].title
    href = dataLessons[ind].link
    description = dataLessons[ind].description
    enable = dataLessons[ind].enable
    if (dataLessons[ind].time !== '00:00') {
      time = dataLessons[ind].time
    }
  }

  return { name, href, description, time, enable }
}

const getCalendarMonth = (year, month, dataLessons) => {
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
        const { name, href, description, time, enable } = getDataLesson(date, dataLessons)
        dataWeek.push({ date, time, day: date.getDate(), name, href, description, enable })
      }
      secondBeginIndex = dayOfWeek - 1
    }

    for (let j = secondBeginIndex; j < COUNT_DAYS_OF_WEEK; j += 1) {
      const date = new Date(year, month - 1, 1 + numberDay)
      const { name, href, description, time, enable } = getDataLesson(date, dataLessons)
      dataWeek.push({ date, time, day: date.getDate(), name, href, description, enable })

      numberDay += 1
    }

    dataMonth.push(dataWeek)
  }
  return dataMonth
}

const parseGetCourseDate = (stringData) => {
  const ID_DATE = 2
  const ID_MONTH = 3
  const ID_YEAR_OR_TIME = 4
  const LENGTH_STRING_YEAR = 4

  const nameMonths = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
  let regex = /(Пн|Вт|Ср|Чт|Пт|Сб|Вс)\s([0-3][0-9])\s([А-Я][а-я][а-я])\s?(([0-2][0-9]:[0-5][0-9])|(20[2-4][0-9])|())/gm

  let match = regex.exec(stringData)

  let year = new Date().getFullYear()
  let hourAndMinute = ['00', '00']

  if (match !== null) {
    const indexMonth = nameMonths.findIndex((el) => el === match[ID_MONTH])

    if (match[ID_YEAR_OR_TIME].length === LENGTH_STRING_YEAR) {
      year = match[ID_YEAR_OR_TIME]
    } else if (match[ID_YEAR_OR_TIME] !== '') {
      hourAndMinute = match[ID_YEAR_OR_TIME].split(':')
    }

    return new Date(year, indexMonth, match[ID_DATE], hourAndMinute[0], hourAndMinute[1])
  }

  regex = /((завтра)|(сегодня)|(вчера))/gm
  match = regex.exec(stringData)
  if (match !== null) {
    const regexTime = /(([0-2][0-9]):([0-5][0-9]))/gm
    const matchTime = regexTime.exec(stringData)
    let addDay = 0

    if (match[0] === 'завтра') {
      addDay = 1
    } else if (match[0] === 'вчера') {
      addDay = -1
    }

    const currDate = new Date()
    currDate.setMinutes(currDate.getMinutes() + currDate.getTimezoneOffset() + 180)

    if (matchTime !== null) {
      ;[, , hourAndMinute[0], hourAndMinute[1]] = matchTime
    }
    return new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      currDate.getDate() + addDay,
      hourAndMinute[0],
      hourAndMinute[1],
    )
  }

  return undefined
}

const getDataLessons = () => {
  const dataLessons = []

  $('.lesson-list li').each(function () {
    const enable = $(this).hasClass('user-state-reached')
    const date = $(this).find('.vmiddle .user-state-label').text().trim()
    const link = $(this).find('.vmiddle .link').attr('href')
    const title = $(this).find('.vmiddle .title').text().trim()
    const description = $(this).find('.vmiddle .description').text().trim()

    dataLessons.push({ date, link, title, description, enable })
  })

  return dataLessons
}

const drawCalendar = (month, year) => {
  const dataLessons = getDataLessons()

  const dl = dataLessons.map((value) => {
    const newDate = parseGetCourseDate(value.date)
    const time = moment(newDate).format('HH:mm')
    return { newDate, time, ...value }
  })

  const dates = getCalendarMonth(year, month, dl)

  $('.container-calendar').empty().append(`
    <div class="apm-select">
      <div>
        <select id="select-month" class="select-css">
          <option value="1">Январь</option>
          <option value="2">Февраль</option>
          <option value="3">Март</option>
          <option value="4">Апрель</option>
          <option value="5">Май</option>
          <option value="6">Июнь</option>
          <option value="7">Июль</option>
          <option value="8">Август</option>
          <option value="9">Сентябрь</option>
          <option value="10">Октябрь</option>
          <option value="11">Ноябрь</option>
          <option value="12">Декабрь</option>
        </select>
      </div>
      <div>
        <select id="select-year" class="select-css">
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
    </div>
    <div class="apm-calendar"></div>`)

  $('#select-month').val(month)
  $('#select-year').val(year)

  $('#select-month').change(() => {
    drawCalendar($('#select-month').val(), $('#select-year').val(), dataLessons)
  })
  $('#select-year').change(() => {
    drawCalendar($('#select-month').val(), $('#select-year').val(), dataLessons)
  })

  $('.apm-calendar').append(`<div class="calendar-head"></div>`)
  nameDay.forEach((name) => {
    $('.calendar-head').append(`<div class="calendar-head-day">${name}</div>`)
  })

  dates.forEach((week, index) => {
    $('.apm-calendar').append(`<div class="calendar-week" data-number-week="${index}"></div>`)
    const currWeek = $(`div[data-number-week="${index}"]`)

    week.forEach((day, dayindex) => {
      currWeek.append(`<div class="calendar-day" data-number-day="${day.day}"></div>`)
      const currDay = $(`div[data-number-week="${index}"] div[data-number-day="${day.day}"]`)
      currDay.append(
        `<div class="calendar-day-title">
          <div class="calendar-day-time">${day.time}</div>
          <div class="calendar-day-number">${day.day}</div>
        </div>`,
      )
      currDay.append(
        `<div class="calendar-day-name-block">
          <div class="calendar-day-name-block2" >
            <p class="calendar-day-name">${day.name}</p>
          </div>
        </div>`,
      )

      if (day.name !== '') {
        currDay.addClass('calendar-day-lesson')

        if (day.enable) {
          currDay.attr('onClick', `window.location.href='https://easypeasyschool.getcourse.ru${day.href}'`)
        } else {
          currDay.click(function () {
            alert(`Этот урок доступен только ученикам на тарифе ПРО+. Если произошла ошибка, или ты хочешь перевестись на этот тариф, напиши, пожалуйста, персональному менеджеру`)
          })
        }
        //       if (dayindex !== 6) {
        //         currDay.addClass('calendar-day-lesson')
        //       } else {
        //         currDay.addClass('calendar-day-dayoff')
        //        }
      }

      //     if (moment(day.date).isSame(new Date(), 'day')) {
      //       currDay.addClass('calendar-day-current')
      //     }
    })
  })
}

$(() => {
  drawCalendar(9, 2020)
})
