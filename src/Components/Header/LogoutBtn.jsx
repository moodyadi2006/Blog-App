import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth"; //We have taken authService becoz it will tell whether I have logged in or not, Signed Up or not
import { logout as logoutFromStore } from "../../store/authSlice"; //Here we will take logout information from store and there only we will mark its status as false and will not show its data

function LogoutBtn() {
  const dispatch = useDispatch()  //It dispatches our data into store
  const logoutHandler = () => {
    authService.logout() //It will call the logout function of authService
      .then(() => {
        dispatch(logoutFromStore()) //It is written to save important information in store and will tell that user has logged out
      })
  }

  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}> 
      Logout
    </button>
  )

}

export default LogoutBtn;