import React, { useState } from 'react'
import TargetSettings from './components/TargetSettings.jsx'
import ProgressBars from './components/ProgressBars.jsx'
import RecipeLibrary from './components/RecipeLibrary.jsx'
import DailyPlanSummary from './components/DailyPlanSummary.jsx'
import MicronutrientChecker from './components/MicronutrientChecker.jsx'
import ResetButton from './components/ResetButton.jsx'
import AddRecipeModal from './components/AddRecipeModal.jsx'
import RecipeDetailModal from './components/RecipeDetailModal.jsx'

export default function App() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [detailRecipe, setDetailRecipe] = useState(null)

  return (
    <div className="min-h-screen relative px-4 py-6 md:px-8 md:py-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-aero-glow tracking-wide">
          Knapsack Meal Planner
        </h1>
        <p className="text-sm md:text-base text-gray-400 mt-1 text-aero">
          Daily macro planning with the knapsack algorithm approach
        </p>
      </header>

      {/* Progress Bars */}
      <section className="mb-6">
        <ProgressBars />
      </section>

      {/* Top row: Targets + Micros + Reset */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-1">
          <TargetSettings />
        </div>
        <div className="lg:col-span-1">
          <DailyPlanSummary />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          <MicronutrientChecker />
          <ResetButton />
        </div>
      </section>

      {/* Recipe Library */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-aero-glow">Recipe Library</h2>
          <button
            className="aero-btn aero-btn-accent"
            onClick={() => setShowAddModal(true)}
          >
            + Add Custom Recipe
          </button>
        </div>
        <RecipeLibrary onViewDetail={setDetailRecipe} />
      </section>

      {/* Modals */}
      {showAddModal && (
        <AddRecipeModal onClose={() => setShowAddModal(false)} />
      )}
      {detailRecipe && (
        <RecipeDetailModal
          recipe={detailRecipe}
          onClose={() => setDetailRecipe(null)}
        />
      )}
    </div>
  )
}
