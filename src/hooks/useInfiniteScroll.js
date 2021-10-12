import { useState, useEffect } from 'react'


// arguments explained:
// triggerEl - DOM node to watch using the IntersectionObserver
// callback - function to call when 'triggerEl' is visible in the viewport
// options (optional) - custom IntersectionObserver options to overwrite the default options with

export default function useInfiniteScroll(triggerEl, callback, options) {
  // overwrite default IntersectionObserver options if necessary
  const config = {
    root: options?.root || null,
    rootMargin: options?.rootMargin || '0px 0px 0px 0px',
    threshold: options?.threshold || 1,
  }


  // create and initialize IntersectionObserver
  const [observer, setObserver] = useState(null)

  useEffect(() => {
    setObserver(new IntersectionObserver(handleObserver, config))
  }, [])

  useEffect(() => {
    if (triggerEl) {
      observer.observe(triggerEl)
    }
  }, [triggerEl])


  // save last scroll position
  let prevYPos = 0

  const handleObserver = ([entry]) => {
    const yPos = entry.boundingClientRect.y

    // prevent IntersectionObserver from firing on page load and firing twice on scroll
    if (prevYPos > yPos) {
      callback()
    }

    prevYPos = yPos
  }
}
