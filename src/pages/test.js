import { useState, useRef } from 'react'

const pageSize = 5
export default function Component() {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  const isBottomVisible = useIntersectionObserver(ref, { threshold: 0}, false)

  useEffect(() => {
    //load next page when bottom is visible
    isBottomVisible && setCount(count + 1)
  }, [isBottomVisible])

  return (
    <div className="App">
      {(() => {
        const children = []
        for (let i = 1; i <= count * pageSize; i++) {
          children.push(<Component key={i} id={i} />)
        }
        return children
      })()}
      <div ref={ref} style={{ width: '100%', height: '20px' }}>
        Bottom
      </div>
    </div>
  )
}