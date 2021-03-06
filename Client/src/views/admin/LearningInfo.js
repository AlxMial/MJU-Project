import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import ReactQuill,{Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useFormik  } from "formik";
import * as Yup from "yup";
import { useToasts } from 'react-toast-notifications';
import FilesService from 'services/files';
import urlPath from 'services/urlServer';
import ImageResize from 'quill-image-resize-module-react';
import Spinner from '../../components/Loadings/spinner/Spinner'
import * as Storage from "../../../src/services/Storage.service";
import CKEditor from 'react-ckeditor-component';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
const locale = require("react-redux-i18n").I18n;


Quill.register('modules/imageResize', ImageResize);
// components

export default  function Learning() {

  const { addToast } = useToasts();
  let { id } = useParams();
  const [enableControl,setIsEnableControl] = useState(false);
  const [isNew,setIsNew] = useState(false);
  const [listLearning, setListLearning] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleKeyDown = (event) => {
    event.stopPropagation(); //Get the keydown event
  }
  const formik = useFormik({
    initialValues : {
      id:'',
      LearningPathCode:'',
      LearningPathNameTH:'',
      LearningPathNameENG:'',
      DescriptionTH:'',
      DescriptionENG:'',
      IsDeleted:false
   },
   validationSchema: Yup.object({
    LearningPathCode:Yup.string().required((Storage.GetLanguage() === "th") ? '* กรุณากรอก รหัสเส้นทางการเรียนรู้' : '* Please enter learning path code'),
    LearningPathNameTH: Yup.string().required((Storage.GetLanguage() === "th") ?'* กรุณากรอก ชื่อเส้นทางการเรียนรู้ (ไทย)' : '* Please enter learning path name (Thai)'),
    DescriptionTH: Yup.string().required((Storage.GetLanguage() === "th") ?'* กรุณากรอก รายละเอียดเส้นทางการเรียนรู้ (ไทย)' : '* Please fill in the details of the learning path (Thai)'),
   }),
   onSubmit: values => {
     console.log(values)
    setIsLoading(true);
    axios.post(urlPath+"/learning/byLearningCode",{code:values.LearningPathCode,name:values.LearningPathNameTH},{
      headers: {accessToken : localStorage.getItem("accessToken")},
    }).then((response) => {

      if(response.data === null || response.data.id === values.id) {
        if(isNew){
          axios.post(urlPath+"/learning",values).then((response)=>{
          if(response.data.error) 
          {
            addToast(response.data.error, { appearance: 'error', autoDismiss: true });
          } else {
            addToast('บันทึกข้อมูลสำเร็จ', { appearance: 'success', autoDismiss: true });
            setIsEnableControl(true);
            setIsNew(false)
            formik.setFieldValue('id',response.data.listLearning.id);
            setListLearning(response.data.listLearning);
          }
          });
        } else {
            if(values.id === undefined)
              values.id = listLearning.filter(x => x.LearningPathCode === formik.values.LearningPathCode )[0].id;
            axios.put(urlPath+"/learning",values).then((response) => {
            if(response.data.error) 
            {
              addToast(response.data.error, { appearance: 'error', autoDismiss: true });
            } else {
              addToast('บันทึกข้อมูลสำเร็จ', { appearance: 'success', autoDismiss: true });
              setIsEnableControl(true);
            }
          });
        }
      } else {
        addToast((Storage.GetLanguage() === "th") ? 'ไม่สามารถบันทึกข้อมูลได้ เนื่องจากรหัสเส้นทางการเรียนรู้หรือชื่อเส้นทางการเรียนรู้ซ้ำ กรุณากรอกรหัสเส้นทางการเรียนรู้หรือชื่อเส้นทางการเรียนรู้ใหม่' : 'Cannot save data Because the learning path code or the learning path name is repeated. Please enter the learning path code or the name of the new learning path.', { appearance: 'warning', autoDismiss: true });
      }
    });
    setIsLoading(false);
   },
 });

  const onChangeEvent = (content) => {
    formik.setFieldValue('DescriptionTH',content);
    formik.values.DescriptionTH = content;
  }

  const onChangeEventENG = (content) => {
    formik.setFieldValue('DescriptionENG',content);
    formik.values.DescriptionENG = content;
  }

  async function fetchData() {
    setIsLoading(true);
    let response = await axios(
      urlPath+`/learning/byId/${id}`
    );
    let user = await response.data;
    if(user !== null) {
      for(var columns in response.data) {
        if(columns === "DescriptionTH" || columns === "DescriptionENG")
        formik.setFieldValue(columns,FilesService.buffer64UTF8(response.data[columns]), false)
        else formik.setFieldValue(columns, response.data[columns], false)
      }
      setListLearning(response.data);
      setIsNew(false);
      setIsLoading(false);
      setIsEnableControl(true);
    } else {
      setIsNew(true);
      setIsEnableControl(false);
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchData();

  },[]);

  const EnableControl = (bool) => {
    setIsEnableControl(bool);
    if(bool)
      formik.setErrors({})
  }

  return (
    <>
      {isLoading ? ( <> <Spinner  customText={"Loading"}/></>) : (<></>)}
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
        <>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-2xl bg-blueGray-100 border-0">
          <form onSubmit={formik.handleSubmit}>
            <div className="rounded-t-2xl bg-white mb-0 px-2 py-2">
              <div className="text-center flex justify-between ">
                <div>
                  <h3 className="text-blueGray-700 text-xl font-bold mt-2">{locale.t("Menu.lblLearning")}</h3>
                </div>
                <div>
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
                      type="button"
                      onClick={() =>{EnableControl(true)}}
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
            <div className="flex-auto px-4 lg:px-8 py-10 pt-0">
                <div className="flex flex-wrap  mt-6">
                  <div className="w-full px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Learning.info.lblLearningCode")}<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="LearningPathCode"
                        name="LearningPathCode"
                        maxLength="100"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.LearningPathCode}
                        disabled={enableControl}
                      />
                      {formik.touched.LearningPathCode && formik.errors.LearningPathCode ? (
                            <div className="text-sm py-2 px-2 text-red-500">{formik.errors.LearningPathCode}</div>
                        ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Learning.list.lblLearningNameTH")}<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="LearningPathNameTH"
                        name="LearningPathNameTH"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.LearningPathNameTH}
                        disabled={enableControl}
                        maxLength="250"
                      />
                      {formik.touched.LearningPathNameTH && formik.errors.LearningPathNameTH ? (
                            <div className="text-sm py-2 px-2 text-red-500">{formik.errors.LearningPathNameTH}</div>
                        ) : null}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Learning.list.lblLearningNameENG")}
                      </label>
                      <input
                        type="text"
                        className="border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        maxLength="250"
                        id="LearningPathNameENG"
                        name="LearningPathNameENG"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.LearningPathNameENG}
                        disabled={enableControl}
                      />
                 
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 py-1">
                    <div className="relative w-full mb-3">
                      <label className="block  text-blueGray-600 text-sm font-bold mb-2">
                        {locale.t("Learning.info.lblDescriptionTH")}<span className="text-red-500"> *</span>
                      </label>
                      {/* <ReactQuill
                        theme="snow"  
                        value={formik.values.DescriptionTH}
                        onChange={v =>  formik.setFieldValue('DescriptionTH', v)} 
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
                        
                            ['clean'],['code']
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
                          'clean','code'
                        ]}
                      /> */}
                      <SunEditor
                          disable={enableControl}
                          setDefaultStyle="font-family: THSarabun; font-size: 18px;" 
                          width="100%"
                          height="300px"
                          onKeyDown={handleKeyDown} 
                          setContents={formik.values.DescriptionTH}
                          onChange={onChangeEvent} 
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
                      <label
                        className="block  text-blueGray-600 text-sm font-bold mb-2"
                      >
                        {locale.t("Learning.info.lblDescriptionENG")}
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
                          onChange={onChangeEventENG} 
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
                </div>
              </div>
            </form>
          </div>
        </>
        </div>
      </div>
    </>
  );
}
