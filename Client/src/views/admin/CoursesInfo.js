import React,{useState,useEffect, useCallback, useRef} from "react";
import ReactQuill,{Quill} from 'react-quill';
import { useParams } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import ReactTags from 'react-tag-autocomplete'
import Modal from "react-modal";
import axios from "axios";
import FilesService from '../../services/files'
import ValidateService from '../../services/validateValue'
import DateTimesService from '../../services/datetimes'
import { useToasts } from 'react-toast-notifications';
import Spinner from '../../components/Loadings/spinner/Spinner';
import { useFormik  } from "formik";
import Select from 'react-select'
import * as Yup from "yup";
import ReactPaginate from 'react-paginate';
import ConfirmDialog from "components/ConfirmDialog/ConfirmDialog";
import urlPath from 'services/urlServer';
import ImageResize from 'quill-image-resize-module-react';
import * as Storage from "../../../src/services/Storage.service";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const locale = require("react-redux-i18n").I18n;
Quill.register('modules/imageResize', ImageResize);
Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding:'0%',
    width:'80%',
    height:'90%',
    transform: 'translate(-50%, -50%)',
    overflowY: 'auto',
    overflowX: 'auto',
  },overlay: {zIndex: 100, backgroundColor: 'rgba(70, 70, 70, 0.5)',}
};

