import { FAIL_RECIPE, GET_RECIPE, RECEIVE_RECIPE } from "../actions"

const initialState = {
  error: null,
  name: null,
  recipe: null,
  isLoading: false,
}

const recipeFetching = (state) => {
  return { ...state, isLoading: true }
}

const recipeFetched = (state, payload) => {
  return { ...state, isLoading: false, recipe: payload }
}

const recipeFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPE:
      return recipeFetching()
    case RECEIVE_RECIPE:
      return recipeFetched(state, payload)
    case FAIL_RECIPE:
      return recipeFailed(state, payload)
    default:
      return state
  }
}
