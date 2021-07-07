import { createConnectedStore } from 'undux'

let initialState = {
  foo: false,
  bar: []
}

export default createConnectedStore(initialState)