export default function Courses() {

  //#region Const State
    const [listCourse, setListCourse] = useState([]);
    const [listSubject, setListsubject] = useState([]);
    const [listAttach, setListAttach] = useState([]);
    const [numberHour, setNumberHour] = useState("0");
    const [headName , setHeadName] = useState("หลักสูตร");
    const [Name , setName] = useState("หลักสูตร");
    const [NameEng , setNameEng] = useState("Curriculum");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenAttach, setIsOpenAttach] = useState(false);
    const [modalIsOpenSubject, setIsOpenSubject] = useState(false);
    const { addToast } = useToasts();
    const [isLoading, setIsLoading] = useState(false);
    let { id } = useParams();
    const [enableControl,setIsEnableControl] = useState(false);
    const [enableSubjectControl,setIsEnableSubjectControl] = useState(true);
    const [isNew,setIsNew] = useState(false);
    const [isNewSubject,setIsNewSubject] = useState(false);
    const [tags, setTags] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [attachNumber, setAttachNumber] = useState(0);
    const usersPerPage = 10;
    const attachPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pagesAttach = attachNumber * attachPerPage;
    const [optionsLearning, setOptionsLearning] = useState([])
    const [imageCourses, setImageCourses] = useState("");
    const [imageCoursesName,setImageCourseName] = useState("");
    const [arrayAttach,setArrayAtteach] = useState([]);
    const [isHourCourse,setIsHourCourse] = useState(false);
    const [optionsLearningEng, setOptionsLearningEng] = useState([])
    const options = [
      { value: '1', label: 'ปฏิทิน' },
      { value: '2', label: 'การปลูก' },
      { value: '3', label: 'การแปรรูป' }
    ];

    const optionsEng = [
      { value: '1', label: 'Calendar' },
      { value: '2', label: 'Production' },
      { value: '3', label: 'Prosessing' }
    ];
  //#endregion

  const handleKeyDown = (event) => {

    event.stopPropagation(); //Get the keydown event
  }

  const onChangeEventCourseTH = (content) => {
    formik.setFieldValue('DescriptionTH',content);
    formik.values.DescriptionTH = content;
  }

  const onChangeEventCourseENG = (content) => {
    formik.setFieldValue('DescriptionENG',content);
    formik.values.DescriptionENG = content;
  }

  const onChangeEventSubjectTH = (content) => {
    formikSubject.setFieldValue('ContentTH',content);
    formikSubject.values.ContentTH = content;
  }

  const onChangeEventSubjectENG = (content) => {
    formikSubject.setFieldValue('ContentENG',content);
    formikSubject.values.ContentENG = content;
  }

  //#region list Subject and Attach
  /****************** list Subject *******************************************/
  const pageCount = Math.ceil(listSubject.length / usersPerPage);

  const changePage = ({ selected }) => {
      setPageNumber(selected);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModalSubject() {
    setIsOpenSubject(true);
  }

  function closeModalSubject() {
    setIsOpenSubject(false);
  }

  function DeletedSubject(id){
      axios
      .delete(urlPath+`/subjects/${id}`)
      .then(() => {
        setListsubject(
          listSubject.filter((val) => {
            return val.id !== id;
          })
        );
        closeModalSubject();
    });
  }

  const displayUsers = listSubject
  .slice(pagesVisited, pagesVisited + usersPerPage)
  .map((value) => {
      return (
        <>
        <tr key={value.id}>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 cursor-pointer">
            <span onClick={() => {fetchDetailSubject(value.id);  openModal(); } }> {value.SubjectOfHour}  {locale.t("Course.info.lblMin")}</span>
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-bold cursor-pointer">
            <span onClick={() => {fetchDetailSubject(value.id);  openModal(); } }> {((Storage.GetLanguage()==="th") ? value.SubjectNameTH : value.SubjectNameENG)}</span>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 font-bold">
            <label className="text-red-500 cursor-pointer" onClick={()=>{openModalSubject()}}> <i className="fas fa-trash"></i> {locale.t("Button.lblDelete")}</label>
            <ConfirmDialog  showModal={modalIsOpenSubject} message={ (Storage.GetLanguage()==="th") ? "หัวข้อการเรียนรู้" : "learning topic"} hideModal={()=>{closeModalSubject()}} confirmModal={() => {DeletedSubject(value.id)}} id={value.id}/>
          </td>
        </tr>
        </>
    );
  });

  /**************** List and Confirm Attach *****************/
  const attachCount = Math.ceil(listAttach.length / attachPerPage);

  const changeAttachPage = ({ selected }) => {
    setAttachNumber(selected);
  };

  function openModalAttach() {
    setIsOpenAttach(true);
  }

  function closeModalAttach() {
    setIsOpenAttach(false);
  }

  const displayAttach = listAttach
  .slice(pagesAttach, pagesAttach + attachPerPage)
  .map((value) => {
      return (
        <>
          <tr key={value.id}>
            <td className=" float-right border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-2 font-bold">
              <img src={require("assets/img/"+FilesService.changeImageType(value.FileType)).default} className="CourseFilePic" alt="user Pic" />
            </td>
            <td  className="text-left border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-2 font-bold">
              <span className="cursor-pointer" onClick= {() => {DownloadFile(value.FileData,value.FileName)}} >{value.FileName}</span>
            </td>
            <th className="text-left  border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-2 ">
              { DateTimesService.formatDate(value.createdAt) }
            </th>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-2 font-bold">
              <label className="text-red-500 cursor-pointer" onClick={()=>{openModalAttach()}}> <i className="fas fa-trash"></i> {locale.t("Button.lblDelete")}</label>
              <ConfirmDialog  showModal={modalIsOpenAttach} message={"ไฟล์แนบ"} hideModal={()=>{closeModalAttach()}} confirmModal={() => {DeletedFile(value.id)}} type={value.FileType} id={value.Id}/>
            </td>
          </tr>
        </>
    );
  });
  //#endregion

  //#region Upload and Deleted File
  const handleFileUpload = async (e) => {
    const base64 = await FilesService.convertToBase64(e.target.files[0]);
    if( e.target.files[0].size > 25000000)
    {
      addToast('Size file over 25 MB', { appearance: 'error', autoDismiss: true });
    } else { 
      const data = {FileName:e.target.files[0].name,FileType:e.target.files[0].type,FileData:base64,IsDeleted:false}      
      setArrayAtteach([...arrayAttach, data]);
      setListAttach([...listAttach, data]);
      //UploadFile(data);
    }
  };

  const UploadFile = (data) => {
      console.log(data)
      axios.post(urlPath+"/attachs",data ,{
        headers: {accessToken : localStorage.getItem("accessToken")}
      }).then((response)=>{
      if(response.data.error) {
        //console.log(response.data.error);
      } else {
        //console.log(response.data)
        //addToast('บันทึกข้อมูลสำเร็จ', { appearance: 'success', autoDismiss: true });
        //setListAttach([...listAttach, data]);
      }
    });
  };

  const DeletedFile = (id) => {
      setIsLoading(true);
      axios
      .delete(urlPath+`/attachs/${id}`,{
        headers: {accessToken : localStorage.getItem("accessToken")}
      })
      .then(() => {
        setListAttach(
          listAttach.filter((val) => {
            return val.id !== id;
          })
        );
        closeModalAttach();
        setIsLoading(false);
    });
  }

  const DownloadFile = (e,title) => {
    setIsLoading(true);
    setTimeout(() => {
      var a = document.createElement("a"); //Create <a>
      a.href = FilesService.buffer64(e); //Image Base64 Goes here
      a.download =title; //File name Here
      a.click();
    }, 1000);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  //#endregion

  //#region FetchData

  async function fetchData() {  
    setIsLoading(true);
    let response = await axios(
      urlPath+`/courses/byId/${id}`
    );
    let user = await response.data;
    if(user !== null) {
      for(var columns in response.data) {
        if(columns === "DescriptionTH" || columns === "DescriptionENG")
        { 
          formik.setFieldValue(columns,FilesService.buffer64UTF8(response.data[columns]), false) 
        }
        else if (columns === "CurriculumTag")
        {
          var JsonTags = JSON.parse(response.data[columns]);
          let StringJson = ([]);
          for(var i=0;i<JsonTags.length;i++){
            StringJson[i] = {id:undefined,name:JsonTags[i].name}
          }
          setTags(StringJson)
        }else if(columns === "ImageCourses")
        {
          if(response.data[columns] !== null)
          {
            const buffer = FilesService.buffer64UTF8(response.data[columns]);
            setImageCourses(buffer);
          }
        }else if (columns === "ImageName")
        {
          setImageCourseName(response.data[columns]);
          formik.setFieldValue(columns, response.data[columns], false)
        }
        else 
          formik.setFieldValue(columns, response.data[columns], false)
      }
      setListCourse(response.data);
      setIsNew(false);
      setIsLoading(false);
      setIsEnableControl(true);
    } else {
      setIsNew(true);
      setIsEnableControl(false);
      setIsLoading(false);
    }
  }

    async function fetchDataSubject() {
      let response = await axios(urlPath+`/subjects/byCoursesId/${id}`);
      let subjects = await response.data;
      if(subjects !== null) {
        // for(var columns in response.data) {
        //   if(columns === "ContentTH" || columns === "ContentENG")
        //   {  
        //     formikSubject.setFieldValue(columns,FilesService.buffer64UTF8(response.data[columns]), false) 
        //   }
        //   else 
        //     formikSubject.setFieldValue(columns, response.data[columns], false)
        // }
        setListsubject(response.data);
      } 
    }

    async function fetchAttach(SubjectId) {
      let response = await axios(urlPath+`/attachs/bySubjectsId/${SubjectId}`,{
        headers: {accessToken : localStorage.getItem("accessToken")}
      });
      let attach = response.data;
      if(attach !== null) {
        // for(var columns in response.data) {
        //   if(columns === "FileData")
        //     formikSubject.setFieldValue(columns,FilesService.buffer64(response.data[columns]), false) 
        //   else 
        //     formikSubject.setFieldValue(columns, response.data[columns], false)
        // }
        setListAttach(response.data);
      }
    }
  
    async function fetchDetailSubject(SubjectId) {
      setIsLoading(true);
      setListAttach([]);
      let response = await axios(urlPath+`/subjects/byId/${SubjectId}`);
      let subjects = response.data;
      if(subjects !== null) {
        for(var columns in response.data) {
          if(columns === "ContentTH" || columns === "ContentENG")
          {  
            formikSubject.setFieldValue(columns,FilesService.buffer64UTF8(response.data[columns]), false) 
          }
          else 
            formikSubject.setFieldValue(columns, response.data[columns], false)
        }
        await fetchAttach(response.data.id);
        setIsNewSubject(false);
        setIsEnableSubjectControl(true);
      }
      setIsLoading(false); 
    }

    async function fetchLearning() {
      const response = await axios(urlPath+"/learning");
      const body = await response.data.listLearning;
      var JsonLearning = [];
      body.forEach(field => JsonLearning.push({value: field.id.toString(),label: field.LearningPathNameTH }))
      setOptionsLearning(JsonLearning);
      JsonLearning = [];
      body.forEach(field => JsonLearning.push({value: field.id.toString(), label:  field.LearningPathNameENG }))
      setOptionsLearningEng(JsonLearning)
    }

  //#endregion 
  
  //#region formik
  /****************************formik Course****************************/
  const formik = useFormik({
    initialValues : {
      id:'',
      CurriculumCode:'',
      CurriculumNameTH:'',
      CurriculumNameENG:'',
      CurriculumType:'',
      NumOfHours:0,
      NumOfMin:0,
      DescriptionTH:'',
      CurriculumTag:'',
      DescriptionENG:'',
      IsComMat:false,
      IsLCDMat:false,
      IsOtherMat:false,
      IsDocMedia:false,
      IsOtherMedia:false,
      IsDeleted:false,
      LearningId:'',
      ImageCourses:'',
      ImageName:''
   },
   validationSchema: Yup.object({
      CurriculumCode:Yup.string().required((Storage.GetLanguage() === "th") ? '* กรุณากรอก รหัสหลักสูตร' : '* Please enter Curriculum code'),
      CurriculumNameTH:Yup.string().required((Storage.GetLanguage() === "th") ?'* กรุณากรอก ชื่อหลักสูตร' : '* Please enter Curriculum name' ),
      NumOfHours: Yup.string().required((Storage.GetLanguage() === "th") ? '* กรุณากรอก จำนวนชั่วโมงหลักสูตร' : '* Please enter Curriculum hours'),
      DescriptionTH:Yup.string().required((Storage.GetLanguage() === "th") ?'* กรุณากรอก ขอบเขตเนื้อหา (ไทย)' : '* Please enter Content scope (Thai)')
   }),
   onSubmit: values => {
    setIsLoading(true);
    setIsHourCourse(false);
    formik.values.CurriculumType = (formik.values.CurriculumType === "") ? "1" : formik.values.CurriculumType;
    formik.values.LearningId = (formik.values.LearningId === "") ? "1" : formik.values.LearningId;
    formik.values.CurriculumTag = tags;
    formik.values.ImageCourses = imageCourses;
    formik.values.ImageName = imageCoursesName;
    if(values.DescriptionENG === null) values.DescriptionENG="";
    if(formik.values.NumOfHours > 0 || formik.values.NumOfMin > 0)
    {
      axios.get(urlPath+`/courses/ByCurriculum/${values.CurriculumCode}`,{
        headers: {accessToken : localStorage.getItem("accessToken")}
      }).then((response) => {

        if(response.data === null || response.data.id === values.id) {
          if(isNew) {
            axios.post(urlPath+"/courses",values).then((response)=>{
            if(response.data.error) 
            {
              addToast(response.data.error, { appearance: 'error', autoDismiss: true });
            } else {
              addToast((Storage.GetLanguage() === "th") ? 'บันทึกข้อมูลสำเร็จ' : 'Save data successfully', { appearance: 'success', autoDismiss: true });
              setIsEnableControl(true);
              setIsNew(false)
              formik.setFieldValue('id',response.data.listOfCourses.id);
              setListCourse(response.data.listOfCourses);
              // axios.get(urlPath+"/courses").then((response) =>   {
              //   setListCourse(response.data.listOfCourses);
              // });
            }
  
          });
          } else {
              if(values.id === undefined)
                values.id = listCourse.filter(x => x.CurriculumCode === formik.values.CurriculumCode )[0].id;
              axios.put(urlPath+"/courses",values).then((response) => {
              if(response.data.error) 
              {
                addToast(response.data.error, { appearance: 'error', autoDismiss: true });
              } else {
                addToast((Storage.GetLanguage() === "th") ? 'บันทึกข้อมูลสำเร็จ' : 'Save data successfully', { appearance: 'success', autoDismiss: true });
                setIsEnableControl(true);
              }
            });
          }
        } else {
          addToast( (Storage.GetLanguage() === "th") ? 'ไม่สามารถบันทึกข้อมูลได้ เนื่องจากรหัสหลักสูตรซ้ำ กรุณากรอกรหัสหลักสูตรใหม่' : 'Failed to save data. due to duplicate Curriculum code Please enter a new Curriculum code' , { appearance: 'warning', autoDismiss: true });
        }
        setIsLoading(false);
      });
    } else {
      setIsHourCourse(true);
      setIsLoading(false);
    }

   },
 });

 /*********************************************** formik Subject **********************************************************/
  const formikSubject = useFormik({
    initialValues : {
      SubjectCode:'',
      SubjectNameTH:'',
      SubjectNameENG:'',
      SubjectOfHour:'',
      ContentTH:'',
      ContentENG:'',
      CourseId:'',
      IsDeleted:false
  },
  validationSchema: Yup.object({
    SubjectCode:Yup.string().required((Storage.GetLanguage() === "th") ? '* กรุณากรอก รหัสหัวข้อการเรียนรู้' : 'Please enter the Subject code'),
    SubjectNameTH:Yup.string().required((Storage.GetLanguage() === "th") ?'* กรุณากรอก ชื่อหัวข้อการเรียนรู้' : 'Please enter the Subject name'),
    ContentTH:Yup.string().required((Storage.GetLanguage() === "th") ?'* กรุณากรอก เนื้อหา (ไทย)' : 'Please enter the Content (thai)'),
  }),
  onSubmit: values => {      
    setIsLoading(true);
    values.CourseId = (id === undefined) ? listCourse.id : id;
    console.log('2')
    if(values.ContentENG === null) values.ContentENG="";
    if(values.SubjectOfHour === null || values.SubjectOfHour === '' ) values.SubjectOfHour=0;
    console.log(values)
    axios.get(urlPath+`/subjects/bySubjectCode/${values.SubjectCode}`,{
        headers: {accessToken : localStorage.getItem("accessToken")}
      }).then((response) => {

        var SaveSubject = false;
        console.log(values)
        if(response.data === null || response.data.length === 0) {
          SaveSubject = true;
        } else if (response.data !== null  && response.data[0].id === values.id && values.id !== undefined) { 
          SaveSubject = true;
        } else {
          addToast( (Storage.GetLanguage() === "th") ? 'ไม่สามารถบันทึกข้อมูลได้ เนื่องจากรหัสหัวข้อการเรียนรู้ซ้ำ กรุณากรอกรหัสหัวข้อการเรียนรู้ใหม่' : 'Failed to save data. due to duplicate Subject code Please enter a new Subject code' , { appearance: 'warning', autoDismiss: true });
        } 

        if(SaveSubject){
          if(isNewSubject){
            axios.post(urlPath+"/subjects",values).then((response)=>{
            if(response.data === null) 
            {
              //addToast(response.data.error, { appearance: 'error', autoDismiss: true });
            } else {
              addToast((Storage.GetLanguage() === "th") ? 'บันทึกข้อมูลสำเร็จ' : 'Save data successfully', { appearance: 'success', autoDismiss: true });
              setIsNewSubject(false)
              setIsEnableSubjectControl(true);
              formikSubject.setFieldValue('id',response.data.listOfSubjects.id);
              setListsubject([...listSubject,response.data.listOfSubjects]);
              arrayAttach.forEach(value =>  {
                const data = {FileName:value.FileName,FileType:value.FileType,FileData:value.FileData,IsDeleted:false,SubjectId:response.data.listOfSubjects.id}
                UploadFile(data);
              });
              setArrayAtteach([]);
              // axios.get(urlPath+`/subjects/byCoursesId/${values.CourseId}`).then((response) =>   {
              //   setListsubject(response.data);
              // });
            }
          });
          } else {
            if(values.id === undefined)
              values.id = listSubject.filter(x => x.SubjectCode === formikSubject.values.SubjectCode )[0].id;
            axios.put(urlPath+"/subjects",values).then((response) => {
              if(response.data === null) 
              {
                //addToast(response.data.error, { appearance: 'error', autoDismiss: true });
              } else {
    
                  arrayAttach.filter(e => e.SubjectId === undefined).forEach(value => {
                    const data = {FileName:value.FileName,FileType:value.FileType,FileData:value.FileData,IsDeleted:false,SubjectId:response.data.id}
                    UploadFile(data);
                  })
                  setArrayAtteach([]);
                  addToast((Storage.GetLanguage() === "th") ? 'บันทึกข้อมูลสำเร็จ' : 'Save data successfully', { appearance: 'success', autoDismiss: true });
                  setIsEnableSubjectControl(true);
              }
            });
          }
        }

      });
    setIsLoading(false);
    },
  });
  //#endregion
  
  //#region formik Enable
  const EnableControl = (bool) => {
    setIsEnableControl(bool);
    if(bool)
      formik.setErrors({});
  }

  const EnableControlSubject = (bool) => {
    setIsEnableSubjectControl(bool);
    if(bool)
      formikSubject.setErrors({});
  }
  //#endregion

  //#region Other Event
  const reactTags = useRef()

  const onDelete = useCallback((tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex)) 
  }, [tags])

  const onAddition = useCallback((newTag) => {
      setTags([...tags, newTag]) 
  }, [tags])

  const onValidate = useCallback((newTag) => {
    if(!enableControl)
      return newTag;
  })

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const PageChange = (e) => {
    if(!isNew)
      setHeadName(e);

    if(e === "หลักสูตร")
      setName((Storage.GetLanguage() === "th") ? 'หลักสูตร' : 'Curriculum');
    else 
      setName((Storage.GetLanguage() === "th") ? 'หัวข้อการเรียนรู้ / เนื้อหา' : 'Subject / Content');
  }

  /* Default Value Option */
  const defaultValue = (options, value) => {
    if(value.toString() === "" && options[0] !== undefined)
    { 
        value = options[0].value;
    }
    return options ? options.find(option => option.value === value.toString()) : "";
  };
  
  /*จำนวนนาทีสำหรับหลักสูตร*/
  const onHandleTelephoneChange = (e) => {
    if(ValidateService.onHandleNumberChange(e.target.value) !== "" || e.target.value === "" )
    {
        formik.setFieldValue('NumOfMin',(parseInt(e.target.value) > 59) ? "59" : e.target.value);
    }
  };

  /*จำนวนชั่วโมงสำหรับหลักสูตร*/
  const onHandleHourChange = (e) => {
      if(ValidateService.onHandleNumberChange(e.target.value) !== "" || e.target.value === "" )
      {  
        setNumberHour(e.target.value);
        formik.setFieldValue('NumOfHours',e.target.value);
      }
  };

   /*จำนวนชั่วโมงสำหรับหัวข้อย่อยหลักสูตร*/
   const onHandleSubjectHourChange = (e) => {
    if(ValidateService.onHandleNumberChange(e.target.value) !== "" || e.target.value === "" )
    {  
      formikSubject.setFieldValue('SubjectOfHour',e.target.value);
    }
  };

  const handlePictureCourseUpload = async (e) => {
    const base64 = await FilesService.convertToBase64(e.target.files[0]);
    setImageCourses(base64);
    setImageCourseName(e.target.files[0].name);
    formik.setFieldValue('ImageName',e.target.files[0].name);
  }
  //#endregion

  useEffect(()=>{
    setName((Storage.GetLanguage() === "th") ? 'หลักสูตร' : 'Curriculum');
    fetchData();
    fetchDataSubject();
    fetchLearning();
  },[]);

  return (
    <>
      {isLoading ? ( <> <Spinner  customText={"Loading"}/></>) : (<></>)}
      <div className="flex flex-wrap  mt-4 w-full ">
        <div className="w-full lg:w-6/12 px-4">
          <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 " + ((headName === "หลักสูตร") ? "bg-green-mju" : "bg-blueGray-100")}>
            <div className="flex flex-wrap cursor-pointer " onClick={()=> {PageChange("หลักสูตร")}}>
              <div className="lg:w-2/12 py-2 px-2 text-sm text-center align-middle  ">
                <span className={"w-10 h-10 text-sm  inline-flex items-center justify-center  rounded-full " + ((headName === "หลักสูตร") ? "bg-white" : "bg-green-mju")}>
                  <label className={"w-full align-middle font-bold cursor-pointer " + ((headName === "หลักสูตร") ? "text-green-mju" : "text-white") } onClick={()=> {PageChange("หลักสูตร")}}>1</label>
                </span>
              </div>
              <div className="lg:w-10/12 py-2 px-2 text-base  align-middle ">
                <span className="text-sm inline-flex">
                  <label className={"w-full align-middle font-bold pt-3 cursor-pointer " + ((headName === "หลักสูตร") ? "text-white" : "text-black")} onClick={()=> {PageChange("หลักสูตร")}}>{locale.t("Menu.lblCourse")}</label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg border-0 " + ((headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "bg-green-mju" : "bg-blueGray-100")} disabled={isNew}>
            <div className="flex flex-wrap cursor-pointer" onClick={()=> {PageChange("หัวข้อการเรียนรู้ / เนื้อหา")}}>
              <div className=" lg:w-2/12 py-2 px-2 text-sm text-center align-middle ">
                <span className={"w-10 h-10 text-sm  inline-flex items-center justify-center rounded-full " + ((headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "bg-white" : "bg-green-mju")}>
                  <label className={"w-full align-middle font-bold cursor-pointer " + ((headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "text-green-mju" : "text-white") } onClick={()=> {PageChange("หัวข้อการเรียนรู้ / เนื้อหา")}}>2</label>
                </span>
              </div>
              <div className=" lg:w-10/12 py-2 px-2 text-base align-middle ">
                <span className="text-sm inline-flex">
                  <label className={"w-full align-middle font-bold pt-3 cursor-pointer " + ((headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "text-white" : "text-black")}  onClick={()=> {PageChange("หัวข้อการเรียนรู้ / เนื้อหา")}}>{locale.t("Course.info.lblTabCourse")}</label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <form  onKeyDown={(e) => checkKeyDown(e)}>
            <div className="rounded-t bg-white mb-0 px-3 py-3">
              <div className="text-center flex justify-between">
                <div className="">
                  <h6 className="text-blueGray-700 text-xl font-bold mt-2">{locale.t("Menu.lblCourse")} {'>'} <label className="text-green-200-mju">
                  {
                     (Storage.GetLanguage() === "th" && headName === "หลักสูตร") ? "หลักสูตร" : ((Storage.GetLanguage() === "th" && headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "หัวข้อการเรียนรู้ / เนื้อหา" : ((Storage.GetLanguage() === "en" && headName === "หัวข้อการเรียนรู้ / เนื้อหา") ? "Subject / Content" : "Curriculum")) 
                  }</label></h6>
                </div>
                <div className="text-center flex justify-between">
                  <div className={(headName === "หลักสูตร") ? 'block' : 'hidden' }>
                    <button
                    className={" text-white active:bg-purple-active font-bold  text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 " + ((isNew) ? " btn-purple-mju-disable" : " bg-purple-mju")}
                    type="button"
                    disabled={isNew}
                    onClick ={() => {PageChange("หัวข้อการเรียนรู้ / เนื้อหา")}}
                    >
                      <i className="fas fa-book-reader"></i> &nbsp;{locale.t("Course.info.lblTabSubject")}
                    </button>
                  </div>
                  <div className={(headName === "หลักสูตร") ? 'block' : 'hidden' }>
                    {(enableControl && !isNew) ? 
                      <button
                        className="bg-green-mju text-white active:bg-lightBlue-600 font-bold  text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={ () => {EnableControl(false)}}
                      >
                        <i className="fas fa-pencil-alt"></i>&nbsp;{locale.t("Button.lblEdit")}
                      </button> 
                      :
                      <>
                        <button
                          className={"bg-rose-mju text-white active:bg-rose-mju font-bold  text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" + ((isNew ? " hidden" : " "))}
                          type="button" onClick={() =>{EnableControl(true)}} >
                          <i className="far fa-times-circle"></i>&nbsp;{locale.t("Button.lblDrop")}
                        </button>     
           
                        <button className="bg-blue-save-mju text-white active:bg-blueactive-mju font-bold  text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" 
                          type="submit" onClick={formik.handleSubmit} >
                          <i className="fas fa-save"></i>&nbsp;{locale.t("Button.lblSave")}
                        </button>
                        
                      </>
                      }
                    </div>
                </div>
              </div>
            </div>
            <div className={"flex-auto px-4 lg:px-8 py-10 pt-4 " + ((headName === "หลักสูตร") ? "block" : "hidden") }>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 py-1">
                  <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block  text-blueGray-600 text-sm font-bold mb-2"
                          >
                            {locale.t("Course.list.lblCourseCode")} <span className="text-red-500"> *</span>
                          </label>
                          <input
                            type="text"
                            className="border-0 w-90 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            id="CurriculumCode"
                            name="CurriculumCode"
                            maxLength={100}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.CurriculumCode}
                            disabled={enableControl}
                          />
                          {formik.touched.CurriculumCode && formik.errors.CurriculumCode ? (
                                  <div className="text-sm py-2 px-2 text-red-500">{formik.errors.CurriculumCode}</div>
                                ) : null}
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12">
                        <div className="relative w-full mb-3">
                          <label
                            className="block  text-blueGray-600 text-sm font-bold mb-2"
                          >
                            {locale.t("Course.info.lblLearning")}
                          </label>
                          {/* <Select
                              id="LearningId"
                              name="LearningId"
                              onChange={value => {formik.setFieldValue('LearningId',value.value)}}
                              className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded w-90 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                              options={optionsLearning}
                              value={defaultValue(optionsLearning, formik.values.LearningId)}
                              isDisabled={enableControl}
                          /> */}
                          <Select
                            id="learningPathId"
                            name="learningPathId"
                            onChange={value => {  formik.setFieldValue('LearningId',value.value)}}
                            //value={formik.values.title}
                            className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded w-90 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  
                            options={((Storage.GetLanguage() === "th") ? optionsLearning : optionsLearningEng)} 
                            value={defaultValue(((Storage.GetLanguage() === "th") ? optionsLearning : optionsLearningEng), formik.values.LearningId)}
                            isDisabled={enableControl}/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12">
                        <div className="relative w-full mb-3">
                          <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                            {locale.t("Course.info.lblCourseType")}
                          </label>
                          <Select
                              id="CurriculumType"
                              name="CurriculumType"
                              onChange={value => {formik.setFieldValue('CurriculumType',value.value)}}
                              className="border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded w-90 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
                              options={(Storage.GetLanguage()==="th") ? options : optionsEng}
                              value={defaultValue((Storage.GetLanguage()==="th") ? options : optionsEng, formik.values.CurriculumType)}
                              isDisabled={enableControl}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12">
                        <div className="relative w-full mb-3">
                          <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                            {locale.t("Course.info.lblAmountHourse")}<span className="text-red-500"> *</span>
                          </label>
                          <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 mb-3">
                              <input
                                type="text"
                                maxLength="4"
                                className="border-0 px-2 py-1  laceholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear w-60 transition-all duration-150"
                                id="NumOfHours"
                                name="NumOfHours"
                                onChange={ (e) => { onHandleHourChange(e);}}
                                onBlur={formik.handleBlur}
                                value={formik.values.NumOfHours}
                                disabled={enableControl}
                              />
                              <span className="text-sm font-bold"> &nbsp;{locale.t("Course.info.lblHour")}</span>
                            </div>
                            <div className="w-full lg:w-6/12 mb-3">
                              <input
                                type="text"
                                maxLength="2"
                                className="border-0 px-2 py-1  laceholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear w-60 transition-all duration-150"
                                id="NumOfMin"
                                name="NumOfMin"
                                onChange={(e) => {onHandleTelephoneChange(e);}}
                                onBlur={formik.handleBlur}
                                value={formik.values.NumOfMin}
                                disabled={enableControl}
                              /><span className="text-sm font-bold"> &nbsp;{locale.t("Course.info.lblMin")}</span>
                            </div>
                            {formik.touched.NumOfHours && formik.errors.NumOfHours ? (
                              <div className="text-sm py-2 px-2 text-red-500">{formik.errors.NumOfHours}</div>
                            ) : (
                              (isHourCourse) ? <div className="text-sm py-2 px-2 text-red-500">{Storage.GetLanguage("th") ? '* กรุณากรองชั่วโมงหรือนาทีมากกว่า 0' : 'The hour or minute must be greater than 0.' }</div> : null
                            )}
                          </div>
                        
                        </div>
                      </div>
                    </div>
                  </div>
               
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-sm font-bold mb-2"
                        
                      >
                        {locale.t("Course.list.lblCourseNameTH")}<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="CurriculumNameTH"
                        name="CurriculumNameTH"
                        maxLength={255}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.CurriculumNameTH}
                        disabled={enableControl}
                      />
                      {formik.touched.CurriculumNameTH && formik.errors.CurriculumNameTH ? (
                        <div className="text-sm py-2 px-2 text-red-500">{formik.errors.CurriculumNameTH}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-sm font-bold mb-2"
                      >
                        {locale.t("Course.list.lblCourseNameENG")}
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="CurriculumNameENG"
                        name="CurriculumNameENG"
                        maxLength={255}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.CurriculumNameENG}
                        disabled={enableControl}
                      />

                  
                    </div>
                  </div>
                  <div className="w-full px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-sm font-bold mb-2"
                      >
                        {locale.t("Course.info.lblCourseImage")}
                      </label>
                      <div className="buttonIn image-upload ">
                        <label htmlFor="file-input" className="cursor-pointer">
                          <input
                            type="text"
                            className={"  border-0 px-2 py-1  placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" + ((!enableControl) ? " inputNoneDisable" : "")} 
                            id="CurriculumNameENG"
                            name="CurriculumNameENG"
                            value={formik.values.ImageName}
                            readOnly
                            disabled={true}
                          />
                            <span className={"spanUpload px-2 py-1 mt-1 mr-2 text-sm font-bold bg-green-mju " + ((enableControl) ? "opacity-50" : "")} >เลือกรูปภาพ</span>
                          </label>
                          <input id="file-input" type="file" accept="image/jpg, image/jpeg, image/png"  onChange={(e) => handlePictureCourseUpload(e)}       disabled={enableControl}/>
                        </div>
                      </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label
                        className="block  text-blueGray-600 text-sm font-bold mb-2"
                        >
                         {locale.t("Course.info.lblCourseContentTH")}<span className="text-red-500"> *</span>
                      </label>
                      {/* <ReactQuill
                        theme="snow"
                        value={formik.values.DescriptionTH}
                        onChange={v =>  formik.setFieldValue('DescriptionTH', v)} 
                        placeholder={"Write something awesome..."}
                        readOnly={enableControl}
                        modules={{
                          toolbar: [
                            ['bold', 'italic', 'underline', 'strike'] ,
                            [{ align: [] }],
                        
                            [{ list: 'ordered'}, { list: 'bullet' }],
                            [{ indent: '-1'}, { indent: '+1' }],
                        
                            [{ size: ['small', false, 'large', 'huge'] }],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ['link', 'image', 'video'],
                            [{ color: [] }, { background: [] }],
                        
                            ['clean'],['code-block']
                          ],  imageResize: {
                            parchment: Quill.import('parchment'),
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                          },
                          clipboard: {
                            matchVisual: false,
                          },
                        }}
                        formats={[
                          'bold', 'italic', 'underline', 'strike',
                          'align', 'list', 'indent',
                          'size', 'header',
                          'link', 'image', 'video',
                          'color', 'background',
                          'clean','code-block'
                        ]}
                      /> */}
              
                       <SunEditor
                          disable={enableControl}
                          setDefaultStyle="font-family: THSarabun; font-size: 18px;" 
                          width="100%"
                          height="300px"
                          onKeyDown={handleKeyDown} 
                          setContents={formik.values.DescriptionTH}
                          //onChange={v =>  formik.setFieldValue('DescriptionTH', v)} 
                          onChange={onChangeEventCourseTH}
                          setOptions={{
                          buttonList: [
                            [
                              "undo",
                              "redo",
                              "font",
                              "fontSize",
                              "formatBlock",
                              "paragraphStyle",
                              "blockquote",
                              "bold",
                              "underline",
                              "italic",
                              "strike",
                              "fontColor",
                              "hiliteColor",
                              "textStyle",
                              "removeFormat",
                              "outdent",
                              "indent",
                              "align",
                              "horizontalRule",
                              "list",
                              "lineHeight",
                              "table",
                              "link",
                              "image",
                              "video",
                              "fullScreen",
                              "codeView",
                            ]
                          ]
                        }}/>
                      {formik.touched.DescriptionTH && formik.errors.DescriptionTH ? (
                        <div className="text-sm py-2 px-2 text-red-500">{formik.errors.DescriptionTH}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Course.info.lblCourseContentENG")}
                      </label>
                      {/* <ReactQuill
                        theme="snow"
                        value={formik.values.DescriptionENG}
                        onChange={v =>  formik.setFieldValue('DescriptionENG', v)} 
                        placeholder={"Write something awesome..."}
                        readOnly={enableControl}
                        modules={{
                          toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ align: [] }],
                        
                            [{ list: 'ordered'}, { list: 'bullet' }],
                            [{ indent: '-1'}, { indent: '+1' }],
                        
                            [{ size: ['small', false, 'large', 'huge'] }],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ['link', 'image', 'video'],
                            [{ color: [] }, { background: [] }],
                        
                            ['clean'],
                          ],  imageResize: {
                            parchment: Quill.import('parchment'),
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                          },
                          clipboard: {
                            matchVisual: false,
                          },
                        }}
                        formats={[
                          'bold', 'italic', 'underline', 'strike',
                          'align', 'list', 'indent',
                          'size', 'header',
                          'link', 'image', 'video',
                          'color', 'background',
                          'clean',
                        ]}
                      /> */}
                      <SunEditor
                          disable={enableControl}
                          setDefaultStyle="font-family: THSarabun; font-size: 18px;" 
                          width="100%"
                          height="300px"
                          onKeyDown={handleKeyDown} 
                          setContents={formik.values.DescriptionENG}
                          //onChange={v =>  formik.setFieldValue('DescriptionENG', v)} 
                          onChange={onChangeEventCourseENG}
                          setOptions={{
                          buttonList: [
                            [
                              "undo",
                              "redo",
                              "font",
                              "fontSize",
                              "formatBlock",
                              "paragraphStyle",
                              "blockquote",
                              "bold",
                              "underline",
                              "italic",
                              "strike",
                              "fontColor",
                              "hiliteColor",
                              "textStyle",
                              "removeFormat",
                              "outdent",
                              "indent",
                              "align",
                              "horizontalRule",
                              "list",
                              "lineHeight",
                              "table",
                              "link",
                              "image",
                              "video",
                              "fullScreen",
                              "codeView",
                            ]
                          ]
                        }}/>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-3">
                        {locale.t("Course.info.lblEquipment")}
                      </label>
                       <input
                        type="checkbox"
                        className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                        id="IsOtherMat"
                        name="IsOtherMat"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.IsOtherMat}
                        disabled={enableControl}
                      />
                       <label className="text-sm font-bold px-3 text-blueGray-600">{locale.t("Course.info.lblComputer")}</label>
                       <input
                        type="checkbox"
                        className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                        id="IsComMat"
                        name="IsComMat"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.IsComMat}
                        disabled={enableControl}
                      />
                       <label className="text-sm font-bold px-3 text-blueGray-600">{locale.t("Course.info.lblLCD")}</label>
                       <input
                        id="IsLCDMat"
                        type="checkbox"
                        className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                        name="IsLCDMat"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.IsLCDMat}
                        disabled={enableControl}
                      />
                       <span className="pt-2"><label className="text-sm font-bold px-3 text-blueGray-600">{locale.t("Course.info.lblOther")}</label></span>
                       <br/>
                       <br/>
                        <label className="block  text-blueGray-600 text-sm font-bold mb-3">
                          {locale.t("Course.info.lblDocTraining")}
                        </label>
                        <input
                          id="IsOtherMedia"
                          type="checkbox"
                          className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                          name="IsOtherMedia"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.IsOtherMedia}
                          disabled={enableControl}
                        />
                        <label className="text-sm font-bold px-3 text-blueGray-600">{locale.t("Course.info.lblDocument")}</label>
                        &nbsp;
                        <input
                          id="IsDocMedia"
                          type="checkbox"
                          className="form-checkbox rounded text-green-200-mju w-5 h-5 ease-linear transition-all duration-150"
                          name="IsDocMedia"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.IsDocMedia}
                          disabled={enableControl}
                        />
                        <label className="text-sm font-bold px-3 text-blueGray-600">{locale.t("Course.info.lblVDO")}</label>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Main.lblTag")}
                      </label>
                      <div  style={enableControl ? {pointerEvents: "none", opacity: "0.4"} : {}}>
                          <ReactTags
                             ref={reactTags}
                             tags={tags}
                             suggestions={[]}
                             onDelete={onDelete}
                             onAddition={onAddition}
                             onValidate={onValidate}
                             autocomplete={true}
                             maxLength={16}
                             minQueryLength={1}
                             allowNew
                          />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className={"flex-auto px-2 py-2 pt-4 "   + ((headName === "หลักสูตร") ? "hidden" : "block") }>
              <div className="text-center flex justify-between">
                <div className="parent-div text-blueGray-700 text-base font-bold py-2 pt-2">
                    <div className="text-blue-mju text-div-default">
                     {locale.t("Course.info.lblCourse")} : 
                    </div>
                    <div className="text-blue-mju text-div">
                      &nbsp;{(Storage.GetLanguage() === "th") ? formik.values.CurriculumNameTH : formik.values.CurriculumNameENG} 
                    </div>
                    <div className="text-blue-mju text-div-default">
                    &nbsp;({formik.values.NumOfHours} {locale.t("Course.info.lblHour")}{formik.values.NumOfMin} {locale.t("Course.info.lblMin")} ) 
                    </div>
                </div>
                <div>
                  <button
                    className="bg-blue-mju text-white active:bg-lightBlue-600 font-bold text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => { setIsNewSubject(true); setIsEnableSubjectControl(false); setListAttach([]); formikSubject.resetForm(); formikSubject.setFieldValue('ContentTH',null); formikSubject.setFieldValue('ContentENG',null);  openModal(); }}>
                    <i className="fas fa-plus"></i>&nbsp;&nbsp;{locale.t("Subject.list.lblAddSubject")}
                  </button>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                      shouldCloseOnOverlayClick={false} 
                    >
                      <div className="flex flex-wrap">
                        <div className="w-full">
                          <>
                            <div className="relative flex flex-col min-w-0 break-words w-full  rounded-lg bg-blueGray-100 border-0">
                              <form onSubmit={formikSubject.handleSubmit}>
                              <div className="rounded-t bg-white mb-0 px-2 py-2">
                                <div className="text-center flex justify-between">
                                  <div className="">
                                    <h6 className="text-blueGray-700 text-xl font-bold mt-2">{locale.t("Menu.lblCourse")} {'>'} <label className="text-green-200-mju">{(Storage.GetLanguage() === "th") ? headName : "Subject / Content"} </label></h6>
                                  </div>
                                  <div className="">
                                    <button
                                        className={"bg-rose-mju text-white active:bg-rose-mju font-bold  text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"}
                                        type="button"
                                        onClick={closeModal}
                                      >
                                        <i className="fas fa-arrow-left"></i>&nbsp;&nbsp;{locale.t("Button.lblBack")}
                                    </button>    
                                    {(enableSubjectControl && !isNewSubject) ? 
                                      <button
                                        className="bg-green-mju text-white active:bg-lightBlue-600 font-bold  text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={ () => {EnableControlSubject(false)}}
                                      >
                                        <i className="fas fa-pencil-alt"></i>&nbsp;{locale.t("Button.lblEdit")}
                                      </button> 
                                      :
                                      <>
                                        <button
                                          className={"bg-yello-mju text-white active:bg-yello-mju font-bold  text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" + ((isNewSubject ? " hidden" : " "))}
                                          type="button"
                                          onClick={() =>{EnableControlSubject(true)}}
                                        >
                                          <i className="far fa-times-circle"></i>&nbsp;{locale.t("Button.lblDrop")}
                                        </button>     
                                        <button
                                          className="bg-blue-save-mju text-white active:bg-blueactive-mju font-bold  text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" 
                                          type="submit"
                                          >
                                        <i className="fas fa-save"></i>&nbsp;{locale.t("Button.lblSave")}
                                        </button>
                                      </>
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className={"flex-auto px-2 py-2"}>
                                  <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block  text-blueGray-600 text-sm font-bold mb-2"
                                        >
                                          {locale.t("Subject.info.lblSubjectCode")} <span className="text-red-500"> *</span>
                                        </label>
                                        <input
                                          type="text"
                                          className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          id="SubjectCode"
                                          name="SubjectCode"
                                          maxLength={100}
                                          onChange={formikSubject.handleChange}
                                          onBlur={formikSubject.handleBlur}
                                          value={formikSubject.values.SubjectCode}
                                          disabled={enableSubjectControl}
                                        />
                                        {formikSubject.touched.SubjectCode && formikSubject.errors.SubjectCode ? (
                                          <div className="text-sm py-2 px-2 text-red-500">{formikSubject.errors.SubjectCode}</div>
                                        ) : null}
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4 py-1">
                                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                                        {locale.t("Subject.list.lblSubjectTime")}
                                      </label>
                                      <div className="relative w-full mb-3">
                                        <div className="flex flex-wrap">
                                          <div className="w-full lg:w-6/12 mb-3">
                                            <input
                                              type="text"
                                              maxLength="4"
                                              className="border-0 px-2 py-1  laceholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear w-60 transition-all duration-150"
                                              id="SubjectOfHour"
                                              name="SubjectOfHour"
                                              onChange={ (e) => { onHandleSubjectHourChange(e);}}
                                              onBlur={formikSubject.handleBlur}
                                              value={formikSubject.values.SubjectOfHour}
                                              disabled={enableSubjectControl}
                                            />
                                            <span className="text-sm font-bold"> &nbsp;{locale.t("Course.info.lblMin")}</span>
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                  <div className="w-full lg:w-6/12 px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block  text-blueGray-600 text-sm font-bold mb-2"
                                        >
                                          {locale.t("Subject.info.lblSubjectTH")}<span className="text-red-500"> *</span>
                                        </label>
                                        <input
                                          type="text"
                                          className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          id="SubjectNameTH"
                                          name="SubjectNameTH"
                                          maxLength={255}
                                          onChange={formikSubject.handleChange}
                                          onBlur={formikSubject.handleBlur}
                                          value={formikSubject.values.SubjectNameTH}
                                          disabled={enableSubjectControl}
                                        />
                                        {formikSubject.touched.SubjectNameTH && formikSubject.errors.SubjectNameTH ? (
                                          <div className="text-sm py-2 px-2 text-red-500">{formikSubject.errors.SubjectNameTH}</div>
                                        ) : null}
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block  text-blueGray-600 text-sm font-bold mb-2"
                                        >
                                          {locale.t("Subject.info.lblSubjectENG")}
                                        </label>
                                        <input
                                          type="text"
                                          className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          id="SubjectNameENG"
                                          name="SubjectNameENG"
                                          maxLength={255}
                                          onChange={formikSubject.handleChange}
                                          onBlur={formikSubject.handleBlur}
                                          value={formikSubject.values.SubjectNameENG}
                                          disabled={enableSubjectControl}
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full  px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block  text-blueGray-600 text-sm font-bold mb-2">
                                          {locale.t("Subject.info.lblSubjectContentTH")}<span className="text-red-500"> *</span>
                                        </label>
                                        {/* <ReactQuill
                                          theme="snow"
                                          value={formikSubject.values.ContentTH}
                                          onChange={v =>  formikSubject.setFieldValue('ContentTH', v)} 
                                          placeholder={"Write something awesome..."}
                                          readOnly={enableSubjectControl}
                                          modules={{
                                            toolbar: [
                                              ['bold', 'italic', 'underline', 'strike'],
                                              [{ align: [] }],
                                          
                                              [{ list: 'ordered'}, { list: 'bullet' }],
                                              [{ indent: '-1'}, { indent: '+1' }],
                                          
                                              [{ size: ['small', false, 'large', 'huge'] }],
                                              [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                              ['link', 'image', 'video'],
                                              [{ color: [] }, { background: [] }],
                                          
                                              ['clean']
                                            ],  imageResize: {
                                              parchment: Quill.import('parchment'),
                                              modules: ['Resize', 'DisplaySize', 'Toolbar']
                                            },
                                            clipboard: {
                                              matchVisual: false,
                                            },
                                          }}
                                          formats={[
                                            'bold', 'italic', 'underline', 'strike',
                                            'align', 'list', 'indent',
                                            'size', 'header',
                                            'link', 'image', 'video',
                                            'color', 'background',
                                            'clean'
                                          ]}
                                        /> */}
                                        <SunEditor
                                          disable={enableSubjectControl}
                                          setDefaultStyle="font-family: THSarabun; font-size: 18px;" 
                                          width="100%"
                                          height="600px"
                                          onKeyDown={handleKeyDown} 
                                          setContents={formikSubject.values.ContentTH}
                                          // onChange={v =>  formikSubject.setFieldValue('ContentTH', v)} 
                                          onChange={onChangeEventSubjectTH}
                                          setOptions={{
                                          buttonList: [
                                            [
                                              "undo",
                                              "redo",
                                              "font",
                                              "fontSize",
                                              "formatBlock",
                                              "paragraphStyle",
                                              "blockquote",
                                              "bold",
                                              "underline",
                                              "italic",
                                              "strike",
                                              "fontColor",
                                              "hiliteColor",
                                              "textStyle",
                                              "removeFormat",
                                              "outdent",
                                              "indent",
                                              "align",
                                              "horizontalRule",
                                              "list",
                                              "lineHeight",
                                              "table",
                                              "link",
                                              "image",
                                              "video",
                                              "fullScreen",
                                              "codeView",
                                            ]
                                          ]
                                        }}/>
                                        {formikSubject.touched.ContentTH && formikSubject.errors.ContentTH ? (
                                          <div className="text-sm py-2 px-2 text-red-500">{formikSubject.errors.ContentTH}</div>
                                        ) : null}
                                        
                                      </div>
                                    </div>
                                    <div className="w-full  px-4 py-1">
                                      <div className="relative w-full mb-3">
                                        <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                                          {locale.t("Subject.info.lblSubjectContentENG")}
                                        </label>
                                        {/* <ReactQuill
                                          theme="snow"
                                          value={formikSubject.values.ContentENG}
                                          onChange={v =>  formikSubject.setFieldValue('ContentENG', v)} 
                                          placeholder={"Write something awesome..."}
                                          readOnly={enableSubjectControl}
                                          modules={{
                                            toolbar: [
                                              ['bold', 'italic', 'underline', 'strike'],
                                              [{ align: [] }],
                                          
                                              [{ list: 'ordered'}, { list: 'bullet' }],
                                              [{ indent: '-1'}, { indent: '+1' }],
                                          
                                              [{ size: ['small', false, 'large', 'huge'] }],
                                              [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                              ['link', 'image', 'video'],
                                              [{ color: [] }, { background: [] }],
                                          
                                              ['clean']
                                            ],  imageResize: {
                                              parchment: Quill.import('parchment'),
                                              modules: ['Resize', 'DisplaySize', 'Toolbar']
                                            },
                                            clipboard: {
                                              matchVisual: false,
                                            },
                                          }}
                                          formats={[
                                            'bold', 'italic', 'underline', 'strike',
                                            'align', 'list', 'indent',
                                            'size', 'header',
                                            'link', 'image', 'video',
                                            'color', 'background',
                                            'clean'
                                          ]}
                                        /> */}
                                        <SunEditor
                                          disable={enableSubjectControl}
                                          setDefaultStyle="font-family: THSarabun; font-size: 18px;" 
                                          width="100%"
                                          height="600px"
                                          onKeyDown={handleKeyDown} 
                                          setContents={formikSubject.values.ContentENG}
                                          // onChange={v =>  formikSubject.setFieldValue('ContentENG', v)} 
                                          onChange={onChangeEventSubjectENG}
                                          setOptions={{
                                          buttonList: [
                                            [
                                              "undo",
                                              "redo",
                                              "font",
                                              "fontSize",
                                              "formatBlock",
                                              "paragraphStyle",
                                              "blockquote",
                                              "bold",
                                              "underline",
                                              "italic",
                                              "strike",
                                              "fontColor",
                                              "hiliteColor",
                                              "textStyle",
                                              "removeFormat",
                                              "outdent",
                                              "indent",
                                              "align",
                                              "horizontalRule",
                                              "list",
                                              "lineHeight",
                                              "table",
                                              "link",
                                              "image",
                                              "video",
                                              "fullScreen",
                                              "codeView",
                                            ]
                                          ]
                                        }}/>
                                        {formik.touched.SubjectCode && formik.errors.SubjectCode ? (
                                          <div className="text-sm py-2 px-2 text-red-500">{formik.errors.SubjectCode}</div>
                                        ) : null}
                                      </div>
                                    </div>
                                    <div className="w-full mt-2  px-4 ">
                                      <div className="relative w-full mb-3">
                                        <div className=" flex justify-between align-middle  mb-2">
                                          <div>
                                            <label className="block  text-blueGray-600 text-sm font-bold mb-2 mt-2">
                                              {locale.t("Main.lblListAttach")}
                                            </label>
                                          </div>
                                          <div>
                                            <div className="imageUpload" style={ (!enableSubjectControl) ? {} :  {pointerEvents: "none", opacity: "0.4"}}>
                                              <label
                                                className="bg-purple-mju cursor-pointer text-white mb-2 px-2 py-1 active:bg-purple-active font-bold  text-sm rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                htmlFor="file-input2">
                                                  <i className="fas fa-book-reader"></i> {locale.t("Main.lblAttach")}
                                              </label>
                                              <input 
                                                type="file" 
                                                id="file-input2"
                                                onChange={(e) => handleFileUpload(e)}/>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex flex-wrap">
                                          <div className="relative w-full mb-3">
                                            <div className="block w-full overflow-x-auto">
                                            <table className="items-center w-full bg-transparent border-collapse">
                                              <thead>
                                                <tr>
                                                  <th
                                                  className={" px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                                                  >
                                                  </th>
                                                  <th
                                                  className={" px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                                                  >
                                                    {locale.t("Subject.info.FileName")}
                                                  </th>
                                                  <th
                                                  className={"px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                                                  >
                                                    {locale.t("Subject.info.lblFileDate")}
                                                  </th>
                                                  <th
                                                  className={
                                                      "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                  }
                                                  >
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody className="pt-2">
                                                {displayAttach}
                                              </tbody>
                                            </table>
                                            </div>
                                            <div className="py-4">
                                              <ReactPaginate
                                                  previousLabel={" < "}
                                                  nextLabel={" > "}
                                                  pageCount={attachCount}
                                                  onPageChange={changeAttachPage}
                                                  containerClassName={"paginationBttns"}
                                                  previousLinkClassName={"previousBttn"}
                                                  nextLinkClassName={"nextBttn"}
                                                  disabledClassName={"paginationDisabled"}
                                                  activeClassName={"paginationActive"}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            </form>
                          </div>
                          </>
                        </div>
                      </div>
                    </Modal>
                </div>
              </div>           
              <div className="block w-full overflow-x-auto mt-2">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                        <th
                        className={"text-center px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}
                        >
                          {locale.t("Subject.list.lblSubjectTime")}
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                          {locale.t("Subject.list.lblSubject")}
                        </th>
                        <th
                        className={
                            "px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                        >
                        </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayUsers}
                  </tbody>
                </table>
              </div>
              <div className="py-4">
                <ReactPaginate
                    previousLabel={" < "}
                    nextLabel={" > "}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
              </div>
            </div>
          </div>
        </>
        </div>
      </div>

    </>
  );
}
