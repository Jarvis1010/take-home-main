import { combineReducers } from "redux"
import recipe from "./recipe"
import search from "./search"

export default combineReducers({ search, recipe })
