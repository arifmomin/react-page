import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  isemailvalid,
  userNameValidator,
  passwordinvalid,
} from "../../../../Utils/validation/validation";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import {
  successtoast,
  Errortoast,
  Infotoast,
} from "../../../../Utils/tostify/tostify";
import { RotatingLines } from "react-loader-spinner";
import { getDatabase, push, ref, set } from "firebase/database";
import moment from "moment";
import { Link } from "react-router-dom";

function RegistrationLeft() {
  const auth = getAuth();
  const db = getDatabase();
  const [Eye, setEye] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [password, setpassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [fullNameError, setfullNameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [loading, setloading] = useState(false);
  const handleSignup = () => {
    if (!email) {
      setEmailError("email missing");
    } else if (!isemailvalid(email)) {
      setEmailError("Please input a valid email");
    } else if (!fullName) {
      setEmailError("");
      setfullNameError("Name Missing");
    } else if (!userNameValidator(fullName)) {
      setfullNameError("Full Name Must Be 5-20 charecter");
    } else if (!password) {
      setfullNameError("");
      setpasswordError("password missing");
    } else if (!passwordinvalid(password)) {
      setpasswordError(
        "password muist be 8 charecter, Uppercase , lowercase & special cherecter"
      );
    } else {
      setloading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((ourinfo) => {
          successtoast(`${fullName} Registation Successful`);
        }).then(()=>{
          updateProfile(auth.currentUser,{
            displayName:fullName
          })
        }).then(()=>{
            sendEmailVerification(auth.currentUser).then(()=>{
              Infotoast(`${auth.currentUser.displayName} please check your mail`)
              
            });
          }).then(()=>{
            const UserRef = ref (db, "users/");
            set (push (UserRef) , {
              userUid : auth.currentUser.uid,
              userEmail : auth.currentUser.email,
              userName : fullName,
              UserPhotoUrl: "",
              CreatedAtt : moment().format(" MM, DD, YYYY, h:mm:ss a"),
            })
          }).catch((err) => {
          Errortoast(`${err.code}`, "top-right", 7000);

        }).finally(()=>{
          setloading(false);
          setEmail("");
          setfullName("");
          setpassword("");
          setEmailError("");
          setfullNameError("");
          setpasswordError("");
        })
        
      }
  };
  const handleEye = () => {
    setEye(!Eye);
  };

  
  return (
    <div className="w-[55%] h-screen flex justify-center items-center flex-col bg-white">
      <div>
        <div className="pageLeft_heading">
          <h1 className="text-[34px] font-bold font-Nunito leading-[22px] text-commonColor">
            Get started with easily register
          </h1>
          <h2 className="text-xl font-normal font-Nunito leading-[22px] text-[rgba(0,0,0,0.42)] mt-[13px]">
            Free register and you can enjoy it
          </h2>
        </div>
        <div className="w-[368px] flex justify-center items-center flex-col">
          <form
            action="#"
            method="post"
            className="w-full flex flex-col justify-start items-stretch pt-[39px] gap-y-[25px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="">
              <fieldset className="border-2 border-solid border-[rgba(17,23,93,0.30)] rounded-lg pt-[5px] pb-[16px] pl-5 pr-[15px]">
                <legend className="px-[10px] text-[13px] font-semibold font-Nunito text-[rgba(17,23,93,0.70)]">
                  Email Address:
                </legend>
                <input
                  type="email"
                  value={email}
                  className="email w-full bg-transparent outline-0 text-xl font-medium font-Nunito text-commonColor pl-[10px]"
                  placeholder="arifmominweb@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <span className="text-red-600 text-sm font-semibold">
                {emailError}
              </span>
            </div>
            <div>
              <fieldset className="border-2 border-solid border-[rgba(17,23,93,0.30)] rounded-lg pt-[5px] pb-[16px] pl-5 pr-[15px]">
                <legend className="px-[10px] text-[13px] font-semibold font-Nunito text-[rgba(17,23,93,0.70)]">
                  Ful name
                </legend>
                <input
                  type="name"
                  value={fullName}
                  className="name w-full bg-transparent outline-0 text-xl font-medium font-Nunito text-commonColor pl-[10px]"
                  placeholder="Arif Momin"
                  onChange={(e) => setfullName(e.target.value)}
                />
              </fieldset>
              <span className="text-red-600 text-sm font-semibold">
                {fullNameError}
              </span>
            </div>
            <div className="">
              <fieldset className="flex justify-center items-center border-2 border-solid border-[rgba(17,23,93,0.30)] rounded-lg pt-[5px] pb-[16px] pl-5 pr-[15px]">
                <legend className="px-[10px] text-[13px] font-semibold font-Nunito text-[rgba(17,23,93,0.70)]">
                  Password:
                </legend>
                <input
                  type={Eye ? "text" : "password"}
                  value={password}
                  className="password w-full bg-transparent outline-0 text-xl font-medium font-Nunito text-commonColor pl-[10px]"
                  placeholder="*********"
                  onChange={(e) => setpassword(e.target.value)}
                />
                <span onClick={handleEye}>
                  {Eye ? (
                    <IoEye className="cursor-pointer text-2xl" />
                  ) : (
                    <IoEyeOff className="cursor-pointer text-2xl" />
                  )}
                </span>
              </fieldset>
              <span className="text-red-600 text-sm font-semibold">
                {passwordError}
              </span>
            </div>
          </form>
          <div className="w-full">
            <button
              className="w-full h-[60px] bg-[#5F35F5] text-lg font-semibold font-Nunito text-white rounded-full flex justify-center items-center mt-10 hover:bg-transparent transition-all ease-linear duration-300 hover:text-[#000] hover:border-2 hover:border-commonColor"
              onClick={handleSignup}
            >
              {loading ? (
                <RotatingLines
                  visible={true}
                  height="40"
                  width="40"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Sign up"
              )}
            </button>
          </div>
          <div>
            <h3 className="text-base text-[#03014C] font-normal font-openSans mt-[35px]">
              Already have an account ?{" "}
              <span>
                <a
                  className="text-[#EA6C00] font-bold hover:text-commonColor transition-all ease-linear duration-300"
                  href="#"
                >
                  <Link to={"/Login"}>Sign In</Link>
                </a>
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationLeft;
