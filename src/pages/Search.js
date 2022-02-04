import { useState } from "react"

const Search = ({url,apiKey}) => {

  let fullUrl = [`${url}findByIngredients?ingredients=`]
  const fullApiKey = `&apiKey=${apiKey}`
  
  const [ingredients, setIngredients] = useState({
    ing1:"",
    ing2:"",
    ing3:"",
    ing4:"",
    ing5:""
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
    fullUrl.push("&number=5");
    fullUrl.push(fullApiKey);
    const final = fullUrl.join("");
    console.log(final);
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
          type="submit"
          value="Search for Recipes"
        />
      </form>
    </div>
  );
}

export default Search