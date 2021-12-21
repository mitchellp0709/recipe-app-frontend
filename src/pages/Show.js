import { useQuery } from "@apollo/client"
import { GET_RECIPE } from "../graphql/Queries"
import { useState } from "react"
import { useParams } from "react-router-dom"

const Show = ({getQuery}) => {
  const params = useParams();
  const id = params.id;
  const [recipe, setRecipe] = useState({})


  const { loading, error, data } =  useQuery(GET_RECIPE, {
    variables: { id: id },onCompleted:(data)=> setRecipe(data.getRecipe)
  })
  // const { loading, error, data }=getQuery(id)

  if (loading) return <h1>loading...</h1>;
  if (error) return <p>error.message</p>;


  return (
    <div>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt="pic of food" />
      <h2>{recipe.description}</h2>
      {console.log(recipe.quantities)}
      <div className="doubleList">
        <ul>
          {recipe.quantities.map((x) => {
            return <li>{x}</li>;
          })}
        </ul>
        <ul>
          {recipe.ingredients.map((x) => {
            return <li>{x}</li>;
          })}
        </ul>
      </div>
      <p>{recipe.instructions}</p>
    </div>
  );
}
  

export default Show