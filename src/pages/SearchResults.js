import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const SearchResults = (props) => {
const navigate=useNavigate()
  const [recipes, setRecipes]=useState([])

  const getRecipes = async () => {
    const response = await fetch(props.searchURL)
    const data = await response.json()
    setRecipes(data)
  }

  useEffect(() => { getRecipes()},[])

  if (recipes) {
    return <div className="random-container">
      {recipes.map((res) => {
        return (
          <div className="recipe" key={res.id}>
            <h1>{res.title}</h1>
            <img src={res.image} alt={res.title} />
            <h2>Used Ingredients:</h2>
            <ul>
              {res.usedIngredients.map((x) => {
                return (
                  <li>
                    {x.amount} {x.unit} {x.name}
                  </li>
                );
              })}
            </ul>
            <h2>Additional Necessary Ingredients:</h2>
            <ul>
              {res.missedIngredients.map((x) => {
                return (
                  <li>
                    {x.amount} {x.unit} {x.name}
                  </li>
                );
              })}
            </ul>
            <button onClick={()=>{navigate("/search/show")}}>View Full Recipe</button>
          </div>
        );
      })}
    
    </div>
  } else {return <h1>Loading...</h1>}
}

export default SearchResults