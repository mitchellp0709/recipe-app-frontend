import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_RECIPE } from "../graphql/Mutations";
import { GET_RECIPES } from "../graphql/Queries";

const AddRecipe = (props) => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    instructions: "",
    image: "",
    ingredients: [],
    quantities: [],
  })

  const [addRecipe] = useMutation(ADD_RECIPE)

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addRecipe({
      name: recipe.name,
      description: recipe.description,
      instructions: recipe.instructions,
      image: recipe.image,
      ingredients: recipe.ingredients,
      quantities: recipe.quantities,
    })
    // refetchQueries: [{ query: GET_RECIPES }]
  }

  const handleChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={recipe.name}
        placeholder="Recipe name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={recipe.description}
        placeholder="description"
        onChange={handleChange}
      />
      <input
        type="text"
        name="instructions"
        value={recipe.instructions}
        placeholder="instructions"
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        value={recipe.image}
        placeholder="image"
        onChange={handleChange}
      />
      <input
        type="text"
        name="ingredients"
        value={recipe.ingredients}
        placeholder="ingredients"
        onChange={handleChange}
      />
      <input
        type="text"
        name="quantities"
        value={recipe.quantities}
        placeholder="quantities"
        onChange={handleChange}
      />
      <input type="submit" value="Create New Recipe"/>
    </form>
  );

}
export default AddRecipe