
import { useLocation } from 'react-router-dom'

const UseNavBar = ({ children }) => {
  const location = useLocation()
  const showNav = location.pathname !== '/dashboard'

  return showNav ? children : null
}

export default UseNavBar
