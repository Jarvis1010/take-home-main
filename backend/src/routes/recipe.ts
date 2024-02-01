import { NextFunction, Request, Response } from "express"
import { Recipe, RecipeModel } from "../models"

function convertRecipeToResponse(recipe: Recipe) {
  const { name, instructions, ingredients: ingredientsRaw } = recipe
  const ingredients = ingredientsRaw.map((ing) => ing.name)
  return { name, instructions, ingredients }
}

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params

  if (id === undefined) {
    res.status(400).send("no id provided")
    return
  }

  const maybeRecipe = await RecipeModel.findById(id)

  if (maybeRecipe === null) {
    res.status(404).send("no recipe found")
    return
  }

  res.json(convertRecipeToResponse(maybeRecipe))

  next()
}
