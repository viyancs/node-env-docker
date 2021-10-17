$(document).ready(function () {
  // globals and sounds
  var sounds = {
    chatDetectEvent: new Audio('static/media/chat__detect_event.mp3'),
    taskCheck: new Audio('static/media/task__check.mp3'),
    taskUncheck: new Audio('static/media/task__uncheck.mp3'),
  }

  function playSound(name) {
    let playPromise = sounds[name].play()
    if (playPromise !== undefined) {
      playPromise
        .then(function () {
          // Automatic playback started!
        })
        .catch(function (error) {
          console.log(error)
          // Automatic playback failed.
          // Show a UI element to let the user manually start playback.
        })
    }
  }

  var cal_rendered = false

  // $('.toggle-wrapper button').on('click', function () {
  //   $('#main-wrapper').toggleClass('hide-left-sidebar')
  // })

  $('.right-toggle-wrapper button').on('click', function () {
    $('#main-wrapper').toggleClass('hide-right-sidebar')
  })

  $('.calendar-toggle button').on('click', function () {
    $('[js-nav="calendar"]').click()
  })

  $('[js-nav="calendar"]').on('click', function () {
    activate_calendar()
  })

  function activate_calendar() {
    if (~cal_rendered) {
      setTimeout(function () {
        var calendarEl = document.getElementById('calendar-full')
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          aspectRatio: 2.25,
          height: 700,
          width: '100%',
          // weekends: false,
          handleWindowResize: true,
          minTime: '07:30:00',
          maxTime: '22:00:00',
          updateSize: true,
          duration: { days: 5 },
          slotEventOverlap: true,
          nowIndicator: true,
          displayEventTime: false,
          displayEventEnd: false,
          titleFormat: { year: 'numeric', month: 'long' },
          dayHeaders: false,
          themeSystem: 'minty',
          customButtons: {
            addButton: {
              text: 'New Event',

              click: function () {
                return
              },
            },
          },
          // dayCellContent: { html: `${dayCellContent.dayNumberText}` },
          buttonText: {
            month: 'Month',
            week: 'Week',
            day: 'Day',
            today: 'Today',
          },
          headerToolbar: {
            left: 'title',
            center: 'dayGridMonth timeGridWeek timeGridDay',
            right: 'prev today next',
          },
          events: '/events',
        })
        calendar.render()
      }, 500)
      cal_rendered = true
    }
  }

  $('#right-button').click(function (event) {
    event.preventDefault()
    $('.scrollable-content-wrapper').animate(
      {
        scrollLeft: '+=200px',
      },
      200,
    )
  })

  $('#left-button').click(function (event) {
    event.preventDefault()
    $('.scrollable-content-wrapper').animate(
      {
        scrollLeft: '-=200px',
      },
      200,
    )
  })

  function toggle_sidebar(side) {
    if (side == 'left') {
      $('[js-toggle-sidebar-left]').click()
    } else if (side == 'right') {
      $('[js-toggle-sidebar-right]').click()
    }
  }

  $('[js-show-modal]').on('click', function () {
    var target = $(this).data('target')
  })

  $('[js-new-message]').on('click', function () {
    $('[js-nav="mail"]').click()
  })

  $('[js-close-calendar]').on('click', function () {
    $('[js-nav="calendar"]').click()
  })

  // scroll to bottom of messages on load
  function scrollChat() {
    chatWindow = document.getElementById('chat-list')
    chatWindow.scrollTo(0, chatWindow.scrollHeight + 100)
  }
  scrollChat()

  // var prompt_template = '../templates/_actions__add_to_calendar_prompt.html';
  // var modal_template = '../templates/_actions__add_to_calendar_modal.html';

  $('[js-send-message]').on('click', function () {
    var message = $('[js-message-content]').val()
    console.log(message)
    addChat(message)
    $('[js-message-content]').val('')
  })

  $('button[js-modal="videocall"]').on('click', function () {
    $('div[js-modal="videocall"]').modal('show')
  })

  $('body').on('click', '[js-save-event]', function () {
    console.log('event')
    var event_id = $(this).data('event-id')
    $('[js-event=' + event_id + ']').modal('show')
    // var message = $('[js-message-content]').val();
    // addChat(message);
  })

  function parseDate(msg) {
    var sherlocked = Sherlock.parse(msg)

    // Basic properties
    var title = sherlocked.eventTitle // 'Homework 5 due'
    var startDate = sherlocked.startDate // Date object pointing to next monday at 3pm
    var endDate = sherlocked.endDate // null in this case, since no duration was given
    var isAllDay = sherlocked.isAllDay // false, since a time is included with the event

    if (startDate) sherlocked.startDate = startDate.getTime()
    if (endDate) sherlocked.endDate = endDate.getTime()

    sherlocked.validated = startDate !== null
    return sherlocked
  }

  function addChat(msg) {
    if (msg.trim() == '') return
    var fields = { message: msg }
    var event = parseDate(msg)
    if (event.validated) {
      fields['event'] = JSON.stringify(event)
    }
    $.post('chat', fields, function (response) {
      data = JSON.parse(response)
      $('[js-chat-list]').append(data['prompt'])
      if (data['modal']) {
        $('body').append(data['modal'])
        playSound('chatDetectEvent')
      }
      scrollChat()
    })
  }

  function addPanel() {
    $('.panel.hidden').removeClass('hidden')
    let scw = $('.scrollable-content-wrapper')
    scw.animate({ scrollLeft: 2000 }, 200)
    $('[js-item="team-tasks"]').fadeOut(200)
  }

  $('[js-add-panel]').on('click', function () {
    addPanel()
  })

  function movePanelToCol(panel, col) {
    $('.panel.' + panel).appendTo($('.col' + col))
  }

  function sortCols(e) {
    // if column is empty and panel is chat, panel height = 70vh
    // if column is not empty and panel is chat, panel height = 35%
    let item = e.item
    let fromCol = e.from
    $('.col').each(function () {
      let dest
      if ($(this).hasClass('col1')) {
        dest = 'col2'
      } else if ($(this).hasClass('col2')) {
        dest = 'col1'
      } else {
        dest = 'col2'
      }
      wholecol = $(this).find('.panel.wholecol')
      others = $(this).find('.panel').not('.wholecol')
      if (wholecol.length && others.length) {
        others.appendTo($('.' + dest))
      }
    })
    scrollChat()
    // $('.wholecol').each(function () {
    //   console.log('1234')
    //   let col = $(this).parent('.col')[0].classList[1]
    //   let panelsToMove = col.find('.panel').not('.wholecol')
    //   if (panelsToMove.length) {
    //     panelsToMove.appendTo($(e.from))
    //   }
    // })
    // if (item.className == 'panel chat') {
    //   console.log('23423052950')
    //   console.log(e.target.className)
    //   let s = '.' + e.target.className.replace(' ', '.') + ' > .panel'
    //   console.log(s)
    //   //move items in column to "from"
    //   $(s).not('.chat').appendTo($(e.from))
    // }
    // console.log('hi')
  }

  $('.col1').sortable({
    group: 'cols',
    swap: true,
    animation: 100,
    handle: '.panel-title',
    onEnd: sortCols,
  })

  $('.col2').sortable({
    group: 'cols',
    swap: true,
    animation: 100,
    handle: '.panel-title',
    onEnd: sortCols,
  })

  $('.col3').sortable({
    group: 'cols',
    swap: true,
    animation: 100,
    handle: '.panel-title',
    onEnd: sortCols,
  })

  function resizeCalendar() {
    let targetWidth = $('.scrollable-content-wrapper')[0].scrollWidth
  }

  // SOUNDS

  $('[js-task-checkbox]').change(function () {
    let click = this.checked ? 'taskCheck' : 'taskUncheck'
    playSound(click)
  })

  // HOTKEYS

  /* hotkeys('shift+left', function (event, handler) {
    toggle_sidebar('left')
  }) */
  // hotkeys('shift+right', function (event, handler) {
  //   toggle_sidebar('right')
  // })
  // hotkeys('shift+up', function (event, handler) {
  //   $('[js-nav="calendar"]').click()
  // })
  /* hotkeys('shift+down', function (event, handler) {
    toggle_sidebar('right')
    toggle_sidebar('left')
  }) */
  /* hotkeys('shift+c', function (event, handler) {
    $('[js-nav="calendar"]').click()
  })
  hotkeys('shift+m', function (event, handler) {
    $('[js-nav="mail"]').click()
  })
  hotkeys('shift+t', function (event, handler) {
    addPanel()
  }) */

  // OTHER BINDINGS

  /* const node = document.getElementsByClassName('chat-message-box')[0]
  node.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      $('[js-send-message]').click()
    }
  }) */
})
