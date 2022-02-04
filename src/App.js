import './App.css';
import { Route, Routes, Link } from 'react-router-dom'
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, } from "@apollo/client";
import { GET_RECIPES } from './graphql/Queries'
import AddRecipe from './pages/AddRecipe';
import Main from './pages/Main';
import Show from './pages/Show';
import Header from './components/Header';
import Edit from './pages/Edit';
import Random from './pages/Random';
import Search from './pages/Search';
import SearchResults from './pages/SearchResults';
import SearchShow from './pages/SearchShow';

function App() {
  //////////////////////
  //Functions
  //////////////////////
  const allRecipes= useQuery(GET_RECIPES);


  // const getQuery = (id) => {
  //   useQuery(GET_RECIPE, {
  //     variables: { id: id },
  //     onCompleted: (data) => setRecipe(data.getRecipe),
  //   })
  // };

  const url = "https://api.spoonacular.com/recipes/";
  const apiKey = "58b7f91d4b5e4caa8919e0f7bd122b71";

  const [searchURL, setSearchURL]=useState(null)


 

  return (
    <div className="App">
      <Header url={url} apiKey={apiKey}/>
      <Routes>
        <Route path="/" element={<Main allRecipes={allRecipes}/>}/>
        <Route path="/new" element={<AddRecipe />} />
        <Route path="/:id" element={<Show />} />
        <Route path="/:id/edit" element={<Edit allRecipes={allRecipes?.data?.getRecipes} />} />
        <Route path="/random" element={<Random url={url} apiKey={apiKey} />} />
        <Route path="/search" element={<Search url={url} apiKey={apiKey} setSearchURL={setSearchURL} />} />
        <Route path="/search/results" element={<SearchResults searchURL={searchURL} />} />
        <Route path="/search/show" element={<SearchShow/> }/>
        </Routes>
      
    </div>
  );
}

export default App;
