// Debounce for navbar - From https://www.prwhite.io/blog/sticky-navbar-hides-scroll
export function debounce(func, wait, immediate) {
    let timeout
    return function() {
        var context = this, args = arguments
        var later = function() {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        var callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}