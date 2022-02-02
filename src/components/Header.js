import { Link } from "react-router-dom"
const Header = (props) => {

  return <nav>
    <Link to="/">Home</Link>
    <Link to="/new">New</Link>
    <Link to ="/random">Random Recipe</Link>
  </nav>
}

export default Header