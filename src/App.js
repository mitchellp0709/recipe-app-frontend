import './App.css';
import { Route, Routes, Link } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, } from "@apollo/client";
import { GET_RECIPES } from './graphql/Queries'
import AddRecipe from './pages/AddRecipe';
import Main from './pages/Main';

function App() {
  


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Main/>}/>
        <Route path ="/new" element={<AddRecipe/>}/>
        </Routes>
      
    </div>
  );
}

export default App;
