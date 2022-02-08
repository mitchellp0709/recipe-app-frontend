import { useState, useEffect } from "react"
import { ADD_RECIPE } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { GET_RECIPES } from "../graphql/Queries";
import { useNavigate } from "react-router-dom";

const SearchShow = ({apiKey,url,searchResult}) => {
  const navigate=useNavigate()
  const [recipe, setRecipe] = useState(null)

  const getRecipe = async () => {
    console.log("search Show")
    console.log(`${url}${searchResult}/information?apiKey=${apiKey}`);
    const result = await fetch(`${url}${searchResult}/information?apiKey=${apiKey}`)
    const data = await result.json()
    setRecipe(data)
  }

    const [addRecipe] = useMutation(ADD_RECIPE);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const ingredients = [];
      let temp = [];
      // ingredients = randomRecipe.recipes[0].extendedIngredients.map((ing) => {
      //   return
      // })

      for (let x of recipe.extendedIngredients) {
        temp.push(x.amount.toString());
        temp.push(x.unit);
        temp.push(x.name);
        console.log(temp);
        ingredients.push(temp.join(" "));
        temp = [];
      }
      await addRecipe({
        variables: {
          name: recipe.title,
          description: recipe.summary.replace(/<[^>]+>/g, ""),
          instructions: recipe.instructions.replace(/<[^>]+>/g, ""),
          image: recipe.image,
          ingredients: ingredients,
        },
        refetchQueries: [{ query: GET_RECIPES }],
      });
      navigate("/");
    };

  useEffect(() => { getRecipe()},[])

  if (recipe) {
    const fixedInstructions = recipe.instructions.replace(/<[^>]+>/g, "")
    const fixedDescription = recipe.summary.replace(/<[^>]+>/g, "")
    // const fixedInstructions = recipe.instructions
    // const fixedDescription = recipe.summary
    return (
      
      <div className="random-container">
        <h1>{recipe.title}</h1>
        {console.log(recipe)}
        <img src={recipe.image} alt={recipe.title} />
        <p>{fixedDescription}</p>
        <h2>Ingredients: </h2>
        <ul>
          {recipe.extendedIngredients.map((ing) => {
            return (
              <li>
                {ing.amount} {ing.unit} {ing.name}
              </li>
            );
          })}
        </ul>
        <h2>Instructions: </h2>
        <p className="random-instructions">{fixedInstructions}</p>
        <button onClick={handleSubmit}>Like it? Favorite it!</button>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default SearchShow