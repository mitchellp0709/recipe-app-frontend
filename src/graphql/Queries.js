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
