/*!
 * sweetalert2 v5.3.5
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Sweetalert2 = factory());
}(this, function () { 'use strict';

  var swalPrefix = 'swal2-'

  var prefix = function (items) {
    var result = {}
    for (var i in items) {
      result[items[i]] = swalPrefix + items[i]
    }
    return result
  }

  var swalClasses = prefix([
    'container',
    'in',
    'iosfix',
    'modal',
    'overlay',
    'fade',
    'show',
    'hide',
    'noanimation',
    'close',
    'content',
    'spacer',
    'confirm',
    'cancel',
    'icon',
    'image',
    'input',
    'file',
    'range',
    'select',
    'radio',
    'checkbox',
    'textarea',
    'inputerror',
    'validationerror',
    'progresssteps',
    'activeprogressstep',
    'progresscircle',
    'progressline',
    'loading',
    'styled'
  ])

  var iconTypes = prefix([
    'success',
    'warning',
    'info',
    'question',
    'error'
  ])

  var defaultParams = {
    title: '',
    text: '',
    html: '',
    type: null,
    customClass: '',
    animation: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    showConfirmButton: true,
    showCancelButton: false,
    preConfirm: null,
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
    confirmButtonClass: null,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#aaa',
    cancelButtonClass: null,
    buttonsStyling: true,
    reverseButtons: false,
    focusCancel: false,
    showCloseButton: false,
    showLoaderOnConfirm: false,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    imageClass: null,
    timer: null,
    width: 500,
    padding: 20,
    background: '#fff',
    input: null,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputClass: null,
    inputAttributes: {},
    inputValidator: null,
    progressSteps: [],
    currentProgressStep: null,
    progressStepsDistance: '40px',
    onOpen: null,
    onClose: null
  }

  var sweetHTML = '<div class="' + swalClasses.modal + '" style="display: none" tabIndex="-1">' +
      '<ul class="' + swalClasses.progresssteps + '"></ul>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.error + '">' +
        '<span class="x-mark"><span class="line left"></span><span class="line right"></span></span>' +
      '</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.success + '">' +
        '<span class="line tip"></span> <span class="line long"></span>' +
        '<div class="placeholder"></div> <div class="fix"></div>' +
      '</div>' +
      '<img class="' + swalClasses.image + '">' +
      '<h2></h2>' +
      '<div class="' + swalClasses.content + '"></div>' +
      '<input class="' + swalClasses.input + '">' +
      '<input type="file" class="' + swalClasses.file + '">' +
      '<div class="' + swalClasses.range + '">' +
        '<output></output>' +
        '<input type="range">' +
      '</div>' +
      '<select class="' + swalClasses.select + '"></select>' +
      '<div class="' + swalClasses.radio + '"></div>' +
      '<label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">' +
        '<input type="checkbox">' +
      '</label>' +
      '<textarea class="' + swalClasses.textarea + '"></textarea>' +
      '<div class="' + swalClasses.validationerror + '"></div>' +
      '<hr class="' + swalClasses.spacer + '">' +
      '<button type="button" class="' + swalClasses.confirm + '">OK</button>' +
      '<button type="button" class="' + swalClasses.cancel + '">Cancel</button>' +
      '<span class="' + swalClasses.close + '">&times;</span>' +
    '</div>'

  var sweetContainer

  var existingSweetContainers = document.getElementsByClassName(swalClasses.container)

  if (existingSweetContainers.length) {
    sweetContainer = existingSweetContainers[0]
  } else {
    sweetContainer = document.createElement('div')
    sweetContainer.className = swalClasses.container
    sweetContainer.innerHTML = sweetHTML
  }

  var extend = function (a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key]
      }
    }

    return a
  }

  /*
   * Set hover, active and focus-states for buttons (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
   */
  var colorLuminance = function (hex, lum) {
    // Validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    lum = lum || 0

    // Convert to decimal and change luminosity
    var rgb = '#'
    for (var i = 0; i < 3; i++) {
      var c = parseInt(hex.substr(i * 2, 2), 16)
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
      rgb += ('00' + c).substr(c.length)
    }

    return rgb
  }

  // Remember state in cases where opening and handling a modal will fiddle with it.
  var states = {
    previousWindowKeyDown: null,
    previousActiveElement: null,
    previousBodyPadding: null
  }

  /*
   * Add modal + overlay to DOM
   */
  var init = function () {
    if (typeof document === 'undefined') {
      console.error('SweetAlert2 requires document to initialize')
      return
    } else if (document.getElementsByClassName(swalClasses.container).length) {
      return
    }

    document.body.appendChild(sweetContainer)

    var modal = getModal()
    var input = getChildByClass(modal, swalClasses.input)
    var file = getChildByClass(modal, swalClasses.file)
    var range = modal.querySelector('.' + swalClasses.range + ' input')
    var select = getChildByClass(modal, swalClasses.select)
    var checkbox = modal.querySelector('.' + swalClasses.checkbox + ' input')
    var textarea = getChildByClass(modal, swalClasses.textarea)

    input.oninput = function () {
      sweetAlert.resetValidationError()
    }

    input.onkeyup = function (event) {
      event.stopPropagation()
      if (event.keyCode === 13) {
        sweetAlert.clickConfirm()
      }
    }

    file.onchange = function () {
      sweetAlert.resetValidationError()
    }

    range.oninput = function () {
      sweetAlert.resetValidationError()
      range.previousSibling.value = range.value
    }

    range.onchange = function () {
      sweetAlert.resetValidationError()
      range.previousSibling.value = range.value
    }

    select.onchange = function () {
      sweetAlert.resetValidationError()
    }

    checkbox.onchange = function () {
      sweetAlert.resetValidationError()
    }

    textarea.oninput = function () {
      sweetAlert.resetValidationError()
    }

    return modal
  }

  /*
   * Manipulate DOM
   */
  var elementByClass = function (className) {
    return sweetContainer.querySelector('.' + className)
  }

  var getModal = function () {
    return document.body.querySelector('.' + swalClasses.modal) || init()
  }

  var getIcons = function () {
    var modal = getModal()
    return modal.querySelectorAll('.' + swalClasses.icon)
  }

  var getSpacer = function () {
    return elementByClass(swalClasses.spacer)
  }

  var getProgressSteps = function () {
    return elementByClass(swalClasses.progresssteps)
  }

  var getValidationError = function () {
    return elementByClass(swalClasses.validationerror)
  }

  var getConfirmButton = function () {
    return elementByClass(swalClasses.confirm)
  }

  var getCancelButton = function () {
    return elementByClass(swalClasses.cancel)
  }

  var getCloseButton = function () {
    return elementByClass(swalClasses.close)
  }

  var getFocusableElements = function (focusCancel) {
    var buttons = [getConfirmButton(), getCancelButton()]
    if (focusCancel) {
      buttons.reverse()
    }
    return buttons.concat(Array.prototype.slice.call(
      getModal().querySelectorAll('button:not([class^=' + swalPrefix + ']), input:not([type=hidden]), textarea, select')
    ))
  }

  var hasClass = function (elem, className) {
    return elem.classList.contains(className)
  }

  var focusInput = function (input) {
    input.focus()

    // place cursor at end of text in text input
    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915/1331425
      var val = input.value
      input.value = ''
      input.value = val
    }
  }

  var addClass = function (elem, className) {
    if (!elem || !className) {
      return
    }
    var classes = className.split(/\s+/)
    classes.forEach(function (className) {
      elem.classList.add(className)
    })
  }

  var removeClass = function (elem, className) {
    if (!elem || !className) {
      return
    }
    var classes = className.split(/\s+/)
    classes.forEach(function (className) {
      elem.classList.remove(className)
    })
  }

  var getChildByClass = function (elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i]
      }
    }
  }

  var show = function (elem, display) {
    if (!display) {
      display = 'block'
    }
    elem.style.opacity = ''
    elem.style.display = display
  }

  var hide = function (elem) {
    elem.style.opacity = ''
    elem.style.display = 'none'
  }

  var empty = function (elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild)
    }
  }

  // borrowed from jqeury $(elem).is(':visible') implementation
  var isVisible = function (elem) {
    return elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length
  }

  var removeStyleProperty = function (elem, property) {
    if (elem.style.removeProperty) {
      elem.style.removeProperty(property)
    } else {
      elem.style.removeAttribute(property)
    }
  }

  var fireClick = function (node) {
    // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
    // Then fixed for today's Chrome browser.
    if (typeof MouseEvent === 'function') {
      // Up-to-date approach
      var mevt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
      })
      node.dispatchEvent(mevt)
    } else if (document.createEvent) {
      // Fallback
      var evt = document.createEvent('MouseEvents')
      evt.initEvent('click', false, false)
      node.dispatchEvent(evt)
    } else if (document.createEventObject) {
      node.fireEvent('onclick')
    } else if (typeof node.onclick === 'function') {
      node.onclick()
    }
  }

  var stopEventPropagation = function (e) {
    // In particular, make sure the space bar doesn't scroll the main window.
    if (typeof e.stopPropagation === 'function') {
      e.stopPropagation()
      e.preventDefault()
    } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
      window.event.cancelBubble = true
    }
  }

  var animationEndEvent = (function () {
    var testEl = document.createElement('div')
    var transEndEventNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd oanimationend',
      'msAnimation': 'MSAnimationEnd',
      'animation': 'animationend'
    }
    for (var i in transEndEventNames) {
      if (transEndEventNames.hasOwnProperty(i) &&
        testEl.style[i] !== undefined) {
        return transEndEventNames[i]
      }
    }

    return false
  })()

  // Reset the page to its previous state
  var resetPrevState = function () {
    var modal = getModal()
    window.onkeydown = states.previousWindowKeyDown
    if (states.previousActiveElement && states.previousActiveElement.focus) {
      states.previousActiveElement.focus()
    }
    clearTimeout(modal.timeout)
  }

  // Measure width of scrollbar
  // https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
  var measureScrollbar = function () {
    var scrollDiv = document.createElement('div')
    scrollDiv.style.width = '50px'
    scrollDiv.style.height = '50px'
    scrollDiv.style.overflow = 'scroll'
    document.body.appendChild(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
  }

  // JavaScript Debounce Function
  // https://davidwalsh.name/javascript-debounce-function
  var debounce = function (func, wait, immediate) {
    var timeout
    return function () {
      var context = this
      var args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  var modalParams = extend({}, defaultParams)
  var queue = []
  var swal2Observer

  /*
   * Set type, text and actions on modal
   */
  var setParameters = function (params) {
    var modal = getModal()

    for (var param in params) {
      if (!defaultParams.hasOwnProperty(param) && param !== 'extraParams') {
        console.warn('SweetAlert2: Unknown parameter "' + param + '"')
      }
    }

    // set modal width and margin-left
    modal.style.width = (typeof params.width === 'number') ? params.width + 'px' : params.width

    modal.style.padding = params.padding + 'px'
    modal.style.background = params.background

    var $title = modal.querySelector('h2')
    var $content = modal.querySelector('.' + swalClasses.content)
    var $confirmBtn = getConfirmButton()
    var $cancelBtn = getCancelButton()
    var $closeButton = modal.querySelector('.' + swalClasses.close)

    // Title
    $title.innerHTML = params.title.split('\n').join('<br>')

    // Content
    var i
    if (params.text || params.html) {
      if (typeof params.html === 'object') {
        $content.innerHTML = ''
        if (0 in params.html) {
          for (i = 0; i in params.html; i++) {
            $content.appendChild(params.html[i].cloneNode(true))
          }
        } else {
          $content.appendChild(params.html.cloneNode(true))
        }
      } else {
        $content.innerHTML = params.html || (params.text.split('\n').join('<br>'))
      }
      show($content)
    } else {
      hide($content)
    }

    // Close button
    if (params.showCloseButton) {
      show($closeButton)
    } else {
      hide($closeButton)
    }

    // Custom Class
    modal.className = swalClasses.modal
    if (params.customClass) {
      addClass(modal, params.customClass)
    }

    // Progress steps
    var progressStepsContainer = getProgressSteps()
    var currentProgressStep = parseInt(params.currentProgressStep === null ? sweetAlert.getQueueStep() : params.currentProgressStep, 10)
    if (params.progressSteps.length) {
      show(progressStepsContainer)
      empty(progressStepsContainer)
      if (currentProgressStep >= params.progressSteps.length) {
        console.warn(
          'SweetAlert2: Invalid currentProgressStep parameter, it should be less than progressSteps.length ' +
          '(currentProgressStep like JS arrays starts from 0)'
        )
      }
      params.progressSteps.forEach(function (step, index) {
        var circle = document.createElement('li')
        addClass(circle, swalClasses.progresscircle)
        circle.innerHTML = step
        if (index === currentProgressStep) {
          addClass(circle, swalClasses.activeprogressstep)
        }
        progressStepsContainer.appendChild(circle)
        if (index !== params.progressSteps.length - 1) {
          var line = document.createElement('li')
          addClass(line, swalClasses.progressline)
          line.style.width = params.progressStepsDistance
          progressStepsContainer.appendChild(line)
        }
      })
    } else {
      hide(progressStepsContainer)
    }

    // Icon
    var icons = getIcons()
    for (i = 0; i < icons.length; i++) {
      hide(icons[i])
    }
    if (params.type) {
      var validType = false
      for (var iconType in iconTypes) {
        if (params.type === iconType) {
          validType = true
          break
        }
      }
      if (!validType) {
        console.error('SweetAlert2: Unknown alert type: ' + params.type)
        return false
      }
      var $icon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type])
      show($icon)

      // Animate icon
      switch (params.type) {
        case 'success':
          addClass($icon, 'animate')
          addClass($icon.querySelector('.tip'), 'animate-success-tip')
          addClass($icon.querySelector('.long'), 'animate-success-long')
          break
        case 'error':
          addClass($icon, 'animate-error-icon')
          addClass($icon.querySelector('.x-mark'), 'animate-x-mark')
          break
        case 'warning':
          addClass($icon, 'pulse-warning')
          break
        default:
          break
      }
    }

    // Custom image
    var $customImage = modal.querySelector('.' + swalClasses.image)
    if (params.imageUrl) {
      $customImage.setAttribute('src', params.imageUrl)
      show($customImage)

      if (params.imageWidth) {
        $customImage.setAttribute('width', params.imageWidth)
      } else {
        $customImage.removeAttribute('width')
      }

      if (params.imageHeight) {
        $customImage.setAttribute('height', params.imageHeight)
      } else {
        $customImage.removeAttribute('height')
      }

      $customImage.className = swalClasses.image
      if (params.imageClass) {
        addClass($customImage, params.imageClass)
      }
    } else {
      hide($customImage)
    }

    // Cancel button
    if (params.showCancelButton) {
      $cancelBtn.style.display = 'inline-block'
    } else {
      hide($cancelBtn)
    }

    // Confirm button
    if (params.showConfirmButton) {
      removeStyleProperty($confirmBtn, 'display')
    } else {
      hide($confirmBtn)
    }

    // Buttons spacer
    var spacer = getSpacer()
    if (!params.showConfirmButton && !params.showCancelButton) {
      hide(spacer)
    } else {
      show(spacer)
    }

    // Edit text on cancel and confirm buttons
    $confirmBtn.innerHTML = params.confirmButtonText
    $cancelBtn.innerHTML = params.cancelButtonText

    // Set buttons to selected background colors
    if (params.buttonsStyling) {
      $confirmBtn.style.backgroundColor = params.confirmButtonColor
      $cancelBtn.style.backgroundColor = params.cancelButtonColor
    }

    // Add buttons custom classes
    $confirmBtn.className = swalClasses.confirm
    addClass($confirmBtn, params.confirmButtonClass)
    $cancelBtn.className = swalClasses.cancel
    addClass($cancelBtn, params.cancelButtonClass)

    // Buttons styling
    if (params.buttonsStyling) {
      addClass($confirmBtn, swalClasses.styled)
      addClass($cancelBtn, swalClasses.styled)
    } else {
      removeClass($confirmBtn, swalClasses.styled)
      removeClass($cancelBtn, swalClasses.styled)

      $confirmBtn.style.backgroundColor = $confirmBtn.style.borderLeftColor = $confirmBtn.style.borderRightColor = ''
      $cancelBtn.style.backgroundColor = $cancelBtn.style.borderLeftColor = $cancelBtn.style.borderRightColor = ''
    }

    // CSS animation
    if (params.animation === true) {
      removeClass(modal, swalClasses.noanimation)
    } else {
      addClass(modal, swalClasses.noanimation)
    }
  }

  /*
   * Animations
   */
  var openModal = function (animation, onComplete) {
    var modal = getModal()
    if (animation) {
      addClass(modal, swalClasses.show)
      addClass(sweetContainer, swalClasses.fade)
      removeClass(modal, swalClasses.hide)
    } else {
      removeClass(modal, swalClasses.fade)
    }
    show(modal)

    // scrolling is 'hidden' until animation is done, after that 'auto'
    sweetContainer.style.overflowY = 'hidden'
    if (animationEndEvent && !hasClass(modal, swalClasses.noanimation)) {
      modal.addEventListener(animationEndEvent, function swalCloseEventFinished () {
        modal.removeEventListener(animationEndEvent, swalCloseEventFinished)
        sweetContainer.style.overflowY = 'auto'
      })
    } else {
      sweetContainer.style.overflowY = 'auto'
    }

    addClass(sweetContainer, swalClasses.in)
    addClass(document.body, swalClasses.in)
    fixScrollbar()
    iOSfix()
    states.previousActiveElement = document.activeElement
    if (onComplete !== null && typeof onComplete === 'function') {
      onComplete.call(this, modal)
    }
  }

  function fixScrollbar () {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return
    }
    // if the body has overflow
    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = document.body.style.paddingRight
      document.body.style.paddingRight = measureScrollbar() + 'px'
    }
  }

  function undoScrollbar () {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = states.previousBodyPadding
      states.previousBodyPadding = null
    }
  }

  // Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
  function iOSfix () {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      var offset = document.body.scrollTop
      document.body.style.top = (offset * -1) + 'px'
      addClass(document.body, swalClasses.iosfix)
    }
  }

  function undoIOSfix () {
    if (hasClass(document.body, swalClasses.iosfix)) {
      var offset = parseInt(document.body.style.top, 10)
      removeClass(document.body, swalClasses.iosfix)
      document.body.scrollTop = (offset * -1)
    }
  }

  function modalDependant () {
    if (arguments[0] === undefined) {
      console.error('SweetAlert2 expects at least 1 attribute!')
      return false
    }

    var params = extend({}, modalParams)

    switch (typeof arguments[0]) {

      case 'string':
        params.title = arguments[0]
        params.text = arguments[1] || ''
        params.type = arguments[2] || ''

        break

      case 'object':
        extend(params, arguments[0])
        params.extraParams = arguments[0].extraParams

        if (params.input === 'email' && params.inputValidator === null) {
          params.inputValidator = function (email) {
            return new Promise(function (resolve, reject) {
              var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
              if (emailRegex.test(email)) {
                resolve()
              } else {
                reject('Invalid email address')
              }
            })
          }
        }

        break

      default:
        console.error('SweetAlert2: Unexpected type of argument! Expected "string" or "object", got ' + typeof arguments[0])
        return false
    }

    setParameters(params)

    // Modal interactions
    var modal = getModal()

    return new Promise(function (resolve, reject) {
      // Close on timer
      if (params.timer) {
        modal.timeout = setTimeout(function () {
          sweetAlert.closeModal(params.onClose)
          reject('timer')
        }, params.timer)
      }

      // Get input element by specified type or, if type isn't specified, by params.input
      var getInput = function (inputType) {
        inputType = inputType || params.input
        switch (inputType) {
          case 'select':
          case 'textarea':
          case 'file':
            return getChildByClass(modal, swalClasses[inputType])
          case 'checkbox':
            return modal.querySelector('.' + swalClasses.checkbox + ' input')
          case 'radio':
            return modal.querySelector('.' + swalClasses.radio + ' input:checked') ||
              modal.querySelector('.' + swalClasses.radio + ' input:first-child')
          case 'range':
            return modal.querySelector('.' + swalClasses.range + ' input')
          default:
            return getChildByClass(modal, swalClasses.input)
        }
      }

      // Get the value of the modal input
      var getInputValue = function () {
        var input = getInput()
        if (!input) {
          return null
        }
        switch (params.input) {
          case 'checkbox':
            return input.checked ? 1 : 0
          case 'radio':
            return input.checked ? input.value : null
          case 'file':
            return input.files.length ? input.files[0] : null
          default:
            return params.inputAutoTrim ? input.value.trim() : input.value
        }
      }

      // input autofocus
      if (params.input) {
        setTimeout(function () {
          var input = getInput()
          if (input) {
            focusInput(input)
          }
        }, 0)
      }

      var confirm = function (value) {
        if (params.showLoaderOnConfirm) {
          sweetAlert.showLoading()
        }

        if (params.preConfirm) {
          params.preConfirm(value, params.extraParams).then(
            function (preConfirmValue) {
              sweetAlert.closeModal(params.onClose)
              resolve(preConfirmValue || value)
            },
            function (error) {
              sweetAlert.hideLoading()
              if (error) {
                sweetAlert.showValidationError(error)
              }
            }
          )
        } else {
          sweetAlert.closeModal(params.onClose)
          resolve(value)
        }
      }

      // Mouse interactions
      var onButtonEvent = function (event) {
        var e = event || window.event
        var target = e.target || e.srcElement
        var confirmBtn = getConfirmButton()
        var cancelBtn = getCancelButton()
        var targetedConfirm = confirmBtn === target || confirmBtn.contains(target)
        var targetedCancel = cancelBtn === target || cancelBtn.contains(target)

        switch (e.type) {
          case 'mouseover':
          case 'mouseup':
            if (params.buttonsStyling) {
              if (targetedConfirm) {
                confirmBtn.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.1)
              } else if (targetedCancel) {
                cancelBtn.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.1)
              }
            }
            break
          case 'mouseout':
            if (params.buttonsStyling) {
              if (targetedConfirm) {
                confirmBtn.style.backgroundColor = params.confirmButtonColor
              } else if (targetedCancel) {
                cancelBtn.style.backgroundColor = params.cancelButtonColor
              }
            }
            break
          case 'mousedown':
            if (params.buttonsStyling) {
              if (targetedConfirm) {
                confirmBtn.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.2)
              } else if (targetedCancel) {
                cancelBtn.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.2)
              }
            }
            break
          case 'click':
            // Clicked 'confirm'
            if (targetedConfirm && sweetAlert.isVisible()) {
              if (params.input) {
                var inputValue = getInputValue()

                if (params.inputValidator) {
                  sweetAlert.disableInput()
                  params.inputValidator(inputValue, params.extraParams).then(
                    function () {
                      sweetAlert.enableInput()
                      confirm(inputValue)
                    },
                    function (error) {
                      sweetAlert.enableInput()
                      if (error) {
                        sweetAlert.showValidationError(error)
                      }
                    }
                  )
                } else {
                  confirm(inputValue)
                }
              } else {
                confirm(true)
              }

            // Clicked 'cancel'
            } else if (targetedCancel && sweetAlert.isVisible()) {
              sweetAlert.closeModal(params.onClose)
              reject('cancel')
            }

            break
          default:
        }
      }

      var $buttons = modal.querySelectorAll('button')
      var i
      for (i = 0; i < $buttons.length; i++) {
        $buttons[i].onclick = onButtonEvent
        $buttons[i].onmouseover = onButtonEvent
        $buttons[i].onmouseout = onButtonEvent
        $buttons[i].onmousedown = onButtonEvent
      }

      // Closing modal by close button
      getCloseButton().onclick = function () {
        sweetAlert.closeModal(params.onClose)
        reject('close')
      }

      // Closing modal by overlay click
      sweetContainer.onclick = function (e) {
        if (e.target !== sweetContainer) {
          return
        }
        if (params.allowOutsideClick) {
          sweetAlert.closeModal(params.onClose)
          reject('overlay')
        }
      }

      var $confirmButton = getConfirmButton()
      var $cancelButton = getCancelButton()

      // Reverse buttons if neede d
      if (params.reverseButtons) {
        $confirmButton.parentNode.insertBefore($cancelButton, $confirmButton)
      } else {
        $confirmButton.parentNode.insertBefore($confirmButton, $cancelButton)
      }

      // Focus handling
      function setFocus (index, increment) {
        var focusableElements = getFocusableElements(params.focusCancel)
        // search for visible elements and select the next possible match
        for (var i = 0; i < focusableElements.length; i++) {
          index = index + increment

          // rollover to first item
          if (index === focusableElements.length) {
            index = 0

          // go to last item
          } else if (index === -1) {
            index = focusableElements.length - 1
          }

          // determine if element is visible
          var el = focusableElements[index]
          if (isVisible(el)) {
            return el.focus()
          }
        }
      }

      function handleKeyDown (event) {
        var e = event || window.event
        var keyCode = e.keyCode || e.which

        if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
          // Don't do work on keys we don't care about.
          return
        }

        var $targetElement = e.target || e.srcElement

        var focusableElements = getFocusableElements(params.focusCancel)
        var btnIndex = -1 // Find the button - note, this is a nodelist, not an array.
        for (var i = 0; i < focusableElements.length; i++) {
          if ($targetElement === focusableElements[i]) {
            btnIndex = i
            break
          }
        }

        // TAB
        if (keyCode === 9) {
          if (!e.shiftKey) {
            // Cycle to the next button
            setFocus(btnIndex, 1)
          } else {
            // Cycle to the prev button
            setFocus(btnIndex, -1)
          }

          stopEventPropagation(e)
        } else {
          if (keyCode === 13 || keyCode === 32) {
            if (btnIndex === -1) {
              // ENTER/SPACE clicked outside of a button.
              if (params.focusCancel) {
                fireClick($cancelButton, e)
              } else {
                fireClick($confirmButton, e)
              }
            }
          } else if (keyCode === 27 && params.allowEscapeKey === true) {
            sweetAlert.closeModal(params.onClose)
            reject('esc')
          }
        }
      }

      states.previousWindowKeyDown = window.onkeydown
      window.onkeydown = handleKeyDown

      // Loading state
      if (params.buttonsStyling) {
        $confirmButton.style.borderLeftColor = params.confirmButtonColor
        $confirmButton.style.borderRightColor = params.confirmButtonColor
      }

      /**
       * Show spinner instead of Confirm button and disable Cancel button
       */
      sweetAlert.showLoading = sweetAlert.enableLoading = function () {
        show(getSpacer())
        show($confirmButton, 'inline-block')
        addClass($confirmButton, swalClasses.loading)
        addClass(modal, swalClasses.loading)
        $confirmButton.disabled = true
        $cancelButton.disabled = true
      }

      /**
       * Show spinner instead of Confirm button and disable Cancel button
       */
      sweetAlert.hideLoading = sweetAlert.disableLoading = function () {
        if (!params.showConfirmButton) {
          hide($confirmButton)
          if (!params.showCancelButton) {
            hide(getSpacer())
          }
        }
        removeClass($confirmButton, swalClasses.loading)
        removeClass(modal, swalClasses.loading)
        $confirmButton.disabled = false
        $cancelButton.disabled = false
      }

      sweetAlert.enableButtons = function () {
        $confirmButton.disabled = false
        $cancelButton.disabled = false
      }

      sweetAlert.disableButtons = function () {
        $confirmButton.disabled = true
        $cancelButton.disabled = true
      }

      sweetAlert.enableConfirmButton = function () {
        $confirmButton.disabled = false
      }

      sweetAlert.disableConfirmButton = function () {
        $confirmButton.disabled = true
      }

      sweetAlert.enableInput = function () {
        var input = getInput()
        if (!input) {
          return false
        }
        if (input.type === 'radio') {
          var radiosContainer = input.parentNode.parentNode
          var radios = radiosContainer.querySelectorAll('input')
          for (var i = 0; i < radios.length; i++) {
            radios[i].disabled = false
          }
        } else {
          input.disabled = false
        }
      }

      sweetAlert.disableInput = function () {
        var input = getInput()
        if (!input) {
          return false
        }
        if (input && input.type === 'radio') {
          var radiosContainer = input.parentNode.parentNode
          var radios = radiosContainer.querySelectorAll('input')
          for (var i = 0; i < radios.length; i++) {
            radios[i].disabled = true
          }
        } else {
          input.disabled = true
        }
      }

      // Set modal min-height to disable scrolling inside the modal
      sweetAlert.recalculateHeight = debounce(function () {
        var modal = getModal()
        var prevState = modal.style.display
        modal.style.minHeight = ''
        show(modal)
        modal.style.minHeight = (modal.scrollHeight + 1) + 'px'
        modal.style.display = prevState
      }, 50)

      // Show block with validation error
      sweetAlert.showValidationError = function (error) {
        var validationError = getValidationError()
        validationError.innerHTML = error
        show(validationError)

        var input = getInput()
        focusInput(input)
        addClass(input, swalClasses.inputerror)
      }

      // Hide block with validation error
      sweetAlert.resetValidationError = function () {
        var validationError = getValidationError()
        hide(validationError)
        sweetAlert.recalculateHeight()

        var input = getInput()
        if (input) {
          removeClass(input, swalClasses.inputerror)
        }
      }

      sweetAlert.getProgressSteps = function () {
        return params.progressSteps
      }

      sweetAlert.setProgressSteps = function (progressSteps) {
        params.progressSteps = progressSteps
        setParameters(params)
      }

      sweetAlert.showProgressSteps = function () {
        show(getProgressSteps())
      }

      sweetAlert.hideProgressSteps = function () {
        hide(getProgressSteps())
      }

      sweetAlert.enableButtons()
      sweetAlert.hideLoading()
      sweetAlert.resetValidationError()

      // inputs
      var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea']
      var input
      for (i = 0; i < inputTypes.length; i++) {
        var inputClass = swalClasses[inputTypes[i]]
        var inputContainer = getChildByClass(modal, inputClass)
        input = getInput(inputTypes[i])

        // set attributes
        if (input) {
          for (var j in input.attributes) {
            if (input.attributes.hasOwnProperty(j)) {
              var attrName = input.attributes[j].name
              if (attrName !== 'type' && attrName !== 'value') {
                input.removeAttribute(attrName)
              }
            }
          }
          for (var attr in params.inputAttributes) {
            input.setAttribute(attr, params.inputAttributes[attr])
          }
        }

        // set class
        inputContainer.className = inputClass
        if (params.inputClass) {
          addClass(inputContainer, params.inputClass)
        }

        hide(inputContainer)
      }

      var populateInputOptions
      switch (params.input) {
        case 'text':
        case 'email':
        case 'password':
        case 'number':
        case 'tel':
          input = getChildByClass(modal, swalClasses.input)
          input.value = params.inputValue
          input.placeholder = params.inputPlaceholder
          input.type = params.input
          show(input)
          break
        case 'file':
          input = getChildByClass(modal, swalClasses.file)
          input.placeholder = params.inputPlaceholder
          input.type = params.input
          show(input)
          break
        case 'range':
          var range = getChildByClass(modal, swalClasses.range)
          var rangeInput = range.querySelector('input')
          var rangeOutput = range.querySelector('output')
          rangeInput.value = params.inputValue
          rangeInput.type = params.input
          rangeOutput.value = params.inputValue
          show(range)
          break
        case 'select':
          var select = getChildByClass(modal, swalClasses.select)
          select.innerHTML = ''
          if (params.inputPlaceholder) {
            var placeholder = document.createElement('option')
            placeholder.innerHTML = params.inputPlaceholder
            placeholder.value = ''
            placeholder.disabled = true
            placeholder.selected = true
            select.appendChild(placeholder)
          }
          populateInputOptions = function (inputOptions) {
            for (var optionValue in inputOptions) {
              var option = document.createElement('option')
              option.value = optionValue
              option.innerHTML = inputOptions[optionValue]
              if (params.inputValue === optionValue) {
                option.selected = true
              }
              select.appendChild(option)
            }
            show(select)
            select.focus()
          }
          break
        case 'radio':
          var radio = getChildByClass(modal, swalClasses.radio)
          radio.innerHTML = ''
          populateInputOptions = function (inputOptions) {
            for (var radioValue in inputOptions) {
              var id = 1
              var radioInput = document.createElement('input')
              var radioLabel = document.createElement('label')
              var radioLabelSpan = document.createElement('span')
              radioInput.type = 'radio'
              radioInput.name = swalClasses.radio
              radioInput.value = radioValue
              radioInput.id = swalClasses.radio + '-' + (id++)
              if (params.inputValue === radioValue) {
                radioInput.checked = true
              }
              radioLabelSpan.innerHTML = inputOptions[radioValue]
              radioLabel.appendChild(radioInput)
              radioLabel.appendChild(radioLabelSpan)
              radioLabel.for = radioInput.id
              radio.appendChild(radioLabel)
            }
            show(radio)
            var radios = radio.querySelectorAll('input')
            if (radios.length) {
              radios[0].focus()
            }
          }
          break
        case 'checkbox':
          var checkbox = getChildByClass(modal, swalClasses.checkbox)
          var checkboxInput = getInput('checkbox')
          checkboxInput.type = 'checkbox'
          checkboxInput.value = 1
          checkboxInput.id = swalClasses.checkbox
          checkboxInput.checked = Boolean(params.inputValue)
          var label = checkbox.getElementsByTagName('span')
          if (label.length) {
            checkbox.removeChild(label[0])
          }
          label = document.createElement('span')
          label.innerHTML = params.inputPlaceholder
          checkbox.appendChild(label)
          show(checkbox)
          break
        case 'textarea':
          var textarea = getChildByClass(modal, swalClasses.textarea)
          textarea.value = params.inputValue
          textarea.placeholder = params.inputPlaceholder
          show(textarea)
          break
        case null:
          break
        default:
          console.error('SweetAlert2: Unexpected type of input! Expected "text" or "email" or "password", "select", "checkbox", "textarea" or "file", got "' + params.input + '"')
          break
      }

      if (params.input === 'select' || params.input === 'radio') {
        if (params.inputOptions instanceof Promise) {
          sweetAlert.showLoading()
          params.inputOptions.then(function (inputOptions) {
            sweetAlert.hideLoading()
            populateInputOptions(inputOptions)
          })
        } else if (typeof params.inputOptions === 'object') {
          populateInputOptions(params.inputOptions)
        } else {
          console.error('SweetAlert2: Unexpected type of inputOptions! Expected object or Promise, got ' + typeof params.inputOptions)
        }
      }

      openModal(params.animation, params.onOpen)

      // Focus the first element (input or button)
      setFocus(-1, 1)

      // fix scroll
      sweetContainer.scrollTop = 0

      // Observe changes inside the modal and adjust height
      if (typeof MutationObserver !== 'undefined' && !swal2Observer) {
        swal2Observer = new MutationObserver(sweetAlert.recalculateHeight)
        swal2Observer.observe(modal, {childList: true, characterData: true, subtree: true})
      }
    })
  }

  // SweetAlert function
  function sweetAlert () {
    // Copy arguments to the local args variable
    var args = arguments

    if (sweetAlert.isVisible()) {
      sweetAlert.close()
    }

    return modalDependant.apply(this, args)
  }

  /*
   * Global function to determine if swal2 modal is visible
   */
  sweetAlert.isVisible = function () {
    var modal = getModal()
    return isVisible(modal)
  }

  /*
   * Global function for chaining sweetAlert modals
   */
  sweetAlert.queue = function (steps) {
    queue = steps
    var modal = getModal()
    var resetQueue = function () {
      queue = []
      modal.removeAttribute('data-queue-step')
    }
    return new Promise(function (resolve, reject) {
      (function step (i, callback) {
        if (i < queue.length) {
          modal.setAttribute('data-queue-step', i)

          sweetAlert(queue[i]).then(function () {
            step(i + 1, callback)
          }, function (dismiss) {
            resetQueue()
            reject(dismiss)
          })
        } else {
          resetQueue()
          resolve()
        }
      })(0)
    })
  }

  /*
   * Global function for getting the index of current modal in queue
   */
  sweetAlert.getQueueStep = function () {
    return getModal().getAttribute('data-queue-step')
  }

  /*
   * Global function for inserting a modal to the queue
   */
  sweetAlert.insertQueueStep = function (step, index) {
    if (index && index < queue.length) {
      return queue.splice(index, 0, step)
    }
    return queue.push(step)
  }

  /*
   * Global function for deleting a modal from the queue
   */
  sweetAlert.deleteQueueStep = function (index) {
    if (typeof queue[index] !== 'undefined') {
      queue.splice(index, 1)
    }
  }

  /*
   * Global function to close sweetAlert
   */
  sweetAlert.close = sweetAlert.closeModal = function (onComplete) {
    var modal = getModal()
    removeClass(modal, swalClasses.show)
    addClass(modal, swalClasses.hide)

    // Reset icon animations
    var $successIcon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes.success)
    removeClass($successIcon, 'animate')
    removeClass($successIcon.querySelector('.tip'), 'animate-success-tip')
    removeClass($successIcon.querySelector('.long'), 'animate-success-long')

    var $errorIcon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes.error)
    removeClass($errorIcon, 'animate-error-icon')
    removeClass($errorIcon.querySelector('.x-mark'), 'animate-x-mark')

    var $warningIcon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes.warning)
    removeClass($warningIcon, 'pulse-warning')

    resetPrevState()

    var hideModalAndResetState = function () {
      hide(modal)
      modal.style.minHeight = ''
      removeClass(sweetContainer, swalClasses.in)
      removeClass(document.body, swalClasses.in)
      undoScrollbar()
      undoIOSfix()
    }

    // If animation is supported, animate
    if (animationEndEvent && !hasClass(modal, swalClasses.noanimation)) {
      modal.addEventListener(animationEndEvent, function swalCloseEventFinished () {
        modal.removeEventListener(animationEndEvent, swalCloseEventFinished)
        if (hasClass(modal, swalClasses.hide)) {
          hideModalAndResetState()
        }
      })
    } else {
      // Otherwise, hide immediately
      hideModalAndResetState()
    }
    if (onComplete !== null && typeof onComplete === 'function') {
      onComplete.call(this, modal)
    }
  }

  /*
   * Global function to click 'Confirm' button
   */
  sweetAlert.clickConfirm = function () {
    getConfirmButton().click()
  }

  /*
   * Global function to click 'Cancel' button
   */
  sweetAlert.clickCancel = function () {
    getCancelButton().click()
  }

  /**
   * Set default params for each popup
   * @param {Object} userParams
   */
  sweetAlert.setDefaults = function (userParams) {
    if (!userParams) {
      throw new Error('userParams is required')
    }
    if (typeof userParams !== 'object') {
      throw new Error('userParams has to be a object')
    }

    extend(modalParams, userParams)
  }

  /**
   * Reset default params for each popup
   */
  sweetAlert.resetDefaults = function () {
    modalParams = extend({}, defaultParams)
  }

  sweetAlert.noop = function () { }

  sweetAlert.version = '5.3.5'

  if (typeof Promise === 'function') {
    Promise.prototype.done = Promise.prototype.done || function () { // eslint-disable-line
      return this.catch(function () {
        // Catch promise rejections silently.
        // https://github.com/limonte/sweetalert2/issues/177
      })
    }
  } else {
    console.warn('SweetAlert2: Please inlude Promise polyfill BEFORE including sweetalert2.js if IE10+ support needed.')
  }

  return sweetAlert;

}));
if (window.Sweetalert2) window.sweetAlert = window.swal = window.Sweetalert2;

