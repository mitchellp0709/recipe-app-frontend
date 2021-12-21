import './App.css';
import { Route, Routes, Link } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, } from "@apollo/client";
import { GET_RECIPES } from './graphql/Queries'
import AddRecipe from './pages/AddRecipe';

function App() {
  const { loading, error, data } = useQuery(GET_RECIPES)
  
  
  if (loading) return <h1>loading...</h1>
  if(error) return<p>error.message</p>


  return (
    <div className="App">
      <h1>main page</h1>
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
        


        <Routes>
          <Route path ="/new" element={<AddRecipe/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
