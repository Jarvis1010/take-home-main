import CircularProgress from "@material-ui/core/CircularProgress"
import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

function RecipeList({ isLoading, recipe }) {
  if (isLoading) {
    return <CircularProgress />
  }

  if (!recipe) {
    return null
  }

  const uniqueIngredients = [...new Set(recipe.ingredients)]

  return (
    <section>
      <h2>{recipe.name}</h2>
      <h3>Ingredients</h3>
      <ul>
        {uniqueIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </section>
  )
}

const mapStateToProps = (state) => {
  const { recipe } = state
  return { ...recipe }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
