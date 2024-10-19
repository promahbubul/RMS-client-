import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { verifyToken } from '../utils/verifyToken';
import { logout, useCurrentToken } from '../redux/features/auth/authSlice';




type TProtectedRoute = {
   children: ReactNode ;
   role: string | undefined
}
const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch()

  
 let user
  if(token){
    user = verifyToken(token)
  }
  
    console.log(user)
  
    if (role !== undefined && user?.role !== role) {

    dispatch(logout())
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
