import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteForManager = ({children}) => {
  
    const  user=useSelector(st=>st.user.currentUser);


          if(!user||user.role=="USER")
          {
            return <Navigate to="/"/>;
          }
          else{
            return children;
          }
         
    
}
 
export default ProtectedRouteForManager;
