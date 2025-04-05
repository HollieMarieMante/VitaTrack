import React, { useEffect } from 'react'
import { auth, provider } from '../../config/firebaseConfig';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate , Navigate} from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
export default function Auth(){
    const navigate = useNavigate();
   const {isAuth} = useGetUserInfo();

    const signInWithGoogle=async()=>{ 
 const results = await signInWithPopup(auth ,provider);
      console.log(results);  
      const authInfo ={
        userID : results.user.uid,
        name: results.user.name,
        profilePhoto : results.user.photoURL,
         isAuth : true,
      }
      localStorage.setItem("auth",JSON.stringify(authInfo));
      navigate('/welcomepage')
};

  if(isAuth ){
     return <Navigate to='/welcomepage'/> }
     
    return(
         <div className="Auth">
            <div className="login-page">
                <p> Sign in with Google to continue</p>
                <button onClick={signInWithGoogle}> SignIn with Google </button>
            </div>
         </div>
    )
}