/* Chartist.js 0.11.4
 * Copyright © 2019 Gion Kunz
 * Free to use under either the WTFPL license or the MIT license.
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
 */

!function(a,b){"function"==typeof define&&define.amd?define("Chartist",[],function(){return a.Chartist=b()}):"object"==typeof module&&module.exports?module.exports=b():a.Chartist=b()}(this,function(){var a={version:"0.11.4"};return function(a,b){"use strict";var c=a.window,d=a.document;b.namespaces={svg:"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/xmlns/",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",ct:"http://gionkunz.github.com/chartist-js/ct"},b.noop=function(a){return a},b.alphaNumerate=function(a){return String.fromCharCode(97+a%26)},b.extend=function(a){var c,d,e;for(a=a||{},c=1;c<arguments.length;c++){d=arguments[c];for(var f in d)e=d[f],"object"!=typeof e||null===e||e instanceof Array?a[f]=e:a[f]=b.extend(a[f],e)}return a},b.replaceAll=function(a,b,c){return a.replace(new RegExp(b,"g"),c)},b.ensureUnit=function(a,b){return"number"==typeof a&&(a+=b),a},b.quantity=function(a){if("string"==typeof a){var b=/^(\d+)\s*(.*)$/g.exec(a);return{value:+b[1],unit:b[2]||void 0}}return{value:a}},b.querySelector=function(a){return a instanceof Node?a:d.querySelector(a)},b.times=function(a){return Array.apply(null,new Array(a))},b.sum=function(a,b){return a+(b?b:0)},b.mapMultiply=function(a){return function(b){return b*a}},b.mapAdd=function(a){return function(b){return b+a}},b.serialMap=function(a,c){var d=[],e=Math.max.apply(null,a.map(function(a){return a.length}));return b.times(e).forEach(function(b,e){var f=a.map(function(a){return a[e]});d[e]=c.apply(null,f)}),d},b.roundWithPrecision=function(a,c){var d=Math.pow(10,c||b.precision);return Math.round(a*d)/d},b.precision=8,b.escapingMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"},b.serialize=function(a){return null===a||void 0===a?a:("number"==typeof a?a=""+a:"object"==typeof a&&(a=JSON.stringify({data:a})),Object.keys(b.escapingMap).reduce(function(a,c){return b.replaceAll(a,c,b.escapingMap[c])},a))},b.deserialize=function(a){if("string"!=typeof a)return a;a=Object.keys(b.escapingMap).reduce(function(a,c){return b.replaceAll(a,b.escapingMap[c],c)},a);try{a=JSON.parse(a),a=void 0!==a.data?a.data:a}catch(c){}return a},b.createSvg=function(a,c,d,e){var f;return c=c||"100%",d=d||"100%",Array.prototype.slice.call(a.querySelectorAll("svg")).filter(function(a){return a.getAttributeNS(b.namespaces.xmlns,"ct")}).forEach(function(b){a.removeChild(b)}),f=new b.Svg("svg").attr({width:c,height:d}).addClass(e),f._node.style.width=c,f._node.style.height=d,a.appendChild(f._node),f},b.normalizeData=function(a,c,d){var e,f={raw:a,normalized:{}};return f.normalized.series=b.getDataArray({series:a.series||[]},c,d),e=f.normalized.series.every(function(a){return a instanceof Array})?Math.max.apply(null,f.normalized.series.map(function(a){return a.length})):f.normalized.series.length,f.normalized.labels=(a.labels||[]).slice(),Array.prototype.push.apply(f.normalized.labels,b.times(Math.max(0,e-f.normalized.labels.length)).map(function(){return""})),c&&b.reverseData(f.normalized),f},b.safeHasProperty=function(a,b){return null!==a&&"object"==typeof a&&a.hasOwnProperty(b)},b.isDataHoleValue=function(a){return null===a||void 0===a||"number"==typeof a&&isNaN(a)},b.reverseData=function(a){a.labels.reverse(),a.series.reverse();for(var b=0;b<a.series.length;b++)"object"==typeof a.series[b]&&void 0!==a.series[b].data?a.series[b].data.reverse():a.series[b]instanceof Array&&a.series[b].reverse()},b.getDataArray=function(a,c,d){function e(a){if(b.safeHasProperty(a,"value"))return e(a.value);if(b.safeHasProperty(a,"data"))return e(a.data);if(a instanceof Array)return a.map(e);if(!b.isDataHoleValue(a)){if(d){var c={};return"string"==typeof d?c[d]=b.getNumberOrUndefined(a):c.y=b.getNumberOrUndefined(a),c.x=a.hasOwnProperty("x")?b.getNumberOrUndefined(a.x):c.x,c.y=a.hasOwnProperty("y")?b.getNumberOrUndefined(a.y):c.y,c}return b.getNumberOrUndefined(a)}}return a.series.map(e)},b.normalizePadding=function(a,b){return b=b||0,"number"==typeof a?{top:a,right:a,bottom:a,left:a}:{top:"number"==typeof a.top?a.top:b,right:"number"==typeof a.right?a.right:b,bottom:"number"==typeof a.bottom?a.bottom:b,left:"number"==typeof a.left?a.left:b}},b.getMetaData=function(a,b){var c=a.data?a.data[b]:a[b];return c?c.meta:void 0},b.orderOfMagnitude=function(a){return Math.floor(Math.log(Math.abs(a))/Math.LN10)},b.projectLength=function(a,b,c){return b/c.range*a},b.getAvailableHeight=function(a,c){return Math.max((b.quantity(c.height).value||a.height())-(c.chartPadding.top+c.chartPadding.bottom)-c.axisX.offset,0)},b.getHighLow=function(a,c,d){function e(a){if(void 0!==a)if(a instanceof Array)for(var b=0;b<a.length;b++)e(a[b]);else{var c=d?+a[d]:+a;g&&c>f.high&&(f.high=c),h&&c<f.low&&(f.low=c)}}c=b.extend({},c,d?c["axis"+d.toUpperCase()]:{});var f={high:void 0===c.high?-Number.MAX_VALUE:+c.high,low:void 0===c.low?Number.MAX_VALUE:+c.low},g=void 0===c.high,h=void 0===c.low;return(g||h)&&e(a),(c.referenceValue||0===c.referenceValue)&&(f.high=Math.max(c.referenceValue,f.high),f.low=Math.min(c.referenceValue,f.low)),f.high<=f.low&&(0===f.low?f.high=1:f.low<0?f.high=0:f.high>0?f.low=0:(f.high=1,f.low=0)),f},b.isNumeric=function(a){return null!==a&&isFinite(a)},b.isFalseyButZero=function(a){return!a&&0!==a},b.getNumberOrUndefined=function(a){return b.isNumeric(a)?+a:void 0},b.isMultiValue=function(a){return"object"==typeof a&&("x"in a||"y"in a)},b.getMultiValue=function(a,c){return b.isMultiValue(a)?b.getNumberOrUndefined(a[c||"y"]):b.getNumberOrUndefined(a)},b.rho=function(a){function b(a,c){return a%c===0?c:b(c,a%c)}function c(a){return a*a+1}if(1===a)return a;var d,e=2,f=2;if(a%2===0)return 2;do e=c(e)%a,f=c(c(f))%a,d=b(Math.abs(e-f),a);while(1===d);return d},b.getBounds=function(a,c,d,e){function f(a,b){return a===(a+=b)&&(a*=1+(b>0?o:-o)),a}var g,h,i,j=0,k={high:c.high,low:c.low};k.valueRange=k.high-k.low,k.oom=b.orderOfMagnitude(k.valueRange),k.step=Math.pow(10,k.oom),k.min=Math.floor(k.low/k.step)*k.step,k.max=Math.ceil(k.high/k.step)*k.step,k.range=k.max-k.min,k.numberOfSteps=Math.round(k.range/k.step);var l=b.projectLength(a,k.step,k),m=l<d,n=e?b.rho(k.range):0;if(e&&b.projectLength(a,1,k)>=d)k.step=1;else if(e&&n<k.step&&b.projectLength(a,n,k)>=d)k.step=n;else for(;;){if(m&&b.projectLength(a,k.step,k)<=d)k.step*=2;else{if(m||!(b.projectLength(a,k.step/2,k)>=d))break;if(k.step/=2,e&&k.step%1!==0){k.step*=2;break}}if(j++>1e3)throw new Error("Exceeded maximum number of iterations while optimizing scale step!")}var o=2.221e-16;for(k.step=Math.max(k.step,o),h=k.min,i=k.max;h+k.step<=k.low;)h=f(h,k.step);for(;i-k.step>=k.high;)i=f(i,-k.step);k.min=h,k.max=i,k.range=k.max-k.min;var p=[];for(g=k.min;g<=k.max;g=f(g,k.step)){var q=b.roundWithPrecision(g);q!==p[p.length-1]&&p.push(q)}return k.values=p,k},b.polarToCartesian=function(a,b,c,d){var e=(d-90)*Math.PI/180;return{x:a+c*Math.cos(e),y:b+c*Math.sin(e)}},b.createChartRect=function(a,c,d){var e=!(!c.axisX&&!c.axisY),f=e?c.axisY.offset:0,g=e?c.axisX.offset:0,h=a.width()||b.quantity(c.width).value||0,i=a.height()||b.quantity(c.height).value||0,j=b.normalizePadding(c.chartPadding,d);h=Math.max(h,f+j.left+j.right),i=Math.max(i,g+j.top+j.bottom);var k={padding:j,width:function(){return this.x2-this.x1},height:function(){return this.y1-this.y2}};return e?("start"===c.axisX.position?(k.y2=j.top+g,k.y1=Math.max(i-j.bottom,k.y2+1)):(k.y2=j.top,k.y1=Math.max(i-j.bottom-g,k.y2+1)),"start"===c.axisY.position?(k.x1=j.left+f,k.x2=Math.max(h-j.right,k.x1+1)):(k.x1=j.left,k.x2=Math.max(h-j.right-f,k.x1+1))):(k.x1=j.left,k.x2=Math.max(h-j.right,k.x1+1),k.y2=j.top,k.y1=Math.max(i-j.bottom,k.y2+1)),k},b.createGrid=function(a,c,d,e,f,g,h,i){var j={};j[d.units.pos+"1"]=a,j[d.units.pos+"2"]=a,j[d.counterUnits.pos+"1"]=e,j[d.counterUnits.pos+"2"]=e+f;var k=g.elem("line",j,h.join(" "));i.emit("draw",b.extend({type:"grid",axis:d,index:c,group:g,element:k},j))},b.createGridBackground=function(a,b,c,d){var e=a.elem("rect",{x:b.x1,y:b.y2,width:b.width(),height:b.height()},c,!0);d.emit("draw",{type:"gridBackground",group:a,element:e})},b.createLabel=function(a,c,e,f,g,h,i,j,k,l,m){var n,o={};if(o[g.units.pos]=a+i[g.units.pos],o[g.counterUnits.pos]=i[g.counterUnits.pos],o[g.units.len]=c,o[g.counterUnits.len]=Math.max(0,h-10),l){var p=d.createElement("span");p.className=k.join(" "),p.setAttribute("xmlns",b.namespaces.xhtml),p.innerText=f[e],p.style[g.units.len]=Math.round(o[g.units.len])+"px",p.style[g.counterUnits.len]=Math.round(o[g.counterUnits.len])+"px",n=j.foreignObject(p,b.extend({style:"overflow: visible;"},o))}else n=j.elem("text",o,k.join(" ")).text(f[e]);m.emit("draw",b.extend({type:"label",axis:g,index:e,group:j,element:n,text:f[e]},o))},b.getSeriesOption=function(a,b,c){if(a.name&&b.series&&b.series[a.name]){var d=b.series[a.name];return d.hasOwnProperty(c)?d[c]:b[c]}return b[c]},b.optionsProvider=function(a,d,e){function f(a){var f=h;if(h=b.extend({},j),d)for(i=0;i<d.length;i++){var g=c.matchMedia(d[i][0]);g.matches&&(h=b.extend(h,d[i][1]))}e&&a&&e.emit("optionsChanged",{previousOptions:f,currentOptions:h})}function g(){k.forEach(function(a){a.removeListener(f)})}var h,i,j=b.extend({},a),k=[];if(!c.matchMedia)throw"window.matchMedia not found! Make sure you're using a polyfill.";if(d)for(i=0;i<d.length;i++){var l=c.matchMedia(d[i][0]);l.addListener(f),k.push(l)}return f(),{removeMediaQueryListeners:g,getCurrentOptions:function(){return b.extend({},h)}}},b.splitIntoSegments=function(a,c,d){var e={increasingX:!1,fillHoles:!1};d=b.extend({},e,d);for(var f=[],g=!0,h=0;h<a.length;h+=2)void 0===b.getMultiValue(c[h/2].value)?d.fillHoles||(g=!0):(d.increasingX&&h>=2&&a[h]<=a[h-2]&&(g=!0),g&&(f.push({pathCoordinates:[],valueData:[]}),g=!1),f[f.length-1].pathCoordinates.push(a[h],a[h+1]),f[f.length-1].valueData.push(c[h/2]));return f}}(this||global,a),function(a,b){"use strict";b.Interpolation={},b.Interpolation.none=function(a){var c={fillHoles:!1};return a=b.extend({},c,a),function(c,d){for(var e=new b.Svg.Path,f=!0,g=0;g<c.length;g+=2){var h=c[g],i=c[g+1],j=d[g/2];void 0!==b.getMultiValue(j.value)?(f?e.move(h,i,!1,j):e.line(h,i,!1,j),f=!1):a.fillHoles||(f=!0)}return e}},b.Interpolation.simple=function(a){var c={divisor:2,fillHoles:!1};a=b.extend({},c,a);var d=1/Math.max(1,a.divisor);return function(c,e){for(var f,g,h,i=new b.Svg.Path,j=0;j<c.length;j+=2){var k=c[j],l=c[j+1],m=(k-f)*d,n=e[j/2];void 0!==n.value?(void 0===h?i.move(k,l,!1,n):i.curve(f+m,g,k-m,l,k,l,!1,n),f=k,g=l,h=n):a.fillHoles||(f=k=h=void 0)}return i}},b.Interpolation.cardinal=function(a){var c={tension:1,fillHoles:!1};a=b.extend({},c,a);var d=Math.min(1,Math.max(0,a.tension)),e=1-d;return function f(c,g){var h=b.splitIntoSegments(c,g,{fillHoles:a.fillHoles});if(h.length){if(h.length>1){var i=[];return h.forEach(function(a){i.push(f(a.pathCoordinates,a.valueData))}),b.Svg.Path.join(i)}if(c=h[0].pathCoordinates,g=h[0].valueData,c.length<=4)return b.Interpolation.none()(c,g);for(var j,k=(new b.Svg.Path).move(c[0],c[1],!1,g[0]),l=0,m=c.length;m-2*!j>l;l+=2){var n=[{x:+c[l-2],y:+c[l-1]},{x:+c[l],y:+c[l+1]},{x:+c[l+2],y:+c[l+3]},{x:+c[l+4],y:+c[l+5]}];j?l?m-4===l?n[3]={x:+c[0],y:+c[1]}:m-2===l&&(n[2]={x:+c[0],y:+c[1]},n[3]={x:+c[2],y:+c[3]}):n[0]={x:+c[m-2],y:+c[m-1]}:m-4===l?n[3]=n[2]:l||(n[0]={x:+c[l],y:+c[l+1]}),k.curve(d*(-n[0].x+6*n[1].x+n[2].x)/6+e*n[2].x,d*(-n[0].y+6*n[1].y+n[2].y)/6+e*n[2].y,d*(n[1].x+6*n[2].x-n[3].x)/6+e*n[2].x,d*(n[1].y+6*n[2].y-n[3].y)/6+e*n[2].y,n[2].x,n[2].y,!1,g[(l+2)/2])}return k}return b.Interpolation.none()([])}},b.Interpolation.monotoneCubic=function(a){var c={fillHoles:!1};return a=b.extend({},c,a),function d(c,e){var f=b.splitIntoSegments(c,e,{fillHoles:a.fillHoles,increasingX:!0});if(f.length){if(f.length>1){var g=[];return f.forEach(function(a){g.push(d(a.pathCoordinates,a.valueData))}),b.Svg.Path.join(g)}if(c=f[0].pathCoordinates,e=f[0].valueData,c.length<=4)return b.Interpolation.none()(c,e);var h,i,j=[],k=[],l=c.length/2,m=[],n=[],o=[],p=[];for(h=0;h<l;h++)j[h]=c[2*h],k[h]=c[2*h+1];for(h=0;h<l-1;h++)o[h]=k[h+1]-k[h],p[h]=j[h+1]-j[h],n[h]=o[h]/p[h];for(m[0]=n[0],m[l-1]=n[l-2],h=1;h<l-1;h++)0===n[h]||0===n[h-1]||n[h-1]>0!=n[h]>0?m[h]=0:(m[h]=3*(p[h-1]+p[h])/((2*p[h]+p[h-1])/n[h-1]+(p[h]+2*p[h-1])/n[h]),isFinite(m[h])||(m[h]=0));for(i=(new b.Svg.Path).move(j[0],k[0],!1,e[0]),h=0;h<l-1;h++)i.curve(j[h]+p[h]/3,k[h]+m[h]*p[h]/3,j[h+1]-p[h]/3,k[h+1]-m[h+1]*p[h]/3,j[h+1],k[h+1],!1,e[h+1]);return i}return b.Interpolation.none()([])}},b.Interpolation.step=function(a){var c={postpone:!0,fillHoles:!1};return a=b.extend({},c,a),function(c,d){for(var e,f,g,h=new b.Svg.Path,i=0;i<c.length;i+=2){var j=c[i],k=c[i+1],l=d[i/2];void 0!==l.value?(void 0===g?h.move(j,k,!1,l):(a.postpone?h.line(j,f,!1,g):h.line(e,k,!1,l),h.line(j,k,!1,l)),e=j,f=k,g=l):a.fillHoles||(e=f=g=void 0)}return h}}}(this||global,a),function(a,b){"use strict";b.EventEmitter=function(){function a(a,b){d[a]=d[a]||[],d[a].push(b)}function b(a,b){d[a]&&(b?(d[a].splice(d[a].indexOf(b),1),0===d[a].length&&delete d[a]):delete d[a])}function c(a,b){d[a]&&d[a].forEach(function(a){a(b)}),d["*"]&&d["*"].forEach(function(c){c(a,b)})}var d=[];return{addEventHandler:a,removeEventHandler:b,emit:c}}}(this||global,a),function(a,b){"use strict";function c(a){var b=[];if(a.length)for(var c=0;c<a.length;c++)b.push(a[c]);return b}function d(a,c){var d=c||this.prototype||b.Class,e=Object.create(d);b.Class.cloneDefinitions(e,a);var f=function(){var a,c=e.constructor||function(){};return a=this===b?Object.create(e):this,c.apply(a,Array.prototype.slice.call(arguments,0)),a};return f.prototype=e,f["super"]=d,f.extend=this.extend,f}function e(){var a=c(arguments),b=a[0];return a.splice(1,a.length-1).forEach(function(a){Object.getOwnPropertyNames(a).forEach(function(c){delete b[c],Object.defineProperty(b,c,Object.getOwnPropertyDescriptor(a,c))})}),b}b.Class={extend:d,cloneDefinitions:e}}(this||global,a),function(a,b){"use strict";function c(a,c,d){return a&&(this.data=a||{},this.data.labels=this.data.labels||[],this.data.series=this.data.series||[],this.eventEmitter.emit("data",{type:"update",data:this.data})),c&&(this.options=b.extend({},d?this.options:this.defaultOptions,c),this.initializeTimeoutId||(this.optionsProvider.removeMediaQueryListeners(),this.optionsProvider=b.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter))),this.initializeTimeoutId||this.createChart(this.optionsProvider.getCurrentOptions()),this}function d(){return this.initializeTimeoutId?i.clearTimeout(this.initializeTimeoutId):(i.removeEventListener("resize",this.resizeListener),this.optionsProvider.removeMediaQueryListeners()),this}function e(a,b){return this.eventEmitter.addEventHandler(a,b),this}function f(a,b){return this.eventEmitter.removeEventHandler(a,b),this}function g(){i.addEventListener("resize",this.resizeListener),this.optionsProvider=b.optionsProvider(this.options,this.responsiveOptions,this.eventEmitter),this.eventEmitter.addEventHandler("optionsChanged",function(){this.update()}.bind(this)),this.options.plugins&&this.options.plugins.forEach(function(a){a instanceof Array?a[0](this,a[1]):a(this)}.bind(this)),this.eventEmitter.emit("data",{type:"initial",data:this.data}),this.createChart(this.optionsProvider.getCurrentOptions()),this.initializeTimeoutId=void 0}function h(a,c,d,e,f){this.container=b.querySelector(a),this.data=c||{},this.data.labels=this.data.labels||[],this.data.series=this.data.series||[],this.defaultOptions=d,this.options=e,this.responsiveOptions=f,this.eventEmitter=b.EventEmitter(),this.supportsForeignObject=b.Svg.isSupported("Extensibility"),this.supportsAnimations=b.Svg.isSupported("AnimationEventsAttribute"),this.resizeListener=function(){this.update()}.bind(this),this.container&&(this.container.__chartist__&&this.container.__chartist__.detach(),this.container.__chartist__=this),this.initializeTimeoutId=setTimeout(g.bind(this),0)}var i=a.window;b.Base=b.Class.extend({constructor:h,optionsProvider:void 0,container:void 0,svg:void 0,eventEmitter:void 0,createChart:function(){throw new Error("Base chart type can't be instantiated!")},update:c,detach:d,on:e,off:f,version:b.version,supportsForeignObject:!1})}(this||global,a),function(a,b){"use strict";function c(a,c,d,e,f){a instanceof Element?this._node=a:(this._node=y.createElementNS(b.namespaces.svg,a),"svg"===a&&this.attr({"xmlns:ct":b.namespaces.ct})),c&&this.attr(c),d&&this.addClass(d),e&&(f&&e._node.firstChild?e._node.insertBefore(this._node,e._node.firstChild):e._node.appendChild(this._node))}function d(a,c){return"string"==typeof a?c?this._node.getAttributeNS(c,a):this._node.getAttribute(a):(Object.keys(a).forEach(function(c){if(void 0!==a[c])if(c.indexOf(":")!==-1){var d=c.split(":");this._node.setAttributeNS(b.namespaces[d[0]],c,a[c])}else this._node.setAttribute(c,a[c])}.bind(this)),this)}function e(a,c,d,e){return new b.Svg(a,c,d,this,e)}function f(){return this._node.parentNode instanceof SVGElement?new b.Svg(this._node.parentNode):null}function g(){for(var a=this._node;"svg"!==a.nodeName;)a=a.parentNode;return new b.Svg(a)}function h(a){var c=this._node.querySelector(a);return c?new b.Svg(c):null}function i(a){var c=this._node.querySelectorAll(a);return c.length?new b.Svg.List(c):null}function j(){return this._node}function k(a,c,d,e){if("string"==typeof a){var f=y.createElement("div");f.innerHTML=a,a=f.firstChild}a.setAttribute("xmlns",b.namespaces.xmlns);var g=this.elem("foreignObject",c,d,e);return g._node.appendChild(a),g}function l(a){return this._node.appendChild(y.createTextNode(a)),this}function m(){for(;this._node.firstChild;)this._node.removeChild(this._node.firstChild);return this}function n(){return this._node.parentNode.removeChild(this._node),this.parent()}function o(a){return this._node.parentNode.replaceChild(a._node,this._node),a}function p(a,b){return b&&this._node.firstChild?this._node.insertBefore(a._node,this._node.firstChild):this._node.appendChild(a._node),this}function q(){return this._node.getAttribute("class")?this._node.getAttribute("class").trim().split(/\s+/):[]}function r(a){return this._node.setAttribute("class",this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function(a,b,c){return c.indexOf(a)===b}).join(" ")),this}function s(a){var b=a.trim().split(/\s+/);return this._node.setAttribute("class",this.classes(this._node).filter(function(a){return b.indexOf(a)===-1}).join(" ")),this}function t(){return this._node.setAttribute("class",""),this}function u(){return this._node.getBoundingClientRect().height}function v(){return this._node.getBoundingClientRect().width}function w(a,c,d){return void 0===c&&(c=!0),Object.keys(a).forEach(function(e){function f(a,c){var f,g,h,i={};a.easing&&(h=a.easing instanceof Array?a.easing:b.Svg.Easing[a.easing],delete a.easing),a.begin=b.ensureUnit(a.begin,"ms"),a.dur=b.ensureUnit(a.dur,"ms"),h&&(a.calcMode="spline",a.keySplines=h.join(" "),a.keyTimes="0;1"),c&&(a.fill="freeze",i[e]=a.from,this.attr(i),g=b.quantity(a.begin||0).value,a.begin="indefinite"),f=this.elem("animate",b.extend({attributeName:e},a)),c&&setTimeout(function(){try{f._node.beginElement()}catch(b){i[e]=a.to,this.attr(i),f.remove()}}.bind(this),g),d&&f._node.addEventListener("beginEvent",function(){d.emit("animationBegin",{element:this,animate:f._node,params:a})}.bind(this)),f._node.addEventListener("endEvent",function(){d&&d.emit("animationEnd",{element:this,animate:f._node,params:a}),c&&(i[e]=a.to,this.attr(i),f.remove())}.bind(this))}a[e]instanceof Array?a[e].forEach(function(a){f.bind(this)(a,!1)}.bind(this)):f.bind(this)(a[e],c)}.bind(this)),this}function x(a){var c=this;this.svgElements=[];for(var d=0;d<a.length;d++)this.svgElements.push(new b.Svg(a[d]));Object.keys(b.Svg.prototype).filter(function(a){return["constructor","parent","querySelector","querySelectorAll","replace","append","classes","height","width"].indexOf(a)===-1}).forEach(function(a){c[a]=function(){var d=Array.prototype.slice.call(arguments,0);return c.svgElements.forEach(function(c){b.Svg.prototype[a].apply(c,d)}),c}})}var y=a.document;b.Svg=b.Class.extend({constructor:c,attr:d,elem:e,parent:f,root:g,querySelector:h,querySelectorAll:i,getNode:j,foreignObject:k,text:l,empty:m,remove:n,replace:o,append:p,classes:q,addClass:r,removeClass:s,removeAllClasses:t,height:u,width:v,animate:w}),b.Svg.isSupported=function(a){return y.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#"+a,"1.1")};var z={easeInSine:[.47,0,.745,.715],easeOutSine:[.39,.575,.565,1],easeInOutSine:[.445,.05,.55,.95],easeInQuad:[.55,.085,.68,.53],easeOutQuad:[.25,.46,.45,.94],easeInOutQuad:[.455,.03,.515,.955],easeInCubic:[.55,.055,.675,.19],easeOutCubic:[.215,.61,.355,1],easeInOutCubic:[.645,.045,.355,1],easeInQuart:[.895,.03,.685,.22],easeOutQuart:[.165,.84,.44,1],easeInOutQuart:[.77,0,.175,1],easeInQuint:[.755,.05,.855,.06],easeOutQuint:[.23,1,.32,1],easeInOutQuint:[.86,0,.07,1],easeInExpo:[.95,.05,.795,.035],easeOutExpo:[.19,1,.22,1],easeInOutExpo:[1,0,0,1],easeInCirc:[.6,.04,.98,.335],easeOutCirc:[.075,.82,.165,1],easeInOutCirc:[.785,.135,.15,.86],easeInBack:[.6,-.28,.735,.045],easeOutBack:[.175,.885,.32,1.275],easeInOutBack:[.68,-.55,.265,1.55]};b.Svg.Easing=z,b.Svg.List=b.Class.extend({constructor:x})}(this||global,a),function(a,b){"use strict";function c(a,c,d,e,f,g){var h=b.extend({command:f?a.toLowerCase():a.toUpperCase()},c,g?{data:g}:{});d.splice(e,0,h)}function d(a,b){a.forEach(function(c,d){t[c.command.toLowerCase()].forEach(function(e,f){b(c,e,d,f,a)})})}function e(a,c){this.pathElements=[],this.pos=0,this.close=a,this.options=b.extend({},u,c)}function f(a){return void 0!==a?(this.pos=Math.max(0,Math.min(this.pathElements.length,a)),this):this.pos}function g(a){return this.pathElements.splice(this.pos,a),this}function h(a,b,d,e){return c("M",{x:+a,y:+b},this.pathElements,this.pos++,d,e),this}function i(a,b,d,e){return c("L",{x:+a,y:+b},this.pathElements,this.pos++,d,e),this}function j(a,b,d,e,f,g,h,i){return c("C",{x1:+a,y1:+b,x2:+d,y2:+e,x:+f,y:+g},this.pathElements,this.pos++,h,i),this}function k(a,b,d,e,f,g,h,i,j){return c("A",{rx:+a,ry:+b,xAr:+d,lAf:+e,sf:+f,x:+g,y:+h},this.pathElements,this.pos++,i,j),this}function l(a){var c=a.replace(/([A-Za-z])([0-9])/g,"$1 $2").replace(/([0-9])([A-Za-z])/g,"$1 $2").split(/[\s,]+/).reduce(function(a,b){return b.match(/[A-Za-z]/)&&a.push([]),a[a.length-1].push(b),a},[]);"Z"===c[c.length-1][0].toUpperCase()&&c.pop();var d=c.map(function(a){var c=a.shift(),d=t[c.toLowerCase()];return b.extend({command:c},d.reduce(function(b,c,d){return b[c]=+a[d],b},{}))}),e=[this.pos,0];return Array.prototype.push.apply(e,d),Array.prototype.splice.apply(this.pathElements,e),this.pos+=d.length,this}function m(){var a=Math.pow(10,this.options.accuracy);return this.pathElements.reduce(function(b,c){var d=t[c.command.toLowerCase()].map(function(b){return this.options.accuracy?Math.round(c[b]*a)/a:c[b]}.bind(this));return b+c.command+d.join(",")}.bind(this),"")+(this.close?"Z":"")}function n(a,b){return d(this.pathElements,function(c,d){c[d]*="x"===d[0]?a:b}),this}function o(a,b){return d(this.pathElements,function(c,d){c[d]+="x"===d[0]?a:b}),this}function p(a){return d(this.pathElements,function(b,c,d,e,f){var g=a(b,c,d,e,f);(g||0===g)&&(b[c]=g)}),this}function q(a){var c=new b.Svg.Path(a||this.close);return c.pos=this.pos,c.pathElements=this.pathElements.slice().map(function(a){return b.extend({},a)}),c.options=b.extend({},this.options),c}function r(a){var c=[new b.Svg.Path];return this.pathElements.forEach(function(d){d.command===a.toUpperCase()&&0!==c[c.length-1].pathElements.length&&c.push(new b.Svg.Path),c[c.length-1].pathElements.push(d)}),c}function s(a,c,d){for(var e=new b.Svg.Path(c,d),f=0;f<a.length;f++)for(var g=a[f],h=0;h<g.pathElements.length;h++)e.pathElements.push(g.pathElements[h]);return e}var t={m:["x","y"],l:["x","y"],c:["x1","y1","x2","y2","x","y"],a:["rx","ry","xAr","lAf","sf","x","y"]},u={accuracy:3};b.Svg.Path=b.Class.extend({constructor:e,position:f,remove:g,move:h,line:i,curve:j,arc:k,scale:n,translate:o,transform:p,parse:l,stringify:m,clone:q,splitByCommand:r}),b.Svg.Path.elementDescriptions=t,b.Svg.Path.join=s}(this||global,a),function(a,b){"use strict";function c(a,b,c,d){this.units=a,this.counterUnits=a===e.x?e.y:e.x,this.chartRect=b,this.axisLength=b[a.rectEnd]-b[a.rectStart],this.gridOffset=b[a.rectOffset],this.ticks=c,this.options=d}function d(a,c,d,e,f){var g=e["axis"+this.units.pos.toUpperCase()],h=this.ticks.map(this.projectValue.bind(this)),i=this.ticks.map(g.labelInterpolationFnc);h.forEach(function(j,k){var l,m={x:0,y:0};l=h[k+1]?h[k+1]-j:Math.max(this.axisLength-j,30),b.isFalseyButZero(i[k])&&""!==i[k]||("x"===this.units.pos?(j=this.chartRect.x1+j,m.x=e.axisX.labelOffset.x,"start"===e.axisX.position?m.y=this.chartRect.padding.top+e.axisX.labelOffset.y+(d?5:20):m.y=this.chartRect.y1+e.axisX.labelOffset.y+(d?5:20)):(j=this.chartRect.y1-j,m.y=e.axisY.labelOffset.y-(d?l:0),"start"===e.axisY.position?m.x=d?this.chartRect.padding.left+e.axisY.labelOffset.x:this.chartRect.x1-10:m.x=this.chartRect.x2+e.axisY.labelOffset.x+10),g.showGrid&&b.createGrid(j,k,this,this.gridOffset,this.chartRect[this.counterUnits.len](),a,[e.classNames.grid,e.classNames[this.units.dir]],f),g.showLabel&&b.createLabel(j,l,k,i,this,g.offset,m,c,[e.classNames.label,e.classNames[this.units.dir],"start"===g.position?e.classNames[g.position]:e.classNames.end],d,f))}.bind(this))}var e=(a.window,a.document,{x:{pos:"x",len:"width",dir:"horizontal",rectStart:"x1",rectEnd:"x2",rectOffset:"y2"},y:{pos:"y",len:"height",dir:"vertical",rectStart:"y2",rectEnd:"y1",rectOffset:"x1"}});b.Axis=b.Class.extend({constructor:c,createGridAndLabels:d,projectValue:function(a,b,c){throw new Error("Base axis can't be instantiated!")}}),b.Axis.units=e}(this||global,a),function(a,b){"use strict";function c(a,c,d,e){var f=e.highLow||b.getHighLow(c,e,a.pos);this.bounds=b.getBounds(d[a.rectEnd]-d[a.rectStart],f,e.scaleMinSpace||20,e.onlyInteger),this.range={min:this.bounds.min,max:this.bounds.max},b.AutoScaleAxis["super"].constructor.call(this,a,d,this.bounds.values,e)}function d(a){return this.axisLength*(+b.getMultiValue(a,this.units.pos)-this.bounds.min)/this.bounds.range}a.window,a.document;b.AutoScaleAxis=b.Axis.extend({constructor:c,projectValue:d})}(this||global,a),function(a,b){"use strict";function c(a,c,d,e){var f=e.highLow||b.getHighLow(c,e,a.pos);this.divisor=e.divisor||1,this.ticks=e.ticks||b.times(this.divisor).map(function(a,b){return f.low+(f.high-f.low)/this.divisor*b}.bind(this)),this.ticks.sort(function(a,b){return a-b}),this.range={min:f.low,max:f.high},b.FixedScaleAxis["super"].constructor.call(this,a,d,this.ticks,e),this.stepLength=this.axisLength/this.divisor}function d(a){return this.axisLength*(+b.getMultiValue(a,this.units.pos)-this.range.min)/(this.range.max-this.range.min)}a.window,a.document;b.FixedScaleAxis=b.Axis.extend({constructor:c,projectValue:d})}(this||global,a),function(a,b){"use strict";function c(a,c,d,e){b.StepAxis["super"].constructor.call(this,a,d,e.ticks,e);var f=Math.max(1,e.ticks.length-(e.stretch?1:0));this.stepLength=this.axisLength/f}function d(a,b){return this.stepLength*b}a.window,a.document;b.StepAxis=b.Axis.extend({constructor:c,projectValue:d})}(this||global,a),function(a,b){"use strict";function c(a){var c=b.normalizeData(this.data,a.reverseData,!0);this.svg=b.createSvg(this.container,a.width,a.height,a.classNames.chart);var d,f,g=this.svg.elem("g").addClass(a.classNames.gridGroup),h=this.svg.elem("g"),i=this.svg.elem("g").addClass(a.classNames.labelGroup),j=b.createChartRect(this.svg,a,e.padding);d=void 0===a.axisX.type?new b.StepAxis(b.Axis.units.x,c.normalized.series,j,b.extend({},a.axisX,{ticks:c.normalized.labels,stretch:a.fullWidth})):a.axisX.type.call(b,b.Axis.units.x,c.normalized.series,j,a.axisX),f=void 0===a.axisY.type?new b.AutoScaleAxis(b.Axis.units.y,c.normalized.series,j,b.extend({},a.axisY,{high:b.isNumeric(a.high)?a.high:a.axisY.high,low:b.isNumeric(a.low)?a.low:a.axisY.low})):a.axisY.type.call(b,b.Axis.units.y,c.normalized.series,j,a.axisY),d.createGridAndLabels(g,i,this.supportsForeignObject,a,this.eventEmitter),f.createGridAndLabels(g,i,this.supportsForeignObject,a,this.eventEmitter),a.showGridBackground&&b.createGridBackground(g,j,a.classNames.gridBackground,this.eventEmitter),c.raw.series.forEach(function(e,g){var i=h.elem("g");i.attr({"ct:series-name":e.name,"ct:meta":b.serialize(e.meta)}),i.addClass([a.classNames.series,e.className||a.classNames.series+"-"+b.alphaNumerate(g)].join(" "));var k=[],l=[];c.normalized.series[g].forEach(function(a,h){var i={x:j.x1+d.projectValue(a,h,c.normalized.series[g]),y:j.y1-f.projectValue(a,h,c.normalized.series[g])};k.push(i.x,i.y),l.push({value:a,valueIndex:h,meta:b.getMetaData(e,h)})}.bind(this));var m={lineSmooth:b.getSeriesOption(e,a,"lineSmooth"),showPoint:b.getSeriesOption(e,a,"showPoint"),showLine:b.getSeriesOption(e,a,"showLine"),showArea:b.getSeriesOption(e,a,"showArea"),areaBase:b.getSeriesOption(e,a,"areaBase")},n="function"==typeof m.lineSmooth?m.lineSmooth:m.lineSmooth?b.Interpolation.monotoneCubic():b.Interpolation.none(),o=n(k,l);if(m.showPoint&&o.pathElements.forEach(function(c){var h=i.elem("line",{x1:c.x,y1:c.y,x2:c.x+.01,y2:c.y},a.classNames.point).attr({"ct:value":[c.data.value.x,c.data.value.y].filter(b.isNumeric).join(","),"ct:meta":b.serialize(c.data.meta)});this.eventEmitter.emit("draw",{type:"point",value:c.data.value,index:c.data.valueIndex,meta:c.data.meta,series:e,seriesIndex:g,axisX:d,axisY:f,group:i,element:h,x:c.x,y:c.y})}.bind(this)),m.showLine){var p=i.elem("path",{d:o.stringify()},a.classNames.line,!0);this.eventEmitter.emit("draw",{type:"line",values:c.normalized.series[g],path:o.clone(),chartRect:j,index:g,series:e,seriesIndex:g,seriesMeta:e.meta,axisX:d,axisY:f,group:i,element:p})}if(m.showArea&&f.range){var q=Math.max(Math.min(m.areaBase,f.range.max),f.range.min),r=j.y1-f.projectValue(q);o.splitByCommand("M").filter(function(a){return a.pathElements.length>1}).map(function(a){var b=a.pathElements[0],c=a.pathElements[a.pathElements.length-1];return a.clone(!0).position(0).remove(1).move(b.x,r).line(b.x,b.y).position(a.pathElements.length+1).line(c.x,r)}).forEach(function(b){var h=i.elem("path",{d:b.stringify()},a.classNames.area,!0);this.eventEmitter.emit("draw",{type:"area",values:c.normalized.series[g],path:b.clone(),series:e,seriesIndex:g,axisX:d,axisY:f,chartRect:j,index:g,group:i,element:h})}.bind(this))}}.bind(this)),this.eventEmitter.emit("created",{bounds:f.bounds,chartRect:j,axisX:d,axisY:f,svg:this.svg,options:a})}function d(a,c,d,f){b.Line["super"].constructor.call(this,a,c,e,b.extend({},e,d),f)}var e=(a.window,a.document,{axisX:{offset:30,position:"end",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:b.noop,type:void 0},axisY:{offset:40,position:"start",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:b.noop,type:void 0,scaleMinSpace:20,onlyInteger:!1},width:void 0,height:void 0,showLine:!0,showPoint:!0,showArea:!1,areaBase:0,lineSmooth:!0,showGridBackground:!1,low:void 0,high:void 0,chartPadding:{top:15,right:15,bottom:5,left:10},fullWidth:!1,reverseData:!1,classNames:{chart:"ct-chart-line",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",line:"ct-line",point:"ct-point",area:"ct-area",grid:"ct-grid",gridGroup:"ct-grids",gridBackground:"ct-grid-background",vertical:"ct-vertical",horizontal:"ct-horizontal",start:"ct-start",end:"ct-end"}});b.Line=b.Base.extend({constructor:d,createChart:c})}(this||global,a),function(a,b){"use strict";function c(a){var c,d;a.distributeSeries?(c=b.normalizeData(this.data,a.reverseData,a.horizontalBars?"x":"y"),c.normalized.series=c.normalized.series.map(function(a){return[a]})):c=b.normalizeData(this.data,a.reverseData,a.horizontalBars?"x":"y"),this.svg=b.createSvg(this.container,a.width,a.height,a.classNames.chart+(a.horizontalBars?" "+a.classNames.horizontalBars:""));var f=this.svg.elem("g").addClass(a.classNames.gridGroup),g=this.svg.elem("g"),h=this.svg.elem("g").addClass(a.classNames.labelGroup);
if(a.stackBars&&0!==c.normalized.series.length){var i=b.serialMap(c.normalized.series,function(){return Array.prototype.slice.call(arguments).map(function(a){return a}).reduce(function(a,b){return{x:a.x+(b&&b.x)||0,y:a.y+(b&&b.y)||0}},{x:0,y:0})});d=b.getHighLow([i],a,a.horizontalBars?"x":"y")}else d=b.getHighLow(c.normalized.series,a,a.horizontalBars?"x":"y");d.high=+a.high||(0===a.high?0:d.high),d.low=+a.low||(0===a.low?0:d.low);var j,k,l,m,n,o=b.createChartRect(this.svg,a,e.padding);k=a.distributeSeries&&a.stackBars?c.normalized.labels.slice(0,1):c.normalized.labels,a.horizontalBars?(j=m=void 0===a.axisX.type?new b.AutoScaleAxis(b.Axis.units.x,c.normalized.series,o,b.extend({},a.axisX,{highLow:d,referenceValue:0})):a.axisX.type.call(b,b.Axis.units.x,c.normalized.series,o,b.extend({},a.axisX,{highLow:d,referenceValue:0})),l=n=void 0===a.axisY.type?new b.StepAxis(b.Axis.units.y,c.normalized.series,o,{ticks:k}):a.axisY.type.call(b,b.Axis.units.y,c.normalized.series,o,a.axisY)):(l=m=void 0===a.axisX.type?new b.StepAxis(b.Axis.units.x,c.normalized.series,o,{ticks:k}):a.axisX.type.call(b,b.Axis.units.x,c.normalized.series,o,a.axisX),j=n=void 0===a.axisY.type?new b.AutoScaleAxis(b.Axis.units.y,c.normalized.series,o,b.extend({},a.axisY,{highLow:d,referenceValue:0})):a.axisY.type.call(b,b.Axis.units.y,c.normalized.series,o,b.extend({},a.axisY,{highLow:d,referenceValue:0})));var p=a.horizontalBars?o.x1+j.projectValue(0):o.y1-j.projectValue(0),q=[];l.createGridAndLabels(f,h,this.supportsForeignObject,a,this.eventEmitter),j.createGridAndLabels(f,h,this.supportsForeignObject,a,this.eventEmitter),a.showGridBackground&&b.createGridBackground(f,o,a.classNames.gridBackground,this.eventEmitter),c.raw.series.forEach(function(d,e){var f,h,i=e-(c.raw.series.length-1)/2;f=a.distributeSeries&&!a.stackBars?l.axisLength/c.normalized.series.length/2:a.distributeSeries&&a.stackBars?l.axisLength/2:l.axisLength/c.normalized.series[e].length/2,h=g.elem("g"),h.attr({"ct:series-name":d.name,"ct:meta":b.serialize(d.meta)}),h.addClass([a.classNames.series,d.className||a.classNames.series+"-"+b.alphaNumerate(e)].join(" ")),c.normalized.series[e].forEach(function(g,k){var r,s,t,u;if(u=a.distributeSeries&&!a.stackBars?e:a.distributeSeries&&a.stackBars?0:k,r=a.horizontalBars?{x:o.x1+j.projectValue(g&&g.x?g.x:0,k,c.normalized.series[e]),y:o.y1-l.projectValue(g&&g.y?g.y:0,u,c.normalized.series[e])}:{x:o.x1+l.projectValue(g&&g.x?g.x:0,u,c.normalized.series[e]),y:o.y1-j.projectValue(g&&g.y?g.y:0,k,c.normalized.series[e])},l instanceof b.StepAxis&&(l.options.stretch||(r[l.units.pos]+=f*(a.horizontalBars?-1:1)),r[l.units.pos]+=a.stackBars||a.distributeSeries?0:i*a.seriesBarDistance*(a.horizontalBars?-1:1)),t=q[k]||p,q[k]=t-(p-r[l.counterUnits.pos]),void 0!==g){var v={};v[l.units.pos+"1"]=r[l.units.pos],v[l.units.pos+"2"]=r[l.units.pos],!a.stackBars||"accumulate"!==a.stackMode&&a.stackMode?(v[l.counterUnits.pos+"1"]=p,v[l.counterUnits.pos+"2"]=r[l.counterUnits.pos]):(v[l.counterUnits.pos+"1"]=t,v[l.counterUnits.pos+"2"]=q[k]),v.x1=Math.min(Math.max(v.x1,o.x1),o.x2),v.x2=Math.min(Math.max(v.x2,o.x1),o.x2),v.y1=Math.min(Math.max(v.y1,o.y2),o.y1),v.y2=Math.min(Math.max(v.y2,o.y2),o.y1);var w=b.getMetaData(d,k);s=h.elem("line",v,a.classNames.bar).attr({"ct:value":[g.x,g.y].filter(b.isNumeric).join(","),"ct:meta":b.serialize(w)}),this.eventEmitter.emit("draw",b.extend({type:"bar",value:g,index:k,meta:w,series:d,seriesIndex:e,axisX:m,axisY:n,chartRect:o,group:h,element:s},v))}}.bind(this))}.bind(this)),this.eventEmitter.emit("created",{bounds:j.bounds,chartRect:o,axisX:m,axisY:n,svg:this.svg,options:a})}function d(a,c,d,f){b.Bar["super"].constructor.call(this,a,c,e,b.extend({},e,d),f)}var e=(a.window,a.document,{axisX:{offset:30,position:"end",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:b.noop,scaleMinSpace:30,onlyInteger:!1},axisY:{offset:40,position:"start",labelOffset:{x:0,y:0},showLabel:!0,showGrid:!0,labelInterpolationFnc:b.noop,scaleMinSpace:20,onlyInteger:!1},width:void 0,height:void 0,high:void 0,low:void 0,referenceValue:0,chartPadding:{top:15,right:15,bottom:5,left:10},seriesBarDistance:15,stackBars:!1,stackMode:"accumulate",horizontalBars:!1,distributeSeries:!1,reverseData:!1,showGridBackground:!1,classNames:{chart:"ct-chart-bar",horizontalBars:"ct-horizontal-bars",label:"ct-label",labelGroup:"ct-labels",series:"ct-series",bar:"ct-bar",grid:"ct-grid",gridGroup:"ct-grids",gridBackground:"ct-grid-background",vertical:"ct-vertical",horizontal:"ct-horizontal",start:"ct-start",end:"ct-end"}});b.Bar=b.Base.extend({constructor:d,createChart:c})}(this||global,a),function(a,b){"use strict";function c(a,b,c){var d=b.x>a.x;return d&&"explode"===c||!d&&"implode"===c?"start":d&&"implode"===c||!d&&"explode"===c?"end":"middle"}function d(a){var d,e,g,h,i,j=b.normalizeData(this.data),k=[],l=a.startAngle;this.svg=b.createSvg(this.container,a.width,a.height,a.donut?a.classNames.chartDonut:a.classNames.chartPie),e=b.createChartRect(this.svg,a,f.padding),g=Math.min(e.width()/2,e.height()/2),i=a.total||j.normalized.series.reduce(function(a,b){return a+b},0);var m=b.quantity(a.donutWidth);"%"===m.unit&&(m.value*=g/100),g-=a.donut&&!a.donutSolid?m.value/2:0,h="outside"===a.labelPosition||a.donut&&!a.donutSolid?g:"center"===a.labelPosition?0:a.donutSolid?g-m.value/2:g/2,h+=a.labelOffset;var n={x:e.x1+e.width()/2,y:e.y2+e.height()/2},o=1===j.raw.series.filter(function(a){return a.hasOwnProperty("value")?0!==a.value:0!==a}).length;j.raw.series.forEach(function(a,b){k[b]=this.svg.elem("g",null,null)}.bind(this)),a.showLabel&&(d=this.svg.elem("g",null,null)),j.raw.series.forEach(function(e,f){if(0!==j.normalized.series[f]||!a.ignoreEmptyValues){k[f].attr({"ct:series-name":e.name}),k[f].addClass([a.classNames.series,e.className||a.classNames.series+"-"+b.alphaNumerate(f)].join(" "));var p=i>0?l+j.normalized.series[f]/i*360:0,q=Math.max(0,l-(0===f||o?0:.2));p-q>=359.99&&(p=q+359.99);var r,s,t,u=b.polarToCartesian(n.x,n.y,g,q),v=b.polarToCartesian(n.x,n.y,g,p),w=new b.Svg.Path(!a.donut||a.donutSolid).move(v.x,v.y).arc(g,g,0,p-l>180,0,u.x,u.y);a.donut?a.donutSolid&&(t=g-m.value,r=b.polarToCartesian(n.x,n.y,t,l-(0===f||o?0:.2)),s=b.polarToCartesian(n.x,n.y,t,p),w.line(r.x,r.y),w.arc(t,t,0,p-l>180,1,s.x,s.y)):w.line(n.x,n.y);var x=a.classNames.slicePie;a.donut&&(x=a.classNames.sliceDonut,a.donutSolid&&(x=a.classNames.sliceDonutSolid));var y=k[f].elem("path",{d:w.stringify()},x);if(y.attr({"ct:value":j.normalized.series[f],"ct:meta":b.serialize(e.meta)}),a.donut&&!a.donutSolid&&(y._node.style.strokeWidth=m.value+"px"),this.eventEmitter.emit("draw",{type:"slice",value:j.normalized.series[f],totalDataSum:i,index:f,meta:e.meta,series:e,group:k[f],element:y,path:w.clone(),center:n,radius:g,startAngle:l,endAngle:p}),a.showLabel){var z;z=1===j.raw.series.length?{x:n.x,y:n.y}:b.polarToCartesian(n.x,n.y,h,l+(p-l)/2);var A;A=j.normalized.labels&&!b.isFalseyButZero(j.normalized.labels[f])?j.normalized.labels[f]:j.normalized.series[f];var B=a.labelInterpolationFnc(A,f);if(B||0===B){var C=d.elem("text",{dx:z.x,dy:z.y,"text-anchor":c(n,z,a.labelDirection)},a.classNames.label).text(""+B);this.eventEmitter.emit("draw",{type:"label",index:f,group:d,element:C,text:""+B,x:z.x,y:z.y})}}l=p}}.bind(this)),this.eventEmitter.emit("created",{chartRect:e,svg:this.svg,options:a})}function e(a,c,d,e){b.Pie["super"].constructor.call(this,a,c,f,b.extend({},f,d),e)}var f=(a.window,a.document,{width:void 0,height:void 0,chartPadding:5,classNames:{chartPie:"ct-chart-pie",chartDonut:"ct-chart-donut",series:"ct-series",slicePie:"ct-slice-pie",sliceDonut:"ct-slice-donut",sliceDonutSolid:"ct-slice-donut-solid",label:"ct-label"},startAngle:0,total:void 0,donut:!1,donutSolid:!1,donutWidth:60,showLabel:!0,labelOffset:0,labelPosition:"inside",labelInterpolationFnc:b.noop,labelDirection:"neutral",reverseData:!1,ignoreEmptyValues:!1});b.Pie=b.Base.extend({constructor:e,createChart:d,determineAnchorPosition:c})}(this||global,a),a});
//# sourceMappingURL=chartist.min.js.map
!function(n,i){"function"==typeof define&&define.amd?define(["chartist","jquery"],function(t,e){return n.returnExportsGlobal=i(t,e)}):"object"==typeof exports?module.exports=i(require("chartist"),require("jquery")):n["Chartist.plugins.tooltip"]=i(n.chartist,n.jquery)}(this,function(i,a){"use strict";var t={valueTransform:i.noop,seriesName:!0};return i.plugins=i.plugins||{},i.plugins.tooltip=function(o){return o=i.extend({},t,o),function(t){var e=".ct-point";t instanceof i.Bar?e=".ct-bar":t instanceof i.Pie&&(e="[class^=ct-slice]");var n=a(t.container),r=n.append('<div class="ct-tooltip"></div>').find(".ct-tooltip").hide();n.on("mouseenter",e,function(){var t=a(this),e=t.parent().attr("ct:series-name"),n="";o.seriesName&&e&&(n+=e+"<br>"),t.attr("ct:meta")&&(n+=t.attr("ct:meta")+"<br>");var i=t.attr("ct:value")||"0";n+=o.valueTransform(i),r.html(n).show()}),n.on("mouseleave",e,function(){r.hide()}),n.on("mousemove",function(t){r.css({left:(t.offsetX||t.originalEvent.layerX)-r.width()/2-10,top:(t.offsetY||t.originalEvent.layerY)-r.height()-40})})}},i.plugins.tooltip});
!function(a,b){"function"==typeof define&&define.amd?define(["chartist"],function(c){return a.returnExportsGlobal=b(c)}):"object"==typeof exports?module.exports=b(require("chartist")):a["Chartist.plugins.zoom"]=b(Chartist)}(this,function(a){return function(a,b,c){"use strict";function d(a){a.attr({style:"display:none"})}function e(a){a.attr({style:"display:block"})}function f(a,b){var c=a.x,d=a.y,e=b.x-c,f=b.y-d;return 0>e&&(e=-e,c=b.x),0>f&&(f=-f,d=b.y),{x:c,y:d,width:e,height:f}}function g(a,b){return h(a.clientX,a.clientY,b)}function h(a,b,c){var d="svg"===c.tagName?c:c.ownerSVGElement,e=d.getScreenCTM(),f=d.createSVGPoint();return f.x=a,f.y=b,f=f.matrixTransform(e.inverse()),f||{x:0,y:0}}function i(a,b){var c=b.bounds.max,d=b.bounds.min;if(b.scale&&"log"===b.scale.type){var e=b.scale.base;return Math.pow(e,a*j(c/d,e)/b.axisLength)*d}return a*b.bounds.range/b.axisLength+d}function j(a,b){return Math.log(a)/Math.log(b)}var k={pointClipOffset:5};c.plugins=c.plugins||{},c.plugins.zoom=function(a){return a=c.extend({},k,a),function(b){function h(a){var b=g(a,v);return b.id=a.identifier,b}function j(a){for(var b=0;b<B.length;b++){var c=B[b].id;if(c===a)return b}return-1}function k(a){for(var b=a.changedTouches,c=0;c<b.length;c++)B.push(h(b[c]));B.length>1&&(u.attr(f(B[0],B[1])),e(u))}function l(a){for(var b=a.changedTouches,c=0;c<b.length;c++){var d=j(b[c].identifier);B.splice(d,1,h(b[c]))}B.length>1&&(u.attr(f(B[0],B[1])),e(u),a.preventDefault())}function m(a){n(a.changedTouches)}function n(a){for(var b=0;b<a.length;b++){var c=j(a[b].identifier);c>=0&&B.splice(c,1)}}function o(a){B.length>1&&s(f(B[0],B[1])),n(a.changedTouches),d(u)}function p(a){if(0===a.button){var b=g(a,v);q(b,y)&&(z=b,u.attr(f(z,z)),e(u),a.preventDefault())}}function q(a,b){return a.x>=b.x1&&a.x<=b.x2&&a.y>=b.y2&&a.y<=b.y1}function r(b){if(0===b.button&&z){var c=f(z,g(b,v));s(c),z=null,d(u)}else a.resetOnRightMouseBtn&&2===b.button&&(C(),b.preventDefault())}function s(a){if(a.width>5&&a.height>5){var c=Math.max(0,a.x-y.x1),d=Math.min(y.width(),c+a.width),e=Math.min(y.height(),y.y1-a.y),f=Math.max(0,e-a.height);b.options.axisX.highLow={low:i(c,w),high:i(d,w)},b.options.axisY.highLow={low:i(f,x),high:i(e,x)},b.update(b.data,b.options),A&&A(b,C)}}function t(a){if(z){var b=g(a,v);q(b,y)&&(u.attr(f(z,b)),a.preventDefault())}}if(b instanceof c.Line){var u,v,w,x,y,z,A=a.onZoom,B=[];b.on("draw",function(a){var b=a.type,c="point"===b?"point-mask":"line-mask";("line"===b||"bar"===b||"area"===b||"point"===b)&&a.element.attr({"clip-path":"url(#"+c+")"})}),b.on("created",function(b){function c(a,b){f.elem("clipPath",{id:a}).elem("rect",{x:y.x1-b,y:y.y2-b,width:g+b+b,height:h+b+b,fill:"white"})}function e(a,b){v.addEventListener(a,b)}w=b.axisX,x=b.axisY,y=b.chartRect,v=b.svg._node,u=b.svg.elem("rect",{x:10,y:10,width:100,height:100},"ct-zoom-rect"),d(u);var f=b.svg.querySelector("defs")||b.svg.elem("defs"),g=y.width(),h=y.height();c("line-mask",0),c("point-mask",a.pointClipOffset),e("mousedown",p),e("mouseup",r),e("mousemove",t),e("touchstart",k),e("touchmove",l),e("touchend",o),e("touchcancel",m)});var C=function(){b.options.axisX.highLow=null,b.options.axisY.highLow=null,b.update(b.data,b.options)}}}}}(window,document,a),a.plugins.zoom});
//# sourceMappingURL=chartist-plugin-zoom.min.js.map
/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var pJS = function(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab:{
          distance: 100,
          line_linked:{
            opacity: 1
          }
        },
        bubble:{
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse:{
          distance: 200,
          duration: 0.4
        },
        push:{
          particles_nb: 4
        },
        remove:{
          particles_nb: 2
        }
      },
      mouse:{}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors:{}
    },
    tmp: {}
  };

  var pJS = this.pJS;

  /* params settings */
  if(params){
    Object.deepExtend(pJS, params);
  }

  pJS.tmp.obj = {
    size_value: pJS.particles.size.value,
    size_anim_speed: pJS.particles.size.anim.speed,
    move_speed: pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width: pJS.particles.line_linked.width,
    mode_grab_distance: pJS.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS.interactivity.modes.repulse.distance
  };


  pJS.fn.retinaInit = function(){

    if(pJS.retina_detect && window.devicePixelRatio > 1){
      pJS.canvas.pxratio = window.devicePixelRatio; 
      pJS.tmp.retina = true;
    } 
    else{
      pJS.canvas.pxratio = 1;
      pJS.tmp.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
    pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;

  };



  /* ---------- pJS functions - canvas ------------ */

  pJS.fn.canvasInit = function(){
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function(){

    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    if(pJS && pJS.interactivity.events.resize){

      window.addEventListener('resize', function(){

          pJS.canvas.w = pJS.canvas.el.offsetWidth;
          pJS.canvas.h = pJS.canvas.el.offsetHeight;

          /* resize canvas */
          if(pJS.tmp.retina){
            pJS.canvas.w *= pJS.canvas.pxratio;
            pJS.canvas.h *= pJS.canvas.pxratio;
          }

          pJS.canvas.el.width = pJS.canvas.w;
          pJS.canvas.el.height = pJS.canvas.h;

          /* repaint canvas on anim disabled */
          if(!pJS.particles.move.enable){
            pJS.fn.particlesEmpty();
            pJS.fn.particlesCreate();
            pJS.fn.particlesDraw();
            pJS.fn.vendors.densityAutoParticles();
          }

        /* density particles enabled */
        pJS.fn.vendors.densityAutoParticles();

      });

    }

  };


  pJS.fn.canvasPaint = function(){
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasClear = function(){
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };


  /* --------- pJS functions - particles ----------- */

  pJS.fn.particle = function(color, opacity, position){

    /* size */
    this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value;
    if(pJS.particles.size.anim.enable){
      this.size_status = false;
      this.vs = pJS.particles.size.anim.speed / 100;
      if(!pJS.particles.size.anim.sync){
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* check position  - into the canvas */
    if(this.x > pJS.canvas.w - this.radius*2) this.x = this.x - this.radius;
    else if(this.x < this.radius*2) this.x = this.x + this.radius;
    if(this.y > pJS.canvas.h - this.radius*2) this.y = this.y - this.radius;
    else if(this.y < this.radius*2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if(pJS.particles.move.bounce){
      pJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if(typeof(color.value) == 'object'){

      if(color.value instanceof Array){
        var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      }else{
        if(color.value.r != undefined && color.value.g != undefined && color.value.b != undefined){
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          }
        }
        if(color.value.h != undefined && color.value.s != undefined && color.value.l != undefined){
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          }
        }
      }

    }
    else if(color.value == 'random'){
      this.color.rgb = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }
    else if(typeof(color.value) == 'string'){
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value;
    if(pJS.particles.opacity.anim.enable){
      this.opacity_status = false;
      this.vo = pJS.particles.opacity.anim.speed / 100;
      if(!pJS.particles.opacity.anim.sync){
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {}
    switch(pJS.particles.move.direction){
      case 'top':
        velbase = { x:0, y:-1 };
      break;
      case 'top-right':
        velbase = { x:0.5, y:-0.5 };
      break;
      case 'right':
        velbase = { x:1, y:-0 };
      break;
      case 'bottom-right':
        velbase = { x:0.5, y:0.5 };
      break;
      case 'bottom':
        velbase = { x:0, y:1 };
      break;
      case 'bottom-left':
        velbase = { x:-0.5, y:1 };
      break;
      case 'left':
        velbase = { x:-1, y:0 };
      break;
      case 'top-left':
        velbase = { x:-0.5, y:-0.5 };
      break;
      default:
        velbase = { x:0, y:0 };
      break;
    }

    if(pJS.particles.move.straight){
      this.vx = velbase.x;
      this.vy = velbase.y;
      if(pJS.particles.move.random){
        this.vx = this.vx * (Math.random());
        this.vy = this.vy * (Math.random());
      }
    }else{
      this.vx = velbase.x + Math.random()-0.5;
      this.vy = velbase.y + Math.random()-0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;

    

    /* if shape is image */

    var shape_type = pJS.particles.shape.type;
    if(typeof(shape_type) == 'object'){
      if(shape_type instanceof Array){
        var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    }else{
      this.shape = shape_type;
    }

    if(this.shape == 'image'){
      var sh = pJS.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      }
      if(!this.img.ratio) this.img.ratio = 1;
      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg != undefined){
        pJS.fn.vendors.createSvgImg(this);
        if(pJS.tmp.pushing){
          this.img.loaded = false;
        }
      }
    }

    

  };


  pJS.fn.particle.prototype.draw = function() {

    var p = this;

    if(p.radius_bubble != undefined){
      var radius = p.radius_bubble; 
    }else{
      var radius = p.radius;
    }

    if(p.opacity_bubble != undefined){
      var opacity = p.opacity_bubble;
    }else{
      var opacity = p.opacity;
    }

    if(p.color.rgb){
      var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')';
    }else{
      var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+opacity+')';
    }

    pJS.canvas.ctx.fillStyle = color_value;
    pJS.canvas.ctx.beginPath();

    switch(p.shape){

      case 'circle':
        pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
      break;

      case 'edge':
        pJS.canvas.ctx.rect(p.x-radius, p.y-radius, radius*2, radius*2);
      break;

      case 'triangle':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x-radius, p.y+radius / 1.66, radius*2, 3, 2);
      break;

      case 'polygon':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius / (pJS.particles.shape.polygon.nb_sides/3.5), // startX
          p.y - radius / (2.66/3.5), // startY
          radius*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
      break;

      case 'star':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius*2 / (pJS.particles.shape.polygon.nb_sides/4), // startX
          p.y - radius / (2*2.66/3.5), // startY
          radius*2*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
      break;

      case 'image':

        function draw(){
          pJS.canvas.ctx.drawImage(
            img_obj,
            p.x-radius,
            p.y-radius,
            radius*2,
            radius*2 / p.img.ratio
          );
        }

        if(pJS.tmp.img_type == 'svg'){
          var img_obj = p.img.obj;
        }else{
          var img_obj = pJS.tmp.img_obj;
        }

        if(img_obj){
          draw();
        }

      break;

    }

    pJS.canvas.ctx.closePath();

    if(pJS.particles.shape.stroke.width > 0){
      pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color;
      pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width;
      pJS.canvas.ctx.stroke();
    }
    
    pJS.canvas.ctx.fill();
    
  };


  pJS.fn.particlesCreate = function(){
    for(var i = 0; i < pJS.particles.number.value; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value));
    }
  };

  pJS.fn.particlesUpdate = function(){

    for(var i = 0; i < pJS.particles.array.length; i++){

      /* the particle */
      var p = pJS.particles.array[i];

      // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if(pJS.particles.move.enable){
        var ms = pJS.particles.move.speed/2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if(pJS.particles.opacity.anim.enable) {
        if(p.opacity_status == true) {
          if(p.opacity >= pJS.particles.opacity.value) p.opacity_status = false;
          p.opacity += p.vo;
        }else {
          if(p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if(p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if(pJS.particles.size.anim.enable){
        if(p.size_status == true){
          if(p.radius >= pJS.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        }else{
          if(p.radius <= pJS.particles.size.anim.size_min) p.size_status = true;
          p.radius -= p.vs;
        }
        if(p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if(pJS.particles.move.out_mode == 'bounce'){
        var new_pos = {
          x_left: p.radius,
          x_right:  pJS.canvas.w,
          y_top: p.radius,
          y_bottom: pJS.canvas.h
        }
      }else{
        var new_pos = {
          x_left: -p.radius,
          x_right: pJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: pJS.canvas.h + p.radius
        }
      }

      if(p.x - p.radius > pJS.canvas.w){
        p.x = new_pos.x_left;
        p.y = Math.random() * pJS.canvas.h;
      }
      else if(p.x + p.radius < 0){
        p.x = new_pos.x_right;
        p.y = Math.random() * pJS.canvas.h;
      }
      if(p.y - p.radius > pJS.canvas.h){
        p.y = new_pos.y_top;
        p.x = Math.random() * pJS.canvas.w;
      }
      else if(p.y + p.radius < 0){
        p.y = new_pos.y_bottom;
        p.x = Math.random() * pJS.canvas.w;
      }

      /* out of canvas modes */
      switch(pJS.particles.move.out_mode){
        case 'bounce':
          if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius < 0) p.vy = -p.vy;
        break;
      }

      /* events */
      if(isInArray('grab', pJS.interactivity.events.onhover.mode)){
        pJS.fn.modes.grabParticle(p);
      }

      if(isInArray('bubble', pJS.interactivity.events.onhover.mode) || isInArray('bubble', pJS.interactivity.events.onclick.mode)){
        pJS.fn.modes.bubbleParticle(p);
      }

      if(isInArray('repulse', pJS.interactivity.events.onhover.mode) || isInArray('repulse', pJS.interactivity.events.onclick.mode)){
        pJS.fn.modes.repulseParticle(p);
      }

      /* interaction auto between particles */
      if(pJS.particles.line_linked.enable || pJS.particles.move.attract.enable){
        for(var j = i + 1; j < pJS.particles.array.length; j++){
          var p2 = pJS.particles.array[j];

          /* link particles */
          if(pJS.particles.line_linked.enable){
            pJS.fn.interact.linkParticles(p,p2);
          }

          /* attract particles */
          if(pJS.particles.move.attract.enable){
            pJS.fn.interact.attractParticles(p,p2);
          }

          /* bounce particles */
          if(pJS.particles.move.bounce){
            pJS.fn.interact.bounceParticles(p,p2);
          }

        }
      }


    }

  };

  pJS.fn.particlesDraw = function(){

    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* update each particles param */
    pJS.fn.particlesUpdate();

    /* draw each particle */
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p = pJS.particles.array[i];
      p.draw();
    }

  };

  pJS.fn.particlesEmpty = function(){
    pJS.particles.array = [];
  };

  pJS.fn.particlesRefresh = function(){

    /* init all */
    cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
    pJS.tmp.source_svg = undefined;
    pJS.tmp.img_obj = undefined;
    pJS.tmp.count_svg = 0;
    pJS.fn.particlesEmpty();
    pJS.fn.canvasClear();
    
    /* restart */
    pJS.fn.vendors.start();

  };


  /* ---------- pJS functions - particles interaction ------------ */

  pJS.fn.interact.linkParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if(dist <= pJS.particles.line_linked.distance){

      var opacity_line = pJS.particles.line_linked.opacity - (dist / (1/pJS.particles.line_linked.opacity)) / pJS.particles.line_linked.distance;

      if(opacity_line > 0){        
        
        /* style */
        var color_line = pJS.particles.line_linked.color_rgb_line;
        pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
        //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
        
        /* path */
        pJS.canvas.ctx.beginPath();
        pJS.canvas.ctx.moveTo(p1.x, p1.y);
        pJS.canvas.ctx.lineTo(p2.x, p2.y);
        pJS.canvas.ctx.stroke();
        pJS.canvas.ctx.closePath();

      }

    }

  };


  pJS.fn.interact.attractParticles  = function(p1, p2){

    /* condensed particles */
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    if(dist <= pJS.particles.line_linked.distance){

      var ax = dx/(pJS.particles.move.attract.rotateX*1000),
          ay = dy/(pJS.particles.move.attract.rotateY*1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;

    }
    

  }


  pJS.fn.interact.bounceParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy),
        dist_p = p1.radius+p2.radius;

    if(dist <= dist_p){
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }

  }


  /* ---------- pJS functions - modes events ------------ */

  pJS.fn.modes.pushParticles = function(nb, pos){

    pJS.tmp.pushing = true;

    for(var i = 0; i < nb; i++){
      pJS.particles.array.push(
        new pJS.fn.particle(
          pJS.particles.color,
          pJS.particles.opacity.value,
          {
            'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
            'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
          }
        )
      )
      if(i == nb-1){
        if(!pJS.particles.move.enable){
          pJS.fn.particlesDraw();
        }
        pJS.tmp.pushing = false;
      }
    }

  };


  pJS.fn.modes.removeParticles = function(nb){

    pJS.particles.array.splice(0, nb);
    if(!pJS.particles.move.enable){
      pJS.fn.particlesDraw();
    }

  };


  pJS.fn.modes.bubbleParticle = function(p){

    /* on hover event */
    if(pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)){

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
          ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;

      function init(){
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }

      /* mousemove - check ratio */
      if(dist_mouse <= pJS.interactivity.modes.bubble.distance){

        if(ratio >= 0 && pJS.interactivity.status == 'mousemove'){
          
          /* size */
          if(pJS.interactivity.modes.bubble.size != pJS.particles.size.value){

            if(pJS.interactivity.modes.bubble.size > pJS.particles.size.value){
              var size = p.radius + (pJS.interactivity.modes.bubble.size*ratio);
              if(size >= 0){
                p.radius_bubble = size;
              }
            }else{
              var dif = p.radius - pJS.interactivity.modes.bubble.size,
                  size = p.radius - (dif*ratio);
              if(size > 0){
                p.radius_bubble = size;
              }else{
                p.radius_bubble = 0;
              }
            }

          }

          /* opacity */
          if(pJS.interactivity.modes.bubble.opacity != pJS.particles.opacity.value){

            if(pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value){
              var opacity = pJS.interactivity.modes.bubble.opacity*ratio;
              if(opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity){
                p.opacity_bubble = opacity;
              }
            }else{
              var opacity = p.opacity - (pJS.particles.opacity.value-pJS.interactivity.modes.bubble.opacity)*ratio;
              if(opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity){
                p.opacity_bubble = opacity;
              }
            }

          }

        }

      }else{
        init();
      }


      /* mouseleave */
      if(pJS.interactivity.status == 'mouseleave'){
        init();
      }
    
    }

    /* on click event */
    else if(pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)){


      if(pJS.tmp.bubble_clicking){
        var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x,
            dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y,
            dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
            time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time)/1000;

        if(time_spent > pJS.interactivity.modes.bubble.duration){
          pJS.tmp.bubble_duration_end = true;
        }

        if(time_spent > pJS.interactivity.modes.bubble.duration*2){
          pJS.tmp.bubble_clicking = false;
          pJS.tmp.bubble_duration_end = false;
        }
      }


      function process(bubble_param, particles_param, p_obj_bubble, p_obj, id){

        if(bubble_param != particles_param){

          if(!pJS.tmp.bubble_duration_end){
            if(dist_mouse <= pJS.interactivity.modes.bubble.distance){
              if(p_obj_bubble != undefined) var obj = p_obj_bubble;
              else var obj = p_obj;
              if(obj != bubble_param){
                var value = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration);
                if(id == 'size') p.radius_bubble = value;
                if(id == 'opacity') p.opacity_bubble = value;
              }
            }else{
              if(id == 'size') p.radius_bubble = undefined;
              if(id == 'opacity') p.opacity_bubble = undefined;
            }
          }else{
            if(p_obj_bubble != undefined){
              var value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration),
                  dif = bubble_param - value_tmp;
                  value = bubble_param + dif;
              if(id == 'size') p.radius_bubble = value;
              if(id == 'opacity') p.opacity_bubble = value;
            }
          }

        }

      }

      if(pJS.tmp.bubble_clicking){
        /* size */
        process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size');
        /* opacity */
        process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
      }

    }

  };


  pJS.fn.modes.repulseParticle = function(p){

    if(pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      var normVec = {x: dx_mouse/dist_mouse, y: dy_mouse/dist_mouse},
          repulseRadius = pJS.interactivity.modes.repulse.distance,
          velocity = 100,
          repulseFactor = clamp((1/repulseRadius)*(-1*Math.pow(dist_mouse/repulseRadius,2)+1)*repulseRadius*velocity, 0, 50);
      
      var pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor
      }

      if(pJS.particles.move.out_mode == 'bounce'){
        if(pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x;
        if(pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y;
      }else{
        p.x = pos.x;
        p.y = pos.y;
      }
    
    }


    else if(pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {

      if(!pJS.tmp.repulse_finish){
        pJS.tmp.repulse_count++;
        if(pJS.tmp.repulse_count == pJS.particles.array.length){
          pJS.tmp.repulse_finish = true;
        }
      }

      if(pJS.tmp.repulse_clicking){

        var repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance/6, 3);

        var dx = pJS.interactivity.mouse.click_pos_x - p.x,
            dy = pJS.interactivity.mouse.click_pos_y - p.y,
            d = dx*dx + dy*dy;

        var force = -repulseRadius / d * 1;

        function process(){

          var f = Math.atan2(dy,dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if(pJS.particles.move.out_mode == 'bounce'){
            var pos = {
              x: p.x + p.vx,
              y: p.y + p.vy
            }
            if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
            else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
            else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }

        }

        // default
        if(d <= repulseRadius){
          process();
        }

        // bang - slow motion mode
        // if(!pJS.tmp.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }
        

      }else{

        if(pJS.tmp.repulse_clicking == false){

          p.vx = p.vx_i;
          p.vy = p.vy_i;
        
        }

      }

    }

  }


  pJS.fn.modes.grabParticle = function(p){

    if(pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove'){

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if(dist_mouse <= pJS.interactivity.modes.grab.distance){

        var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1/pJS.interactivity.modes.grab.line_linked.opacity)) / pJS.interactivity.modes.grab.distance;

        if(opacity_line > 0){

          /* style */
          var color_line = pJS.particles.line_linked.color_rgb_line;
          pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
          //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
          
          /* path */
          pJS.canvas.ctx.beginPath();
          pJS.canvas.ctx.moveTo(p.x, p.y);
          pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
          pJS.canvas.ctx.stroke();
          pJS.canvas.ctx.closePath();

        }

      }

    }

  };



  /* ---------- pJS functions - vendors ------------ */

  pJS.fn.vendors.eventsListeners = function(){

    /* events target element */
    if(pJS.interactivity.detect_on == 'window'){
      pJS.interactivity.el = window;
    }else{
      pJS.interactivity.el = pJS.canvas.el;
    }


    /* detect mouse pos - on hover / click event */
    if(pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable){

      /* el on mousemove */
      pJS.interactivity.el.addEventListener('mousemove', function(e){

        if(pJS.interactivity.el == window){
          var pos_x = e.clientX,
              pos_y = e.clientY;
        }
        else{
          var pos_x = e.offsetX || e.clientX,
              pos_y = e.offsetY || e.clientY;
        }

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if(pJS.tmp.retina){
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';

      });

      /* el on onmouseleave */
      pJS.interactivity.el.addEventListener('mouseleave', function(e){

        pJS.interactivity.mouse.pos_x = null;
        pJS.interactivity.mouse.pos_y = null;
        pJS.interactivity.status = 'mouseleave';

      });

    }

    /* on click event */
    if(pJS.interactivity.events.onclick.enable){

      pJS.interactivity.el.addEventListener('click', function(){

        pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
        pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
        pJS.interactivity.mouse.click_time = new Date().getTime();

        if(pJS.interactivity.events.onclick.enable){

          switch(pJS.interactivity.events.onclick.mode){

            case 'push':
              if(pJS.particles.move.enable){
                pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
              }else{
                if(pJS.interactivity.modes.push.particles_nb == 1){
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                }
                else if(pJS.interactivity.modes.push.particles_nb > 1){
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb);
                }
              }
            break;

            case 'remove':
              pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);
            break;

            case 'bubble':
              pJS.tmp.bubble_clicking = true;
            break;

            case 'repulse':
              pJS.tmp.repulse_clicking = true;
              pJS.tmp.repulse_count = 0;
              pJS.tmp.repulse_finish = false;
              setTimeout(function(){
                pJS.tmp.repulse_clicking = false;
              }, pJS.interactivity.modes.repulse.duration*1000)
            break;

          }

        }

      });
        
    }


  };

  pJS.fn.vendors.densityAutoParticles = function(){

    if(pJS.particles.number.density.enable){

      /* calc area */
      var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
      if(pJS.tmp.retina){
        area = area/(pJS.canvas.pxratio*2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = pJS.particles.array.length - nb_particles;
      if(missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));
      else pJS.fn.modes.removeParticles(missing_particles);

    }

  };


  pJS.fn.vendors.checkOverlap = function(p1, position){
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p2 = pJS.particles.array[i];

      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx*dx + dy*dy);

      if(dist <= p1.radius + p2.radius){
        p1.x = position ? position.x : Math.random() * pJS.canvas.w;
        p1.y = position ? position.y : Math.random() * pJS.canvas.h;
        pJS.fn.vendors.checkOverlap(p1);
      }
    }
  };


  pJS.fn.vendors.createSvgImg = function(p){

    /* set color to svg element */
    var svgXml = pJS.tmp.source_svg,
        rgbHex = /#([0-9A-F]{3,6})/gi,
        coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
          if(p.color.rgb){
            var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+p.opacity+')';
          }else{
            var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+p.opacity+')';
          }
          return color_value;
        });

    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], {type: 'image/svg+xml;charset=utf-8'}),
        DOMURL = window.URL || window.webkitURL || window,
        url = DOMURL.createObjectURL(svg);

    /* create particle img obj */
    var img = new Image();
    img.addEventListener('load', function(){
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      pJS.tmp.count_svg++;
    });
    img.src = url;

  };


  pJS.fn.vendors.destroypJS = function(){
    cancelAnimationFrame(pJS.fn.drawAnimFrame);
    canvas_el.remove();
    pJSDom = null;
  };


  pJS.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator){

    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0,0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength,0);
      c.translate(sideLength,0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();

  };

  pJS.fn.vendors.exportImg = function(){
    window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
  };


  pJS.fn.vendors.loadImg = function(type){

    pJS.tmp.img_error = undefined;

    if(pJS.particles.shape.image.src != ''){

      if(type == 'svg'){

        var xhr = new XMLHttpRequest();
        xhr.open('GET', pJS.particles.shape.image.src);
        xhr.onreadystatechange = function (data) {
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              pJS.tmp.source_svg = data.currentTarget.response;
              pJS.fn.vendors.checkBeforeDraw();
            }else{
              console.log('Error pJS - Image not found');
              pJS.tmp.img_error = true;
            }
          }
        }
        xhr.send();

      }else{

        var img = new Image();
        img.addEventListener('load', function(){
          pJS.tmp.img_obj = img;
          pJS.fn.vendors.checkBeforeDraw();
        });
        img.src = pJS.particles.shape.image.src;

      }

    }else{
      console.log('Error pJS - No image.src');
      pJS.tmp.img_error = true;
    }

  };


  pJS.fn.vendors.draw = function(){

    if(pJS.particles.shape.type == 'image'){

      if(pJS.tmp.img_type == 'svg'){

        if(pJS.tmp.count_svg >= pJS.particles.number.value){
          pJS.fn.particlesDraw();
          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }else{
          //console.log('still loading...');
          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      }else{

        if(pJS.tmp.img_obj != undefined){
          pJS.fn.particlesDraw();
          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }else{
          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      }

    }else{
      pJS.fn.particlesDraw();
      if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
      else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
    }

  };


  pJS.fn.vendors.checkBeforeDraw = function(){

    // if shape is image
    if(pJS.particles.shape.type == 'image'){

      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg == undefined){
        pJS.tmp.checkAnimFrame = requestAnimFrame(check);
      }else{
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);
        if(!pJS.tmp.img_error){
          pJS.fn.vendors.init();
          pJS.fn.vendors.draw();
        }
        
      }

    }else{
      pJS.fn.vendors.init();
      pJS.fn.vendors.draw();
    }

  };


  pJS.fn.vendors.init = function(){

    /* init canvas + particles */
    pJS.fn.retinaInit();
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.vendors.densityAutoParticles();

    /* particles.line_linked - convert hex colors to rgb */
    pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

  };


  pJS.fn.vendors.start = function(){

    if(isInArray('image', pJS.particles.shape.type)){
      pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3);
      pJS.fn.vendors.loadImg(pJS.tmp.img_type);
    }else{
      pJS.fn.vendors.checkBeforeDraw();
    }

  };




  /* ---------- pJS - start ------------ */


  pJS.fn.vendors.eventsListeners();

  pJS.fn.vendors.start();
  


};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


