import { useEffect, useState, useRef, useCallback } from "react"
import Pin from "./Pin"
import "./MasonryGrid.css"

function MasonryGrid({ pins, onPinClick }) {
  const [columns, setColumns] = useState(4)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 })
  const gridRef = useRef(null)
  const observer = useRef(null)

  // Responsive columns based on screen width with ResizeObserver
  useEffect(() => {
    const updateColumns = (width) => {
      if (width < 640) setColumns(2)
      else if (width < 768) setColumns(3)
      else if (width < 1024) setColumns(4)
      else setColumns(5)
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        updateColumns(entry.contentRect.width)
      }
    })

    if (gridRef.current) {
      resizeObserver.observe(gridRef.current)
      updateColumns(gridRef.current.offsetWidth)
    }

    return () => resizeObserver.disconnect()
  }, [])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const handleIntersect = (entries) => {
      const lastEntry = entries[entries.length - 1]
      if (lastEntry.isIntersecting && visibleRange.end < pins.length) {
        setVisibleRange(prev => ({
          start: prev.start,
          end: Math.min(prev.end + 10, pins.length)
        }))
      }
    }

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "100px",
      threshold: 0.1
    })

    const currentObserver = observer.current
    if (gridRef.current) {
      currentObserver.observe(gridRef.current.lastElementChild)
    }

    return () => currentObserver.disconnect()
  }, [pins.length, visibleRange])

  // Distribute pins into columns efficiently
  const distributeColumns = useCallback(() => {
    const columnArrays = Array.from({ length: columns }, () => [])
    const columnHeights = Array(columns).fill(0)

    pins.slice(visibleRange.start, visibleRange.end).forEach((pin) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights))
      columnArrays[shortestColumn].push(pin)
      columnHeights[shortestColumn] += pin.aspectRatio || 1
    })

    return columnArrays
  }, [columns, pins, visibleRange])

  const columnArrays = distributeColumns()

  // Empty state
  if (pins.length === 0) {
    return (
      <div className="masonry-empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
          <path d="M14.5 11l-3 3.01L9 11.5l-3 3.01V16h12v-3z"/>
        </svg>
        <h2>No pins found</h2>
        <p>Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="masonry-grid" ref={gridRef} style={{ "--columns": columns }}>
      {columnArrays.map((column, columnIndex) => (
        <div key={columnIndex} className="masonry-column">
          {column.map((pin) => (
            <Pin key={pin.id} pin={pin} onClick={() => onPinClick(pin)} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default MasonryGrid
