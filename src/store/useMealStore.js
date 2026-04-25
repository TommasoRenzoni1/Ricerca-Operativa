import { create } from 'zustand'

const DEFAULT_RECIPES = [
  {
    id: 'r1',
    name: 'Colazione: Porridge Potenziato',
    calories: 500,
    protein: 25,
    fats: 15,
    carbs: 60,
    image: null,
    instructions: null,
    isCustom: false,
  },
  {
    id: 'r2',
    name: 'Pranzo: Pasta Ragu e Pollo',
    calories: 800,
    protein: 45,
    fats: 20,
    carbs: 110,
    image: null,
    instructions: null,
    isCustom: false,
  },
  {
    id: 'r3',
    name: 'Cena: Riso, Salmone e Zucchine',
    calories: 700,
    protein: 40,
    fats: 25,
    carbs: 80,
    image: null,
    instructions: null,
    isCustom: false,
  },
  {
    id: 'r4',
    name: 'Spuntino: Frutta secca e Yogurt',
    calories: 350,
    protein: 20,
    fats: 15,
    carbs: 30,
    image: null,
    instructions: null,
    isCustom: false,
  },
  {
    id: 'r5',
    name: 'Spuntino: Frullato Rapido',
    calories: 450,
    protein: 20,
    fats: 15,
    carbs: 60,
    image: null,
    instructions: null,
    isCustom: false,
  },
  {
    id: 'r6',
    name: 'Sgarro: Pizza Margherita',
    calories: 850,
    protein: 35,
    fats: 25,
    carbs: 120,
    image: null,
    instructions: null,
    isCustom: false,
  },
]

function loadCustomRecipes() {
  try {
    const stored = localStorage.getItem('knapsack-custom-recipes')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCustomRecipes(recipes) {
  const custom = recipes.filter((r) => r.isCustom)
  localStorage.setItem('knapsack-custom-recipes', JSON.stringify(custom))
}

function loadPlan() {
  try {
    const stored = localStorage.getItem('knapsack-plan')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function savePlan(plan) {
  localStorage.setItem('knapsack-plan', JSON.stringify(plan))
}

function loadTargets() {
  try {
    const stored = localStorage.getItem('knapsack-targets')
    return stored ? JSON.parse(stored) : { calories: 3000, protein: 140, fats: 70, carbs: 450 }
  } catch {
    return { calories: 3000, protein: 140, fats: 70, carbs: 450 }
  }
}

function saveTargets(targets) {
  localStorage.setItem('knapsack-targets', JSON.stringify(targets))
}

function loadMicros() {
  try {
    const stored = localStorage.getItem('knapsack-micros')
    return stored ? JSON.parse(stored) : [false, false, false]
  } catch {
    return [false, false, false]
  }
}

function saveMicros(micros) {
  localStorage.setItem('knapsack-micros', JSON.stringify(micros))
}

const useMealStore = create((set, get) => ({
  targets: loadTargets(),
  recipes: [...DEFAULT_RECIPES, ...loadCustomRecipes()],
  plan: loadPlan(),
  micros: loadMicros(),

  setTarget: (key, value) => {
    set((state) => {
      const newTargets = { ...state.targets, [key]: value }
      saveTargets(newTargets)
      return { targets: newTargets }
    })
  },

  addPortion: (recipeId) => {
    set((state) => {
      const newPlan = { ...state.plan, [recipeId]: (state.plan[recipeId] || 0) + 1 }
      savePlan(newPlan)
      return { plan: newPlan }
    })
  },

  removePortion: (recipeId) => {
    set((state) => {
      const current = state.plan[recipeId] || 0
      if (current <= 0) return state
      const newPlan = { ...state.plan }
      if (current === 1) {
        delete newPlan[recipeId]
      } else {
        newPlan[recipeId] = current - 1
      }
      savePlan(newPlan)
      return { plan: newPlan }
    })
  },

  resetPlan: () => {
    savePlan({})
    saveMicros([false, false, false])
    set({ plan: {}, micros: [false, false, false] })
  },

  addCustomRecipe: (recipe) => {
    set((state) => {
      const newRecipes = [...state.recipes, recipe]
      saveCustomRecipes(newRecipes)
      return { recipes: newRecipes }
    })
  },

  deleteCustomRecipe: (recipeId) => {
    set((state) => {
      const newRecipes = state.recipes.filter((r) => r.id !== recipeId)
      const newPlan = { ...state.plan }
      delete newPlan[recipeId]
      saveCustomRecipes(newRecipes)
      savePlan(newPlan)
      return { recipes: newRecipes, plan: newPlan }
    })
  },

  toggleMicro: (index) => {
    set((state) => {
      const newMicros = [...state.micros]
      newMicros[index] = !newMicros[index]
      saveMicros(newMicros)
      return { micros: newMicros }
    })
  },

  getTotals: () => {
    const { recipes, plan } = get()
    let calories = 0, protein = 0, fats = 0, carbs = 0
    for (const [recipeId, count] of Object.entries(plan)) {
      const recipe = recipes.find((r) => r.id === recipeId)
      if (recipe && count > 0) {
        calories += recipe.calories * count
        protein += recipe.protein * count
        fats += recipe.fats * count
        carbs += recipe.carbs * count
      }
    }
    return { calories, protein, fats, carbs }
  },

  getPlanItems: () => {
    const { recipes, plan } = get()
    const items = []
    for (const [recipeId, count] of Object.entries(plan)) {
      if (count > 0) {
        const recipe = recipes.find((r) => r.id === recipeId)
        if (recipe) {
          items.push({ ...recipe, count })
        }
      }
    }
    return items
  },
}))

export default useMealStore
