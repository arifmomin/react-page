import React, {useState} from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { isemailvalid, passwordinvalid } from '../../../../Utils/validation/validation';
import { ThreeDots } from "react-loader-spinner";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Errortoast, successtoast } from '../../../../Utils/tostify/tostify';
import moment from "moment";
import { getDatabase, push, ref, set } from "firebase/database";
import { Link } from "react-router-dom";
const LoginLeft = () => {
    const auth = getAuth();
    const db = getDatabase();
    const [Eye, setEye] = useState(false);
    const [loading, setloading] = useState(false);
    const [loginInput, setloginInput] = useState ({
        email : "",
        password : "",
    });
    const [loginError, setloginError]= useState({
        emailError: "",
        passwordError: "",
    });
    const handleInput =  (event)=>{
        const {id, value} = event.target;
        setloginInput({
            ...loginInput,
            [id] : value,            
        });
    };
    const handleSingin = ()=>{
        setloading(true);
        const {email, password} =loginInput;
        if(!email || !isemailvalid(email)){
            setloginError({
                ...loginError,
                emailError: "email missing || email incorrect",
            });
        }else if(!password || !passwordinvalid(password)){
            setloginError({emailError:"",
                ...loginError,
                emailError: "",
                passwordError: "password missing || password incorrect",
            });
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
             successtoast ("Log in Successfull");
            })
            .catch((error) => {
                const errorCode = error.code;
                Errortoast(errorCode)                
            }).finally(() =>{
                setloading(false)
                setloginInput ({
                    email : "",
                    password : "",
                });
                setloginError({ emailError:"", passwordError:""});
            })
        };
        }
   

    const handleEye = () => {
        setEye(!Eye);
      };
    const handleLoginWithGoogle = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup( auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            return user
        }).then((user)=>{
            const {photoUrl, displayName, email, localId} = user.reloadUserInfo;
            console.log(photoUrl, displayName, email, localId);
            const UserRef = ref (db, "users/");
            set (push (UserRef) , {
              userUid : localId,
              userEmail :email,
              userName : displayName,
              UserPhotoUrl : photoUrl ?  photoUrl : "",
              CreatedAtt : moment().format(" MM, DD, YYYY, h:mm:ss a"),
            })
        })
          .catch((error) => {
            const errorCode = error.code;
            Errortoast (errorCode)
          });
    }
  return (
    <div className='h-screen w-[55%] flex justify-center items-center'>
            <form action="#" method='post' className='w-full max-w-[480px]' onSubmit={(e)=>e.preventDefault()}>
                <div>
                <div>
                    <h2 className='text-[33px] font-bold font-openSans text-commonColor'>Login to your account!</h2>
                </div>
                <div className='flex justify-start items-center'>
                    <h3 className=' basis-[220px] h-[62px] flex justify-center items-center gap-x-2 border-opacity-30 border-commonColor border-[.80px]  rounded-xl mt-8 cursor-pointer'onClick={handleLoginWithGoogle} >
                        <span className='text-[22px]'>{<FcGoogle/>}</span>
                        <span className='text-[14px] font-semibold font-openSans text-commonColor'>Login with Google</span>
                    </h3>
                </div>
                </div>
                <div className='flex flex-col gap-y-[60px] mt-8'>
                <div className='flex flex-col '>
                <label htmlFor="Email Address" className='text-[13px] font-normal font-openSans text-commonColor text-opacity-50'>Email Address</label>
                <div className='border-b-[1px] border-commonColor'>
                <input type="text" onChange={handleInput} id='email' className='h-[60px] w-full outline-0 text-xl text-commonColor font-semibold'  placeholder='arifmominweb@gmail.com' />
                </div>
                <span className='text-sm text-red-500 font-normal'>{loginError.emailError && loginError.emailError}</span>
                </div>
                <div className='flex flex-col '>
                <label htmlFor="Email Address" className='text-[13px] font-normal font-openSans text-commonColor text-opacity-50'>Password</label>
               <div className='border-b-[1px] border-commonColor flex justify-center items-center'>
               <input type={Eye ? "text" : "password"} onChange={handleInput} id='password' className='h-[60px] w-full text-xl text-commonColor font-semibold outline-0 '  placeholder='Enter Your Password' />
               <span onClick={handleEye}>
                  {Eye ? (
                    <IoEye className="cursor-pointer text-2xl" />
                  ) : (
                    <IoEyeOff className="cursor-pointer text-2xl" />
                  )}
                </span>
               </div>
               <span className='text-sm text-red-500 font-normal mt-2 block'>{loginError.passwordError && loginError.passwordError}</span>
                </div>
                <div>
                    <a onClick={handleSingin} className='flex justify-center items-center w-full h-[80px] bg-commonColor rounded-lg text-xl text-white font-semibold font-openSans' href='#'>
                    {loading ? (
                <ThreeDots
                  visible={true}
                  height="40"
                  width="40"
                  color="#fff"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Login to Continue"
              )}
                        </a>
                </div>
                </div>
                <div>
                    <h4 className='text-sm text-commonColor font-openSans font-medium mt-8'>Don’t have an account ? <span className='text-[#EA6C00] font-semibold text-base'><Link to ={"/Registration"}>Sign up</Link></span></h4>
                </div>
            </form>
    </div>
  )
}

export default LoginLeft
