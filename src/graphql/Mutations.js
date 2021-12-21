import { gql } from '@apollo/client'

export const ADD_RECIPE = gql`

mutation addRecipe(
  $name: String!,
  $description: String,
  $instructions: String,
  $image: String,
  $ingredients:[String],
  $quantities:[String]
){
  addRecipe(name:$name,description:$description, instructions: $instructions, image: $image, ingredients:$ingredients,quantities:$quantities){
    id
    name
    description
    instructions
    image
    ingredients
    quantities
  }
}
`;

export const UPDATE_RECIPE = gql`
  mutation updateRecipe(
    $name: String!
    $description: String
    $instructions: String
    $image: String
    $ingredients: [String]
    $quantities: [String]
  ) {
    updateRecipe(
      name: $name
      description: $description
      instructions: $instructions
      image: $image
      ingredients: $ingredients
      quantities: $quantities
    ) {
      id
      name
      description
      instructions
      image
      ingredients
      quantities
    }
  }
`;

