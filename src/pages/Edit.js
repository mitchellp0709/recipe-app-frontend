import { useNavigate, useParams } from "react-router-dom"


const Edit = (props) => {
  const params = useParams()
  const id = params.id;
  const { loading, data, error } = props.allRecipes
  
  if (loading) { return <h1>loading...</h1> }
  if(error){return <h1>error!</h1>}
  const recipe = data.getRecipes.find(element => element.id===id)

  return <h1>edit
    {console.log(recipe)}
  </h1>
}

export default Edit