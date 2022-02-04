import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import { UPDATE_RECIPE } from "../graphql/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import { GET_RECIPES, GET_RECIPE } from "../graphql/Queries";



const Edit = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id;
  
  const [recipe, setRecipe] = useState({})
  
  const targetRecipe = props.allRecipes?.find((element) => element.id === id);
  
  
  const target2 = { ...targetRecipe };
  // if (targetRecipe) {
  //   let ing2 = ""
    
  //   for (let i = 0; i < targetRecipe.ingredients.length; i++) {
      
  //     if (i === 0) {
  //       ing2 += `${targetRecipe.quantities[i]} ${targetRecipe.ingredients[i]}`;
  //     } else {
  //       ing2 += `,${targetRecipe.quantities[i]} ${targetRecipe.ingredients[i]}`;
  //     }
  //     console.log(ing2)
  //   }
  //   target2.ingredients = ing2;
    
  // }
  
  



  useEffect(() => {
    
    
    setRecipe(target2)
  }, [props.allRecipes,targetRecipe])
  

  

  // if (loading) { return <h1>loading...</h1> }
  // if(error){return <h1>error!</h1>}

  const [updateRecipe] = useMutation(UPDATE_RECIPE)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ingred = {
      ingredients: [],
      quantities: [],
    };
    console.log(recipe.ingredients)
    let items = null
    
    // if (recipe.ingredients.length > 0) {
    //   items = recipe.ingredients
    // } else { items = recipe.ingredients.split(",")}
    //const items = recipe.ingredients.split(",")
    
    if (target2.ingredients === recipe.ingredients) {
      items = recipe.ingredients
    } else {
      items = recipe.ingredients.split(",");
    }
    

    // items.forEach((i) => {
    //   const spl = i.split(" ");
    //   // console.log(spl);
    //   if (spl[0] == "") {
    //     ingred.quantities.push(spl[1]);
    //     ingred.ingredients.push(spl[2]);
    //   } else {
    //     ingred.quantities.push(spl[0]);
    //     ingred.ingredients.push(spl[1]);
    //   }
    //   // console.log(ingred);
    // });

    await updateRecipe({
      variables: {
        id: id,
        name: recipe.name,
        description: recipe.description,
        instructions: recipe.instructions,
        image: recipe.image,
        ingredients: items,
        quantities: ingred.quantities,
      },
      refetchQueries: [{ query: GET_RECIPES, GET_RECIPE }],
      
    });
    navigate("/");
  };

  const handleChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };
  
  if (props.allRecipes) {
    return (
      <div className="bs">
      <form onSubmit={handleSubmit}>
        {/* {console.log(recipe)} */}
        <input
          type="text"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        />
        <textarea
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
          placeholder="2cup flour, 2l water"
          onChange={handleChange}
        />

        <input type="submit" value="Edit Recipe" />
        </form>
        </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
  
  
  return (
    <form onSubmit={handleSubmit}>
      {/* {console.log(recipe)} */}
      <input
        type="text"
        name="name"
        value={recipe.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={recipe.description}
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
        placeholder="2cup flour, 2l water"
        onChange={handleChange}
      />

      <input type="submit" value="Edit Recipe" />
    </form>
  );
  return<h1>edit</h1>
  
  
}

export default Edit