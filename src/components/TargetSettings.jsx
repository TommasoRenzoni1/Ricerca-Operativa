import React from 'react'
import useMealStore from '../store/useMealStore.js'

const FIELDS = [
  { key: 'calories', label: 'Calories', unit: 'kcal' },
  { key: 'protein', label: 'Protein', unit: 'g' },
  { key: 'fats', label: 'Fats', unit: 'g' },
  { key: 'carbs', label: 'Carbs', unit: 'g' },
]

export default function TargetSettings() {
  const targets = useMealStore((s) => s.targets)
  const setTarget = useMealStore((s) => s.setTarget)

  return (
    <div className="aero-glass p-4 h-full">
      <h3 className="text-sm font-semibold text-gray-300 text-aero uppercase tracking-wider mb-3">
        Daily Targets
      </h3>
      <div className="space-y-3">
        {FIELDS.map(({ key, label, unit }) => (
          <div key={key} className="flex items-center gap-3">
            <label className="text-sm text-gray-300 text-aero w-16 shrink-0">
              {label}
            </label>
            <input
              type="number"
              className="aero-input flex-1"
              value={targets[key]}
              min={0}
              onChange={(e) => setTarget(key, Math.max(0, Number(e.target.value) || 0))}
            />
            <span className="text-xs text-gray-500 w-8">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
