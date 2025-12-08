import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { auth } from '../../Utils/firebase.init';
import useAxios from '../../Utils/axios';
import Swal from 'sweetalert2'

const Register = () => {
       const {createUser,googlePopUp,updateUser,setUser} = use(AuthContext)
      const {register,handleSubmit,formState: { errors }} = useForm()
      const navigate = useNavigate()
      const instance = useAxios()
      const passwordRegex = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    
    function googleLogin(){ 
       googlePopUp()
      .then(result => {
                console.log(result.user);
                

               
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                instance.post('/users', userInfo)
                    .then(() => {
                      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "member has been  registered",
  showConfirmButton: false,
  timer: 1500
})
                           toast("Sucessfully SignUp")

                        navigate(location.state || '/');
                    })

            })
            .catch(error => {
                  toast(error.message)

            })
    }


    const handleSignup = (data)=>{

         createUser(data.email,data.password)
          .then(result =>{
            const user = {
              name: data.name,
              email:data.email,
              image:data.photoURL,
            }
             instance.post("/users",user)
              .then(()=>{
                  Swal.fire({
  position: "top-end",
  icon: "success",
  title: "member has been  registered",
  showConfirmButton: false,
  timer: 1500
}).catch((error) => {
                
                toast.error(error.message); 
            });;
              })
        console.log(result)
         updateUser(data.name,data.photoURL)
         .then(result =>{
          console.log(result)
          setUser({...auth.currentUser})
         })
         .catch(error =>{
        toast(error.message)
         })
     toast("Sucessfully SignUp")

        navigate('/')
      })
      .catch(error =>{
               toast(error.message)

    })

    }

    return (
        <div>
             <div>
             <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
   
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
     <h1 className="text-5xl font-bold">SignUp now!</h1>
         <form onSubmit={handleSubmit(handleSignup)}>
        <fieldset className="fieldset">
             <label className="label">Name</label>
          <input type="text" className="input" {...register("name")} placeholder="Name" />
           <label className="label">Photo URL</label>
          <input type="text" className="input" {...register("photoURL",{required:true})} placeholder="Photo URL" />
          <label className="label">Email</label>
          <input type="email" className="input" {...register("email",{required:true})} placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" {...register("password",{required: "Password is required", pattern:  { value: passwordRegex, message: "Password must have 6 characters, one uppercase, and one lowercase."}, })} placeholder="Password" />
         
          <button className="btn bg-blue-300 text-white mt-4">SignUp</button>
        </fieldset>
        </form>

         <button onClick={googleLogin}  className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
         <p>  Have a acount . <Link to={"/login"} className='text-blue-400 underline'>Login Now</Link> </p>
         {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>
    </div>
  </div>
</div>
        </div> 
        </div>
    );
};

export default Register;