import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const SearchResults = (props) => {
  const [recipes, setRecipes]=useState([])

  const getRecipes = async () => {
    const response = await fetch(props.searchURL)
    const data = await response.json()
    setRecipes(data)
    console.log(props.searchURL)
  }
    const setSearchResult = props.setSearchResult;

  useEffect(() => { getRecipes()},[])

  if (recipes) {
    return (
      <div className="all">
        <div className="main-container">
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
                <Link to="/search/show">
                  <button onClick={() => props.setSearchResult(res.id)}>
                    Click Here for Full Recipe
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {return <h1>Loading...</h1>}
}

export default SearchResults