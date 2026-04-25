import React from 'react'
import useMealStore from '../store/useMealStore.js'

const MEAL_ICONS = {
  r1: '\u2615',  // coffee - colazione
  r2: '\uD83C\uDF5D',  // spaghetti - pasta
  r3: '\uD83C\uDF63',  // sushi - salmone
  r4: '\uD83E\uDD5C',  // peanuts - frutta secca
  r5: '\uD83E\uDD64',  // cup with straw - frullato
  r6: '\uD83C\uDF55',  // pizza
}

export default function RecipeLibrary({ onViewDetail }) {
  const recipes = useMealStore((s) => s.recipes)
  const plan = useMealStore((s) => s.plan)
  const addPortion = useMealStore((s) => s.addPortion)
  const removePortion = useMealStore((s) => s.removePortion)
  const deleteCustomRecipe = useMealStore((s) => s.deleteCustomRecipe)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => {
        const count = plan[recipe.id] || 0
        const hasDetail = recipe.instructions || recipe.image

        return (
          <div key={recipe.id} className="aero-glass p-4 flex flex-col">
            {/* Image / Icon area */}
            <div
              className={`h-24 rounded-lg mb-3 flex items-center justify-center text-4xl overflow-hidden ${hasDetail ? 'cursor-pointer' : ''}`}
              style={{
                background: 'linear-gradient(135deg, rgba(15, 18, 28, 0.6), rgba(25, 30, 42, 0.5))',
                border: '1px solid rgba(100, 120, 150, 0.12)',
              }}
              onClick={() => hasDetail && onViewDetail(recipe)}
            >
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span>{MEAL_ICONS[recipe.id] || '\uD83C\uDF7D\uFE0F'}</span>
              )}
            </div>

            {/* Name */}
            <h4 className="text-sm font-semibold text-gray-200 text-aero mb-2 leading-tight">
              {recipe.name}
              {hasDetail && (
                <button
                  className="ml-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  onClick={() => onViewDetail(recipe)}
                  title="View details"
                >
                  \u24D8
                </button>
              )}
            </h4>

            {/* Macros */}
            <div className="grid grid-cols-4 gap-1 text-center mb-3">
              <div>
                <div className="text-xs text-gray-500">Cal</div>
                <div className="text-sm font-semibold text-orange-300 text-aero">{recipe.calories}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">P</div>
                <div className="text-sm font-semibold text-blue-300 text-aero">{recipe.protein}g</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">F</div>
                <div className="text-sm font-semibold text-yellow-300 text-aero">{recipe.fats}g</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">C</div>
                <div className="text-sm font-semibold text-purple-300 text-aero">{recipe.carbs}g</div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="aero-btn aero-btn-round"
                  onClick={() => removePortion(recipe.id)}
                  disabled={count === 0}
                  style={{ opacity: count === 0 ? 0.4 : 1 }}
                >
                  &minus;
                </button>
                <span className="text-lg font-bold text-aero w-8 text-center">{count}</span>
                <button
                  className="aero-btn aero-btn-accent aero-btn-round"
                  onClick={() => addPortion(recipe.id)}
                >
                  +
                </button>
              </div>
              {recipe.isCustom && (
                <button
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  onClick={() => deleteCustomRecipe(recipe.id)}
                  title="Delete custom recipe"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
