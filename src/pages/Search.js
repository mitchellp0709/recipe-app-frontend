import { useState } from "react"

const Search = ({url,apiKey}) => {

  let fullUrl = `${url}findByIngredients?ingredients=`
  const fullApiKey = `&apiKey=${apiKey}`
  
  const [ingredients, setIngredients]=useState([])

  return <h1>Search</h1>
}

export default Search