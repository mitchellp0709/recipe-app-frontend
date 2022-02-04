import { useEffect, useState } from "react"
import { ADD_RECIPE } from "../graphql/Mutations"
import { useMutation } from "@apollo/client"
import { Navigate, useNavigate } from "react-router-dom"
import { GET_RECIPES } from "../graphql/Queries"

const Random = (props) => {
  const navigate=useNavigate()
  const [randomRecipe, setRandomRecipe] = useState(null)
  
  const getRandomRecipe = async () => {
    const response = await fetch(`${props.url}random/?apiKey=${props.apiKey}`)
    const data = await response.json()
    setRandomRecipe(data)
  }

  useEffect(() => getRandomRecipe(), [])
  
  const [addRecipe] = useMutation(ADD_RECIPE);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const ingredients = []
    let temp = []
    // ingredients = randomRecipe.recipes[0].extendedIngredients.map((ing) => {
    //   return
    // })

    for (let x of randomRecipe.recipes[0].extendedIngredients) {
      temp.push(x.amount.toString())
      temp.push(x.unit);
      temp.push(x.name);
      console.log(temp)
      ingredients.push(temp.join(' '))
      temp = []
      
    }
    
    await addRecipe({
      variables: {
        name: randomRecipe.recipes[0].title,
        description: randomRecipe.recipes[0].summary,
        instructions: randomRecipe.recipes[0].instructions,
        image: randomRecipe.recipes[0].image,
        ingredients: ingredients,
      },
      refetchQueries: [{ query: GET_RECIPES }],
    });
    navigate("/")
  }

 


  if (randomRecipe) {
    console.log(randomRecipe)
    const fixedInstructions = randomRecipe.recipes[0].instructions.replace(/<[^>]+>/g, "");
    const fixedDescription = randomRecipe.recipes[0].summary.replace(/<[^>]+>/g, "")
    return (
      <div className="random-container">
        <h1>{randomRecipe.recipes[0].title}</h1>
        <img
          src={randomRecipe.recipes[0].image}
          alt={randomRecipe.recipes[0].title}
        />
        <p>{fixedDescription}</p>
        <h2>Ingredients: </h2>
        <ul>
          {randomRecipe.recipes[0].extendedIngredients.map((ing) => {
            return (
              <li>
                {ing.amount} {ing.unit} {ing.name}
              </li>
            );
          })}
        </ul>
        <h2>Instructions: </h2>
        <p className="random-instructions">
          {fixedInstructions}
        </p>
        <button onClick={handleSubmit}>Like it? Favorite it!</button>
      </div>
    );
  } else{return <h1>Loading...</h1>}
}
export default Random