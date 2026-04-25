import React, { useState } from 'react'
import useMealStore from '../store/useMealStore.js'

export default function ResetButton() {
  const resetPlan = useMealStore((s) => s.resetPlan)
  const [confirming, setConfirming] = useState(false)

  const handleClick = () => {
    if (confirming) {
      resetPlan()
      setConfirming(false)
    } else {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
    }
  }

  return (
    <div className="aero-glass p-4 flex items-center justify-center">
      <button
        className={`aero-btn aero-btn-danger w-full text-base py-3 ${confirming ? 'animate-pulse' : ''}`}
        onClick={handleClick}
      >
        {confirming ? 'Click again to confirm reset' : 'Reset Daily Plan'}
      </button>
    </div>
  )
}
