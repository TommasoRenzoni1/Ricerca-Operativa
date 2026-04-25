import React from 'react'
import useMealStore from '../store/useMealStore.js'

export default function DailyPlanSummary() {
  const getPlanItems = useMealStore((s) => s.getPlanItems)
  const items = getPlanItems()

  return (
    <div className="aero-glass p-4 h-full">
      <h3 className="text-sm font-semibold text-gray-300 text-aero uppercase tracking-wider mb-3">
        Daily Plan Summary
      </h3>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500 text-aero italic">
          No meals selected yet. Add portions from the recipe library below.
        </p>
      ) : (
        <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center text-sm py-1 border-b border-white/5"
            >
              <span className="text-gray-300 text-aero truncate mr-2">
                {item.count}x {item.name}
              </span>
              <span className="text-gray-500 text-xs shrink-0">
                {item.calories * item.count} kcal
              </span>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-3 pt-2 border-t border-white/10 text-xs text-gray-400 text-aero">
          {items.map((item) => `${item.count}x ${item.name.split(': ')[1] || item.name}`).join(', ')}
        </div>
      )}
    </div>
  )
}
