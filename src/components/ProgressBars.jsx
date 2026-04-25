import React from 'react'
import useMealStore from '../store/useMealStore.js'

const MACRO_CONFIG = [
  { key: 'calories', label: 'Calories', unit: 'kcal', color: 'cyan' },
  { key: 'protein', label: 'Protein', unit: 'g', color: 'blue' },
  { key: 'fats', label: 'Fats', unit: 'g', color: 'amber' },
  { key: 'carbs', label: 'Carbs', unit: 'g', color: 'purple' },
]

function getBarClass(ratio) {
  if (ratio >= 1.05) return 'progress-fill-red'
  if (ratio >= 0.95) return 'progress-fill-green'
  return 'progress-fill-default'
}

export default function ProgressBars() {
  const targets = useMealStore((s) => s.targets)
  const getTotals = useMealStore((s) => s.getTotals)
  const totals = getTotals()

  return (
    <div className="aero-glass p-4 md:p-5">
      <h3 className="text-sm font-semibold text-gray-300 text-aero uppercase tracking-wider mb-4">
        Daily Macro Progress
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MACRO_CONFIG.map(({ key, label, unit }) => {
          const target = targets[key] || 1
          const current = totals[key]
          const ratio = current / target
          const pct = Math.min(ratio * 100, 100)

          return (
            <div key={key}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-medium text-gray-300 text-aero">{label}</span>
                <span className="text-xs text-gray-400 text-aero">
                  {current} / {target} {unit} ({Math.round(ratio * 100)}%)
                </span>
              </div>
              <div className="progress-tube">
                <div
                  className={`progress-fill ${getBarClass(ratio)}`}
                  style={{ width: `${pct}%` }}
                />
                <div className="progress-label">
                  {Math.round(ratio * 100)}%
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
