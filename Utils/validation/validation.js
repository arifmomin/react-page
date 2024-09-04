const emailPattern = 
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const isemailvalid = (email = "arifmominweb@gmail.com")=>{
   return emailPattern.test(email.toLowerCase())
}
const userNameValidator = (userName = "Arif Momin") =>{
    if(userName.length >= 5 && userName.length <= 20){
        return true;
    }else{
        return false;
    }
}
const passwordinvalid = (password) =>{
    return passwordpattern.test(password);
}
export {isemailvalid, userNameValidator, passwordinvalid};