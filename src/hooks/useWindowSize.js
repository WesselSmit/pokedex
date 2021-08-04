import { useState, useEffect } from 'react'


export default function useWindowSize() {
  // set default values
  const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined })

  // setup listener
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    
    // set initial window size in state
    handleResize()
  
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // update state
  function handleResize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }

  return windowSize
}