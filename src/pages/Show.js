import { useMutation, useQuery } from "@apollo/client"
import { GET_RECIPE, GET_RECIPES } from "../graphql/Queries"
import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { DELETE_RECIPE } from "../graphql/Mutations"


const Show = ({ getQuery }) => {
  /////////////////////////
  //Define dependencies
  /////////////////////////
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [recipe, setRecipe] = useState({});

  /////////////////////////
  //Create Functions
  /////////////////////////

  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const removeRecipe = (id) => {
    deleteRecipe({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_RECIPES }],
    });
    navigate("/");
  };

  const { loading, error, data } = useQuery(GET_RECIPE, {
    variables: { id: id },
    onCompleted: (data) => setRecipe(data.getRecipe),
  });
  // const { loading, error, data }=getQuery(id)

  if (loading) return <h1>loading...</h1>;
  if (error) return <p>error.message</p>;

  if (recipe) {
    return (
      <div>
        {console.log(recipe)}
        <h1>{recipe.name}</h1>
        <img src={recipe.image} alt="pic of food" />
        <h2>{recipe.description}</h2>

        {recipe.quantities ? (
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
        )  : (
          <h1>Loading...</h1>
        )}
        
        <p>{recipe.instructions}</p>
        <Link to={`/${id}/edit`}>
          <button>Edit</button>
        </Link>
        <button
          onClick={() => {
            removeRecipe(id);
          }}>
          Delete
        </button>
      </div>
    );
  }
}
  

export default Show