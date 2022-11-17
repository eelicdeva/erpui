/**
 * Math.easeInOutQuad
 * @param  {number} t //currentTime, 
 * @param  {number} b //starting position, 
 * @param  {number} c //change, 
 * @param  {number} d //duration
 * t: This parameter holds the specified time when animation will start. For example, if value of t is 0, it means animation is just started.
 * b: This parameter holds the specified starting position of the object on x-axis. For example, if value of b is 10, it means the starting position of the objects on x-coordinate is 10.
 * c: This parameter holds the specified change in value for the object. For example, if value of c is 30, it means, the object has to move 30 to the right, ending at 40.
 * d: This parameter holds the specified duration of the whole process. For example, if the value of d is 2, it means, the object has 2 second to perform this motion from 10 to 40.
 * Return Value: This method returns the eased position of the object i.e., the position of the object at a specific time.
 */
const easeInOutQuad  = function(t: number, b: number, c: number, d: number) {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function() {
  return window.requestAnimationFrame || (window as any).webkitRequestAnimationFrame || (window as any).mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60) }
})()

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(amount: number) {
  document.documentElement.scrollTop = amount;
  (document.body.parentNode as HTMLElement).scrollTop = amount;
  document.body.scrollTop = amount;
}

function position() {
  return document.documentElement.scrollTop || (document.body.parentNode as HTMLElement).scrollTop || document.body.scrollTop
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
export function scrollTo(to: number, duration: number, callback: (() => void) | undefined) {
  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0
  duration = (typeof (duration) === 'undefined') ? 500 : duration
  var animateScroll = function() {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    var val = easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}
