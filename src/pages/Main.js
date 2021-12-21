import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, } from "@apollo/client";
import { GET_RECIPES } from '../graphql/Queries'
const Main = (props) => {

  const { loading, error, data } = useQuery(GET_RECIPES);

  if (loading) return <h1>loading...</h1>;
  if (error) return <p>error.message</p>;




  return <div>
    <div>
        {data?.getRecipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <h1>{recipe.name}</h1>
              <img src={recipe.image} />
              <h2>{recipe.description}</h2>
              <p>{recipe.quantities}</p>
              <p>{recipe.ingredients}</p>
              <p>{recipe.instructions}</p>
            </div>
          );
        })}
    </div>
    </div>
}

export default Main