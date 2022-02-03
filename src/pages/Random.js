import { useEffect, useState } from "react"

const Random = (props) => {
  const [randomRecipe, setRandomRecipe] = useState(null)
  
  const getRandomRecipe = async () => {
    const response = await fetch(`${props.url}random/?apiKey=${props.apiKey}`)
    const data = await response.json()
    setRandomRecipe(data)
  }

  useEffect(() => getRandomRecipe(),[])

  if (randomRecipe) {
    return <div className="random-container">
      <h1>{randomRecipe.recipes[0].title}</h1>
      <img src={randomRecipe.recipes[0].image} alt={randomRecipe.recipes[0].title} />
      <p>{randomRecipe.recipes[0].summary}</p>
      <h2>Ingredients: </h2>
      <ul>
        {randomRecipe.recipes[0].extendedIngredients.map((ing) => {
          return <li>{ing.amount} {ing.unit} {ing.name}</li>
        })}
      </ul>
      <h2>Instructions: </h2>
      <p className="random-instructions">{randomRecipe.recipes[0].instructions}</p>
    </div>
  } else{return <h1>Loading...</h1>}
}
export default Random