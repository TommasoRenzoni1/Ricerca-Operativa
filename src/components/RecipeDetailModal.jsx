import React from 'react'

export default function RecipeDetailModal({ recipe, onClose }) {
  if (!recipe) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
        {/* Title bar */}
        <div className="modal-title-bar">
          <h3 className="text-sm font-semibold text-gray-200 text-aero truncate pr-4">
            {recipe.name}
          </h3>
          <button className="modal-close-btn" onClick={onClose}>
            &#x2715;
          </button>
        </div>

        <div className="p-5 relative z-10">
          {/* Image */}
          {recipe.image && (
            <div className="rounded-lg overflow-hidden mb-4 border border-white/10">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full max-h-64 object-cover"
              />
            </div>
          )}

          {/* Macros bar */}
          <div className="grid grid-cols-4 gap-3 text-center mb-4">
            <div className="aero-glass p-2">
              <div className="text-xs text-gray-500">Calories</div>
              <div className="text-base font-bold text-orange-300 text-aero">{recipe.calories}</div>
            </div>
            <div className="aero-glass p-2">
              <div className="text-xs text-gray-500">Protein</div>
              <div className="text-base font-bold text-blue-300 text-aero">{recipe.protein}g</div>
            </div>
            <div className="aero-glass p-2">
              <div className="text-xs text-gray-500">Fats</div>
              <div className="text-base font-bold text-yellow-300 text-aero">{recipe.fats}g</div>
            </div>
            <div className="aero-glass p-2">
              <div className="text-xs text-gray-500">Carbs</div>
              <div className="text-base font-bold text-purple-300 text-aero">{recipe.carbs}g</div>
            </div>
          </div>

          {/* Instructions */}
          {recipe.instructions && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 text-aero uppercase tracking-wider mb-2">
                Instructions
              </h4>
              <div
                className="text-sm text-gray-300 text-aero leading-relaxed whitespace-pre-wrap"
                style={{
                  background: 'rgba(10, 12, 18, 0.5)',
                  borderRadius: '8px',
                  padding: '12px',
                  border: '1px solid rgba(100, 120, 150, 0.12)',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                }}
              >
                {recipe.instructions}
              </div>
            </div>
          )}

          {!recipe.instructions && !recipe.image && (
            <p className="text-sm text-gray-500 text-aero italic text-center py-4">
              No additional details available for this recipe.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
