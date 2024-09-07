import { Slide, toast, Bounce } from 'react-toastify';

const successtoast = (message = "something is success", position = "top-right", delay = 3000)=>{
    toast.success(message, {
        position: position,
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        });
}

const Errortoast = (message = "something is success", position = "top-center", delay = 3000)=>{
    toast.error('This Email is allready use', {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        });
}

const Infotoast = (message = "something is success", position = "top-center", delay = 3000)=>{
    toast.success(message, {
        position: position,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
}
export { successtoast, Errortoast, Infotoast };
