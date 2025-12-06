import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { Children, useEffect, useState} from 'react';
import { auth } from '../Utils/firebase.init';
import { AuthContext } from './AuthContext';


const AuthProvider = ({children}) => {
      
    const googleProvider = new GoogleAuthProvider();
    const [category,setCategory] =useState("All")
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
   
   
    const createUser = (email,password)=>{
                
        return createUserWithEmailAndPassword(auth,email,password)


    }

    const signUser = (email,password)=>{
                
        return signInWithEmailAndPassword(auth,email,password)

    }

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsubscribe();
}, [setUser]);

 const logOut = ()=>{
    return signOut(auth)
  }
 
const googlePopUp = () =>{

    return signInWithPopup(auth,googleProvider)
}


const updateUser = (name,url) =>{
    return updateProfile(auth.currentUser,{
    displayName:name,
    photoURL:url,
    })
}

    return (
        <div>
            <AuthContext value={{category,setCategory,setLoading,updateUser,user,setUser,loading,googlePopUp,signUser,createUser,logOut}}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;