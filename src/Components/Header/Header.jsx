import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Header() {
  const authStatus = useSelector((state) => state.auth.status) //It will tell you whether user is authenticated or not
  const navigate = useNavigate();
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true  //It  will always be visible whether user is logged in or not
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, //Here Login button will only be visible when user is not logged in
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus, //Here Signup button will only be visible when user is not logged in
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus, //Here All Posts button will only be visible when user is logged in 
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,  //Here Add Posts button will only be visible when user is logged in 
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>

          <div className='mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          <ul className='flex mt-auto'>
            {navItems.map((item) => // Here we have applied a loop on navItems array to show them as per their state
              item.active ? (
                <li key={item.name}>
                  <button  //Here we have made a button on which item name will be shown and on clicking them we will navigate to that page
                    onClick={() => navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                    {item.name}
                  </button>
                </li>
              ) : null //If their active state is true then only we can show them
            )}

            {authStatus && (
              <li>
                <LogoutBtn />  
              </li> //Here we will show logout button only when user is logged in
            )} 
          </ul>
          
        </nav>
      </Container>
    </header>
  )
}

export default Header;