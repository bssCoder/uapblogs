import { useState, useCallback } from "react"
import Header from "./components/Header"
import MasonryGrid from "./components/MasonryGrid"
import PinModal from "./components/PinModal"
import pins from "./data/pins"
import "./App.css"

function App() {
  const [selectedPin, setSelectedPin] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const filteredPins = useCallback(() => {
    if (!searchQuery.trim()) return pins

    const query = searchQuery.toLowerCase()
    return pins.filter(pin =>
      pin.title.toLowerCase().includes(query) ||
      pin.description.toLowerCase().includes(query) ||
      pin.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }, [searchQuery])

  const handlePinClick = useCallback((pin) => {
    setSelectedPin(pin)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedPin(null)
  }, [])

  const handleSearch = useCallback((query) => {
    setIsLoading(true)
    setError(null)
    setSearchQuery(query)

    // Simulate API delay
    setTimeout(() => {
      try {
        setIsLoading(false)
      } catch (err) {
        setError("Failed to search pins. Please try again.")
        setIsLoading(false)
      }
    }, 300)
  }, [])

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <svg viewBox="0 0 24 24" className="error-icon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="error-retry">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <main className="main-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span>Loading pins...</span>
          </div>
        ) : (
          <MasonryGrid 
            pins={filteredPins()} 
            onPinClick={handlePinClick} 
          />
        )}
        {selectedPin && (
          <PinModal 
            pin={selectedPin} 
            onClose={handleCloseModal}
          />
        )}
      </main>
    </div>
  )
}

export default App