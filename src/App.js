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



 

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main allRecipes={allRecipes}/>}/>
        <Route path="/new" element={<AddRecipe />} />
        <Route path="/:id" element={<Show />} />
        <Route path="/:id/edit" element={<Edit allRecipes={allRecipes}/>}/>
        </Routes>
      
    </div>
  );
}

export default App;
