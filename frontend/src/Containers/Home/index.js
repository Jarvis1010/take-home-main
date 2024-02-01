import * as actions from "../../actions"

import React, { Component } from "react"

import Button from "@material-ui/core/Button"
import Checkbox from "@material-ui/core/Checkbox"
import Divider from "@material-ui/core/Divider"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { HomeWrapper } from "./styles"
import Input from "@material-ui/core/Input"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Recipe from "../Recipe"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

class Home extends Component {
  constructor(props) {
    super(props)
    const params = new URLSearchParams(document.location.search)
    const term = params.get("term")
    const ingredients = params.getAll("ingredients")
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.state = {
      term: term ?? "",
      ingredients: ingredients,
      setParamsTerm: (term) => {
        params.set("term", term)
        window.history.pushState(
          {},
          "",
          `${document.location.pathname}?${params}`
        )
      },
      setParamsIngredients: (ingredients) => {
        params.delete("ingredients")
        ingredients.forEach((ingredient) => {
          params.append("ingredients", ingredient)
        })
        window.history.pushState(
          {},
          "",
          `${document.location.pathname}?${params}`
        )
      },
    }
  }
  componentDidMount() {
    if (this.state.term || this.state.ingredients.length > 0) {
      console.log("fetching")
      this.fetchSearch()
    }
  }
  fetchSearch() {
    this.props.searchRecipes(this.state.term, this.state.ingredients)
  }
  handleSearch(event) {
    const term = event.target.value

    this.state.setParamsTerm(term)
    this.setState({ term })
  }
  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.state.setParamsIngredients(ingredients)
    this.setState({ ingredients })
  }
  render() {
    const { term, ingredients } = this.state
    const { recipes, isLoading, getRecipe } = this.props

    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          value={term}
        />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={ingredients.includes(ingredient)}
                  onChange={this.handleIngredient.bind(this, ingredient)}
                  value={ingredient}
                />
              }
              label={ingredient}
            />
          ))}
        </div>
        <Button onClick={this.fetchSearch}>search</Button>
        <Divider />
        {recipes && (
          <List>
            {recipes.map((recipe) => (
              <ListItem
                onClick={() => getRecipe(recipe.id)}
                button
                key={recipe.id}
              >
                <ListItemText primary={recipe.name} />
              </ListItem>
            ))}
          </List>
        )}
        {isLoading && <LinearProgress />}
        <Divider />

        <Recipe />
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      getRecipe: actions.getRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