/* ---------- particles.js functions - start ------------ */

window.pJSDom = [];

window.particlesJS = function(tag_id, params){

  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if(!tag_id){
    tag_id = 'particles-js';
  }

  /* pJS elements */
  var pJS_tag = document.getElementById(tag_id),
      pJS_canvas_class = 'particles-js-canvas-el',
      exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

  /* remove canvas if exists into the pJS target tag */
  if(exist_canvas.length){
    while(exist_canvas.length > 0){
      pJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = pJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if(canvas != null){
    pJSDom.push(new pJS(tag_id, params));
  }

};

window.particlesJS.load = function(tag_id, path_config_json, callback){

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if(callback) callback();
      }else{
        console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
        console.log('Error pJS - File config not found');
      }
    }
  };
  xhr.send();

};
function chartistScroll(scrollbarOptions) {

    return _chartistScoll;

    function _writeStyles(styleName, cssRules) {
        var styleElement = document.getElementById(styleName);
        var pastCssRules = (styleElement && styleElement.textContent) ? styleElement.textContent : null;

        if (styleElement) {
            document.getElementsByTagName('head')[0].removeChild(
                styleElement);
        }

        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = styleName;


        if (cssRules.length) {
            for (var css of cssRules) {
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        else {
            styleElement.innerHTML = cssText;
        }

        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }

    function _chartistScoll(chart) {

        var cssRules = [
            '#' + chart.container.id + ' { overflow-x: scroll; overflow-y: hidden; }',
            '#' + chart.container.id + '::-webkit-scrollbar {  width: ' + ((scrollbarOptions && scrollbarOptions.width) ? scrollbarOptions.width : '10px' ) +  '; height: ' + ((scrollbarOptions && scrollbarOptions.height) ? scrollbarOptions.height : '10px' ) +  '; background-color: #F5F5F5; }',
            '#' + chart.container.id + '::-webkit-scrollbar * { background: transparent; }',
            '#' + chart.container.id + '::-webkit-scrollbar-thumb { border-radius: 14px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); background: ' + ((scrollbarOptions && scrollbarOptions.scollbarColor) ? scrollbarOptions.scollbarColor + '!important' : 'rgba(0, 0, 0, 0.4) !important' ) +  '; }',
            '#' + chart.container.id + '::-webkit-scrollbar-track {  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 10px; background-color: ' + ((scrollbarOptions && scrollbarOptions.backgroundColor) ? scrollbarOptions.backgroundColor : '#F5F5F5' ) +  '; }',
        ];

        _writeStyles("_chartistStyles", cssRules);

    }

};