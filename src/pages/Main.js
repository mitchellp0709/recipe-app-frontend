import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, } from "@apollo/client";
import { GET_RECIPES } from '../graphql/Queries'
import { Link } from "react-router-dom";
const Main = (props) => {

  // const { loading, error, data } = useQuery(GET_RECIPES);
  const { loading, error, data } = props.allRecipes
  if (loading) return <h1>Loading...</h1>;
  if (error) return <p>error.message</p>;




  return <div className="all">
    <div className="main-container">
        {data?.getRecipes.map((recipe) => {
          return (
            <div key={recipe.id} className="recipe">
              <Link to={`/${recipe.id}`}>
                <h1>{recipe.name}</h1>
              </Link>
              <Link to={`/${recipe.id}`}>
                <img src={recipe.image} />
              </Link>
              <h2>{ recipe.description}</h2>
            </div>
          );
        })}
    </div>
    </div>
}

export default Main