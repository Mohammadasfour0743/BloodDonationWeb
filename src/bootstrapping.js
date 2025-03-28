
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { configure, observable, reaction } from "mobx"
import { model } from "./testmodel.js"
import { connectToPersistence } from "./firestoreModel.js"

configure({ enforceActions: "never" })

// Create the reactive model from the base model
export const reactiveModel = observable(model)

// Add reaction to handle currentDishId change
/* reaction(
  function currentDishACB() {
    return reactiveModel.currentDishId
  },
  function currentDishEffectACB() { 
    reactiveModel.currentDishEffect()
  },
  
) */

// Trigger initial search


// Make reactive model and dish constants available in the console for testing
global.myModel = reactiveModel

// Connect the model to Firestore persistence
connectToPersistence(reactiveModel) 

