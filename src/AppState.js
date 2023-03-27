import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.js"

// Creates a class and makes properties observable
class ObservableAppState {

  user = null
  /** @type {import('./models/Account.js').Account} */
  account = null
  /** @type {import('./models/Car.js').Car[]} */
  cars = []

  /** @type {import('./models/Car.js').Car | null} */
  car = null

  // sets up emits (from mobx import). AutoObservable is default
  constructor() {
    makeAutoObservable(this)
  }
}

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    action(() => {
      target[prop] = value
    })()
    return true
  }
})