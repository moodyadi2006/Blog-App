//It is mechanism that we can protect routes and pages So we make a container

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(state => state.auth.status)
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate('/login')
    } else if (!authentication && authStatus !== authentication) {
      navigate('/')
    }
/**this above block of code means:
 *  if authentication is true and authStatus is false it means the user is not logged in so wee will send him to login page
 *  if authentication is true and authStatus is true it means the user is logged in so we will send him to home page
 */
    setLoader(false);
  }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout;
