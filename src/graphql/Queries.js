import { gql, useQuery } from '@apollo/client'


export const GET_RECIPES = gql`
{
getRecipes{
  id
  name
  description
  instructions
  image
  ingredients
  quantities
}
}
`
export const GET_RECIPE = gql`
  query getRecipe($id: ID) {
    getRecipe(id:$id) {
      name
      description
      instructions
      image
      ingredients
      quantities
    }
  }
`;