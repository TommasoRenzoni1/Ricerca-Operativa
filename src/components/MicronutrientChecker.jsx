import React from 'react'
import useMealStore from '../store/useMealStore.js'

const MICRO_LABELS = [
  'Vitamins & Minerals',
  'Fiber & Hydration',
  'Omega-3 & Healthy Fats',
]

export default function MicronutrientChecker() {
  const micros = useMealStore((s) => s.micros)
  const toggleMicro = useMealStore((s) => s.toggleMicro)
  const allChecked = micros.every(Boolean)

  return (
    <div className="aero-glass p-4">
      <h3 className="text-sm font-semibold text-gray-300 text-aero uppercase tracking-wider mb-3">
        Micronutrient Checker
      </h3>
      <div className="space-y-2">
        {MICRO_LABELS.map((label, idx) => (
          <label
            key={idx}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="orb-checkbox"
              checked={micros[idx]}
              onChange={() => toggleMicro(idx)}
            />
            <span className="text-sm text-gray-300 text-aero group-hover:text-gray-200 transition-colors">
              {label}
            </span>
          </label>
        ))}
      </div>
      {allChecked && (
        <div className="mt-3">
          <span className="micro-badge">
            <span>&#x2728;</span>
            Micronutrients: OK!
          </span>
        </div>
      )}
    </div>
  )
}
