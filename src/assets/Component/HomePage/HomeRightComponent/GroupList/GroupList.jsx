import React, { useState, useRef, createRef } from "react";
import Search from '../Search/Search.jsx'
import {BsThreeDotsVertical } from 'react-icons/bs'
import esmern from "../GroupList/GroupListImage/esmern.png"
import Modal from 'react-modal';
import { RxCross2 } from 'react-icons/rx';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Errortoast, successtoast} from "../../../../../../Utils/tostify/tostify.js"
import { getStorage, ref, uploadString, getDownloadURL} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { GrGroup } from "react-icons/gr";
import { getDatabase, ref as dbref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
const defaultSrc = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const GroupList = () => {
  const db = getDatabase();
  const storage = getStorage();
  const auth = getAuth();
  const [loading, setloading] = useState(false);
  const [image, setImage] = useState(defaultSrc);
  const cropperRef = useRef(null);
  const [cropData, setCropData] = useState("#");
  // groupinputstate
  const [GroupInputValue, setGroupInputValue] = useState({
        GroupName: "",
        GroupTagName: "",
    })
    // modal state
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
}
function closeModal() {
    setIsOpen(false);
}
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#8080800f',
        padding: '10px 15px 20px 20px',
    },
  };
  /**
   * todo: crop on change function implement
   */
  const onChange = (e) => { 
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      successtoast("Crop Done" ,"top-center");
    };
  };
  /**
   * todo: OnGroupChangeHandlear function
   */
  const OnGroupChangeHandlear = ((event) =>{
    const {id, value} = event.target;
    setGroupInputValue ({
        ...GroupInputValue,
        [id]: value,
    });
    console.log(GroupInputValue);
    
  });
  /**
   * todo : CreateGroup button implement
   */
  const handleGroup =(() => {
    const {GroupName, GroupTagName} = GroupInputValue;
    if( !GroupName){
      return Errortoast(`GroupName missing`, "top-center", 7000) 
    }else if(!GroupTagName){
      return Errortoast(`GroupTagName`, "top-center", 7000) 
    }
    setloading(true);
    const storageRef = ref(storage, `GroupImage/Images${uuidv4()}`);
    uploadString(storageRef, cropData, 'data_url').then((snapshot) => {
      setCropData("");
    }).then(()=>{
      return getDownloadURL(storageRef);
    }).then((GroupPhotoDownload) =>{
      set(push(dbref(db, 'Groups/')), {
        WhoCreateGroupUid: auth.currentUser.uid,
        WhoCreateGroupName: auth.currentUser.displayName,
        WhoCreateGroupPhotoUrl: auth.currentUser.photoURL,
        WhoCreateGroupEmail: auth.currentUser.email,
        GroupName: GroupInputValue.GroupName,
        GroupTagName: GroupInputValue.GroupTagName,
        GroupPhotoUrl: GroupPhotoDownload,
        CreatedAt: moment().format("MM, DD, YYYY, h:mm:ss a"),});
        successtoast (`Creating Group Successfull`, "top-center", 5000)
    }).catch((err)=>{
      setloading(false);
      Errortoast(`Group Create Error ${err}`, "top-center")
    }).finally(()=>{
      setGroupInputValue({
        GroupName: "",
        GroupTagName: '',
      });
      setCropData('');
      setImage("");
      closeModal('');
      setloading(false);
      setIsDropdownOpen(false);
    });
  });
 /**
  * todo: toggledropdown button implement
  */
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 const toggleDropdown = () => {
   setIsDropdownOpen(!isDropdownOpen);
 };
  return (
    <div className='w-[32.5%] h-[50vh]'>
<div>
<div className=' mb-5'>
            <Search/>
        </div>
    <div className=' bg-white min-h-[276px] rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl font-Poppins font-semibold text-black'>Groups List</h2>
            <div className="relative">
      <button className="text-xl text-commonBackground cursor-pointer" onClick={toggleDropdown}>
      <BsThreeDotsVertical/>
      </button>
      {isDropdownOpen && (
        <div className="absolute top-[25px] right-[6px] w-[170px] flex justify-center items-center py-[12px] bg-white drop-shadow-SearchShadow rounded-lg z-20">
          <button className='text-gray-400 font-medium font-openSans text-[16px] w-full flex items-center py-1 hover:bg-[#8080803d]' onClick={openModal}><span className='text-[18px] text-[#00000075] pl-[15px] pr-[16px]'><GrGroup/></span>Create Group</button>
        </div>
      )}
    </div>
        </div>
        <div className=' w-full h-[31vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-commonBackground scrollbar-track-gray-200'>
            {[...new Array (10)].map ((_, index)=>(
                            <div className='' key={index}>
                            <div className='HomePageAfter'>
                            <div>
                                <picture><img src={esmern} alt={esmern} className='GroupListImage'/></picture>
                            </div>
                            <div className='flex justify-between items-start w-[75%]'>
                                <div>
                                    <h3 className='groupListHeading'>ES-MERN-2307</h3>
                                    <p className='GroupListSumHeading'>Hi Guys, Wassup!</p>
                                </div>
                                <div>
                                    <button className='GroupListButton'>Join</button>
                                </div>
                            </div>
                        </div>
                            </div>
            ))};
        </div>
    </div>
    <div>
        <Modal className={""}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className='text-3xl text-red-600 w-full h-full flex justify-end' onClick={closeModal}><RxCross2/></button>
        <h2 className='text-2xl text-commonBackground font-openSans font-semibold mb-2'>Group Information</h2>
        <form className='w-full max-w-[900px] flex flex-col' onSubmit={(e)=>{e.preventDefault()}}>
          <div className="w-full flex gap-x-5">
          <div className="w-full">
           <label className='text-base text-black font-Poppins font-medium' htmlFor="GroupName">Group Name<span className='text-xl text-red-600'>*</span></label>
           <input className='w-full px-4 py-3 rounded-xl outline-0 mt-1 mb-3 border-[1px] border-red-400' type="text" placeholder='GroupName' id='GroupName' name='GroupName' value={GroupInputValue.GroupName} onChange={OnGroupChangeHandlear}/>
           </div>
          <div className="w-full">
          <label className='text-base text-black font-Poppins font-medium' htmlFor="GroupName">Group Tag Name<span className='text-xl text-red-600'>*</span></label>
          <input className='w-full px-4 py-3 rounded-xl outline-0 mt-1 mb-3 border-[1px] border-red-400' type="text" placeholder='GroupTagName' id='GroupTagName' name='GroupTagName' value={GroupInputValue.GroupTagName} onChange={OnGroupChangeHandlear}/>
          </div>
          </div>
         {/* Cropper img start */}
         <div className="w-full h-full flex flex-wrap gap-x-3">
            <div className="w-full">
                <input type="file" onChange={onChange} />
            </div>
      <div className="w-[32%] h-[250px] overflow-hidden">
        <button className="text-commonBackground text-base font-medium font-openSans">Use default img</button>
        <Cropper
          ref={cropperRef}
          style={{ height: 250, width: "100%" }}
          zoomTo={0.2}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
      </div>
      <div className="w-[32%] h-[250px] overflow-hidden">
        <div className="box">
          <h1>Preview</h1>
          <div className="img-preview w-[288px] h-[250px] overflow-hidden"/>
        </div>
      </div>
      <div className="w-[32%] !h-[250px] overflow-hidden">
      <div className="box">
          <h1>
            <button onClick={getCropData} className="text-commonBackground text-base font-medium font-openSans">
              Crop Image
            </button>
          </h1>
          <img className="object-fill w-full !h-[250px]" src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
         {/* Cropper img end */}
         {loading? (
        <button className='w-[150px] h-[50px] bg-white rounded-xl border-[2px] border-gray-300 flex justify-center items-center mt-4 text-base font-Poppins font-medium text-black' onClick={handleGroup}>Loading......</button>
         ) : 
        <button className='w-[150px] h-[50px] bg-white rounded-xl border-[2px] border-gray-300 flex justify-center items-center mt-4 text-base font-Poppins font-medium text-black' onClick={handleGroup}>Create Group</button>
      }
        </form>
      </Modal>
    </div>
</div>
    </div>
  )
}

export default GroupList