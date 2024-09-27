import React, { useState, useRef, useEffect } from "react";
import {BsThreeDotsVertical } from 'react-icons/bs'
import Modal from 'react-modal';
import { RxCross2 } from 'react-icons/rx';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Errortoast, successtoast} from "../../../../../../Utils/tostify/tostify.js"
import { getStorage, ref, uploadString, getDownloadURL} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { GrGroup } from "react-icons/gr";
import { getDatabase, ref as dbref, set, push, onValue, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { ThreeDots } from 'react-loader-spinner'
const defaultSrc = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
const MyGroup = () => {
  const db = getDatabase();
  const storage = getStorage();
  const auth = getAuth();
  const [image, setImage] = useState(defaultSrc);
  const cropperRef = useRef(null);
  const [cropData, setCropData] = useState("#");
  // groupinputstate
  const [loading, setloading] = useState(false);
  const [GroupInputValue, setGroupInputValue] = useState({
        GroupName: "",
        GroupTagName: "",
    });
    const [GroupNameError, setGroupNameError] = useState(false);
    const [ GroupTagNameError, setGroupTagNameError] = useState(false);
    // modal state
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
}
function closeModal() {
    setIsOpen(false);
    setIsDropdownOpen(false);
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
      setGroupNameError(true);
      return Errortoast(`GroupName missing`, "top-center", 7000);
    }else if(!GroupTagName){
      setGroupNameError(false);
      setGroupTagNameError(true);
      return Errortoast(`GroupTagName missing`, "top-center", 7000);
    }else if(cropData === "#"){
      setGroupTagNameError(false);
      return Errortoast(`Image not cropped. Please crop the image before creating the group.`, "top-center", 7000);
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
      setGroupNameError(false);
      setGroupTagNameError(false);
    });
  });
 /**
  * todo: toggledropdown button implement
  */
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 const toggleDropdown = () => {
   setIsDropdownOpen(!isDropdownOpen);
 };
    const [allGroupList, setallGroupList] = useState ([]);
    const [allGroupRequestList, setallGroupRequestList] = useState ([]);
    useEffect(()=>{
      const fatchGroup = (() =>{
        const GroupListRef = dbref(db, 'Groups/');
        onValue(GroupListRef, (snapshot) => {
        const GroupBlankArr = [];
        snapshot.forEach((item) =>{
            if(item.val().WhoCreateGroupUid === auth.currentUser.uid){
                GroupBlankArr.push({...item.val(), Groupkey: item.key})
            }
        });
        setallGroupList(GroupBlankArr);
});
      });
      const fatchRequestGroup = (() =>{
        const GroupListRef = dbref(db, 'GroupRequest/');
        onValue(GroupListRef, (snapshot) => {
        const GroupBlankArr = [];
        snapshot.forEach((item) =>{    
        GroupBlankArr.push({...item.val(), GroupRequestkey: item.key})
        });
        setallGroupRequestList(GroupBlankArr);
});
      });
      fatchGroup ();
      fatchRequestGroup();
    }, []);
    
    const handleGroupRequestAccept = (group) =>{
      set(dbref(db, "GroupMember"),{
        ...group,
        CreatedAt: moment().format("MM, DD, YYYY, h:mm:ss a"),
      }).then(() =>{
        remove (dbref(db, `GroupRequest/${group.GroupRequestkey}`));
      })
      console.log(group);
    };
    const handleGroupRequestCancle = ((group = {}) =>{
      remove (dbref(db, `GroupRequest/${group.GroupRequestkey}`));
    });
    /**
     * todo: Group member data fetch
     */

  return (
    <div className='w-[32.5%] h-[43vh] bg-white rounded-[20px] drop-shadow-SearchShadow px-5 py-3 flex flex-col gap-y-[10px]'>
        <div className='flex justify-between items-center'>
          <div className="relative">
          <h2 className='text-xl font-Poppins font-semibold text-black'>My Group</h2>
            <span className="absolute top-[-4px] right-[-20px] flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-commonBackground opacity-75"></span>
            <span className="relative rounded-full h-5 w-5 bg-commonBackground text-xs text-white flex justify-center items-center">
              {allGroupList?.length}
            </span>
          </span>
          </div>
            <div className="relative">
      <button className=" text-xl text-commonBackground cursor-pointer" onClick={toggleDropdown}>
      <BsThreeDotsVertical/>
      </button>
      {isDropdownOpen && (
        <div className="absolute top-[25px] right-[6px] w-[170px] flex justify-center items-center py-[12px] bg-white drop-shadow-SearchShadow rounded-lg z-20">
          <button className='text-gray-400 font-medium font-openSans text-[16px] w-full flex items-center py-1 hover:bg-[#8080803d]' onClick={openModal}><span className='text-[18px] text-[#00000075] pl-[15px] pr-[16px]'><GrGroup/></span>Create Group</button>
        </div>
      )}
    </div>
        </div>
  <div className='h-full w-full overflow-y-scroll hide-scrollbar'>
      {allGroupList?.length > 0 ? (allGroupList?.map ((item)=>(
                      <div>
                      <div className='HomePageAfter'>
                      <div className="flex gap-x-2 items-center">
                      <div>
                          <picture><img src={item? item.GroupPhotoUrl : user} alt={item? item.GroupPhotoUrl : user} className='allImage'/></picture>
                      </div>
                      <div>
                              <h3 className='allHeading'>{item? item.GroupName : "Laughter Lounge"}</h3>
                              <p className='allSubHeading'>{item? item.GroupTagName : "Hi Guys, Wassup!"}</p>
                          </div>
                      </div>

                          <div>
                          
                            {
                              allGroupRequestList?.map((group) => 
                                group.Groupkey == item.Groupkey  && (<div className="flex gap-x-1"> <button className="bg-blue-500 text-sm text-white font-Poppins font-normal px-3 py-[5px] rounded-md" onClick={() => handleGroupRequestAccept (group)}>Accept</button>
                                  <button className="bg-red-500 text-sm text-white font-Poppins font-normal px-3 py-[5px] rounded-md" onClick={() => handleGroupRequestCancle (group)}>Cancle</button>
                                  </div>)
                              )
                            }
                      </div>
                  </div>
                      </div>
      ))) : (<div className='w-full h-full flex justify-center items-center'>
<div className=' text-base text-red-400 font-Nunito font-medium'>"No groups have been created yet."</div>
      </div> )}

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
           <input className= {`w-full px-4 py-3 rounded-xl outline-0 mt-1 mb-3 border-2 ${GroupNameError ? "border-red-600" : "border-commonBackground"} `} type="text" placeholder='GroupName' id='GroupName' name='GroupName' value={GroupInputValue.GroupName} onChange={OnGroupChangeHandlear}/>
           </div>
          <div className="w-full">
          <label className='text-base text-black font-Poppins font-medium' htmlFor="GroupName">Group Tag Name<span className='text-xl text-red-600'>*</span></label>
          <input className={`w-full px-4 py-3 rounded-xl outline-0 mt-1 mb-3 border-2 ${GroupTagNameError ? "border-red-600" : "border-commonBackground"}`} type="text" placeholder='GroupTagName' id='GroupTagName' name='GroupTagName' value={GroupInputValue.GroupTagName} onChange={OnGroupChangeHandlear}/>
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
        <button className='w-full h-[50px] bg-white rounded-xl border-[2px] border-gray-300 flex justify-center items-center mt-4 text-base font-Poppins font-medium text-black' onClick={handleGroup}>  <ThreeDots
        visible={true}
        height="50"
        width="50"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></button>
         ) : 
         <button className='w-full h-[50px] bg-white hover:bg-commonBackground transition-all duration-300 ease-linear hover:text-white rounded-xl border-[2px] border-commonBackground flex justify-center items-center mt-4 text-base font-Poppins font-medium text-commonBackground' onClick={handleGroup}>Create Group</button>
      }
        </form>
      </Modal>
    </div>
    </div>
  )
}

export default MyGroup