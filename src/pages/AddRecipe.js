import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_RECIPE } from "../graphql/Mutations";
import { GET_RECIPES } from "../graphql/Queries";
import { useNavigate } from "react-router-dom";

const AddRecipe = (props) => {
  const navigate = useNavigate()


  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    instructions: "",
    image: "",
    ingredients: [],
    quantities: [],
  }
  )

  const [addRecipe] = useMutation(ADD_RECIPE)

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addRecipe({
      variables: {
        name: recipe.name,
        description: recipe.description,
        instructions: recipe.instructions,
        image: recipe.image,
        ingredients: recipe.ingredients,
        quantities: recipe.quantities,
      }, refetchQueries:[{query:GET_RECIPES}]
    })
    navigate("/")
  }

  const handleChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };


  return (
    <form onSubmit={handleSubmit}>
      <pre>{JSON.stringify(recipe, null, `\t`)}</pre>
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
      {/* <input
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
      /> */}
      <input type="submit" value="Create New Recipe" />
    </form>
  );

}
export default AddRecipe