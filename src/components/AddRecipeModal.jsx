import React, { useState, useRef } from 'react'
import useMealStore from '../store/useMealStore.js'

export default function AddRecipeModal({ onClose }) {
  const addCustomRecipe = useMealStore((s) => s.addCustomRecipe)
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageBase64, setImageBase64] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [fats, setFats] = useState('')
  const [carbs, setCarbs] = useState('')
  const [instructions, setInstructions] = useState('')
  const fileRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageBase64(reader.result)
      setImageUrl('')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return

    const recipe = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      fats: Number(fats) || 0,
      carbs: Number(carbs) || 0,
      image: imageBase64 || imageUrl || null,
      instructions: instructions.trim() || null,
      isCustom: true,
    }

    addCustomRecipe(recipe)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
        {/* Title bar */}
        <div className="modal-title-bar">
          <h3 className="text-sm font-semibold text-gray-200 text-aero">
            Add Custom Recipe
          </h3>
          <button className="modal-close-btn" onClick={onClose}>
            &#x2715;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 relative z-10">
          {/* Recipe Name */}
          <div>
            <label className="block text-xs text-gray-400 text-aero mb-1 uppercase tracking-wider">
              Recipe Name
            </label>
            <input
              type="text"
              className="aero-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Pranzo: Insalata di Quinoa"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-xs text-gray-400 text-aero mb-1 uppercase tracking-wider">
              Image (URL or upload)
            </label>
            <input
              type="url"
              className="aero-input mb-2"
              value={imageUrl}
              onChange={(e) => { setImageUrl(e.target.value); setImageBase64('') }}
              placeholder="https://example.com/image.jpg"
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="aero-btn text-xs py-1.5 px-3"
                onClick={() => fileRef.current?.click()}
              >
                Upload File
              </button>
              {imageBase64 && (
                <span className="text-xs text-green-400">Image loaded</span>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Macros */}
          <div>
            <label className="block text-xs text-gray-400 text-aero mb-1 uppercase tracking-wider">
              Macros &amp; Energy
            </label>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <span className="text-[10px] text-gray-500">Calories</span>
                <input
                  type="number"
                  className="aero-input"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="kcal"
                  min={0}
                />
              </div>
              <div>
                <span className="text-[10px] text-gray-500">Protein (g)</span>
                <input
                  type="number"
                  className="aero-input"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  placeholder="g"
                  min={0}
                />
              </div>
              <div>
                <span className="text-[10px] text-gray-500">Fats (g)</span>
                <input
                  type="number"
                  className="aero-input"
                  value={fats}
                  onChange={(e) => setFats(e.target.value)}
                  placeholder="g"
                  min={0}
                />
              </div>
              <div>
                <span className="text-[10px] text-gray-500">Carbs (g)</span>
                <input
                  type="number"
                  className="aero-input"
                  value={carbs}
                  onChange={(e) => setCarbs(e.target.value)}
                  placeholder="g"
                  min={0}
                />
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-xs text-gray-400 text-aero mb-1 uppercase tracking-wider">
              Recipe Instructions
            </label>
            <textarea
              className="aero-input min-h-[100px] resize-y"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Write the preparation steps here..."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="aero-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="aero-btn aero-btn-accent">
              Save Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
