import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Search = ({url,apiKey,setSearchURL}) => {
  const navigate=useNavigate()
  let fullUrl = [`${url}findByIngredients?ingredients=`]
  const fullApiKey = `&apiKey=${apiKey}`
  
  const [ingredients, setIngredients] = useState({
    ing1:"",
    ing2:"",
    ing3:"",
    ing4:"",
    ing5: "",
    num:null
  })


  // const [ing1, setIng1] = useState();
  // const [ing2, setIng2] = useState();
  // const [ing3, setIng3] = useState();
  // const [ing4, setIng4] = useState();
  // const [ing5, setIng5] = useState();
  
  const handleChange = (event) => {
    setIngredients({ ...ingredients, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    
    for (let x in ingredients) {
      if (x.length > 0) {
        fullUrl.push(",+")
        fullUrl.push(ingredients[x])
      }
    }
    fullUrl.push(`&number=${ingredients.num}`);
    fullUrl.push(fullApiKey);
    const final = fullUrl.join("");
    setSearchURL(final)
    if (ingredients.num < 1) {
      alert("Number of ingredients is required and can't be negative!")
      navigate("/search")
    } else{navigate("/search/results");}
  }

  return (
    <div className="bs">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ing1"
          value={ingredients.ing1}
          placeholder="First Ingredient"
          onChange={handleChange}
        />
        <input
          type="text"
          name="ing2"
          value={ingredients.ing2}
          placeholder="Second Ingredient"
          onChange={handleChange}
        />
        <input
          type="text"
          name="ing3"
          value={ingredients.ing3}
          placeholder="Third Ingredient"
          onChange={handleChange}
        />
        <input
          type="text"
          name="ing4"
          value={ingredients.ing4}
          placeholder="Fourth Ingredient"
          onChange={handleChange}
        />
        <input
          type="text"
          name="ing5"
          value={ingredients.ing5}
          placeholder="Fifth Ingredient"
          onChange={handleChange}
        />
        <input
          type="number"
          name="num"
          value={ingredients.num}
          placeholder="Number of Recipes"
          onChange={handleChange}
        />
        <input type="submit" value="Search for Recipes" />
      </form>
    </div>
  );
}

export default Search