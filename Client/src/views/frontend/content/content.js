import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import urlPath from 'services/urlServer';
import './content.css'
import ReactQuill from 'react-quill';
import FilesService from 'services/files'
import { useFormik  } from "formik";
import Spinner from 'components/Loadings/spinner/Spinner';
import * as Storage from "../../../../src/services/Storage.service";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
const locale = require("react-redux-i18n").I18n;

export default function Content() {
    let { id } = useParams();
    const [subjectData, setSubjectData] = useState([]);
    const [attachData, setAttachData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    async function fetchSubject() {
        // let response = await axios(
        //     urlPath+`/subjects/byId/${id}`
        // );
        // let data = await response.data;
        // if (data !== null) {
        //     response.data.ContentTH = FilesService.buffer64UTF8(response.data.ContentTH)
        //     response.data.ContentENG = FilesService.buffer64UTF8(response.data.ContentENG)
        //     formik.setFieldValue("ContentTH",response.data.ContentTH, false);
        //     formik.setFieldValue("ContentENG",response.data.ContentENG, false);
        //     axios.get(urlPath+`/attachs/bySubjectsId/${response.data.id}`,{
        //         headers: {accessToken : localStorage.getItem("accessToken")}
        //       }).then((res) => {
        //         if(res.data !== null) {
        //             setAttachData(res.data)
        //         }
        //     });

        //     setSubjectData(response.data);
        // }
        // else { console.log('No Data') }
        setIsLoading(true);
        axios.get(urlPath+`/subjects/byId/${id}`).then((response) => {
            response.data.ContentTH = FilesService.buffer64UTF8(response.data.ContentTH)
            response.data.ContentENG = FilesService.buffer64UTF8(response.data.ContentENG)
            formik.setFieldValue("ContentTH",response.data.ContentTH, false);
            formik.setFieldValue("ContentENG",response.data.ContentENG, false);
            axios.get(urlPath+`/attachs/bySubjectsId/${response.data.id}`,{
                headers: {accessToken : localStorage.getItem("accessToken")}
              }).then((res) => {
                if(res.data !== null) {
                    setAttachData(res.data)
                }
            });
            setIsLoading(false);
            setSubjectData(response.data);
        });
    }

    useEffect(() => {
        fetchSubject();
    }, []);

    
    const formik = useFormik({
        initialValues : {
            ContentTH:'',
            ContentENG:'',
       },
       onSubmit: values => {
       
       }
     });

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
    return (
        <>
            {isLoading ? ( <> <Spinner  customText={"Loading"}/></>) : (<></>)}
            <div className="container pt-20 px-12 relative mx-auto lg:w-10/12 flex flex-wrap">
                <div className='mx-auto w-full header-bar'>
                    <div className="w-full lg:w-3/12 mb-2 mt-2">
                        <i className="fas fa-arrow-left text-sm cursor-pointer " onClick={() => history.goBack()}>
                            <span className='THSarabun text-2xl'>&nbsp;{locale.t("Main.lblBack")}</span>
                        </i>
                    </div>
                </div>

                <div className='w-full mt-3'>
                    <div className="min-h-screen-35 px-4 py-4 relative flex flex-col min-h-3 break-words bg-white w-full mb-6 rounded-lg shadow-lg">
                            {(Storage.GetLanguage() === "th") ?
                                <div className='w-full lg:w-10/12 text-2xl font-bold mx-auto mt-3 mb-3 leading-normal'>{subjectData.SubjectNameTH}</div>
                                : <div className='w-full lg:w-10/12 text-2xl font-bold mx-auto mt-3 mb-3 leading-normal'>{subjectData.SubjectNameENG}</div>
                            }   
                        <div className='course-content lg:w-10/12 leading-none mx-auto py-3 mb-3 ReactQuill-Editor'>
                        {(Storage.GetLanguage() === "th") ?
                            // <ReactQuill
                            //     theme="snow"
                            //     placeholder={"Write something awesome..."}
                            //     readOnly={true}
                            //     value={formik.values.ContentTH}
                            //     onChange={v =>  formik.setFieldValue('ContentTH', v)} 
                            //     modules={{
                            //         // syntax: true,
                            //         toolbar: null
                            //     }}
                            //     formats={[
                            //         'header',
                            //         'bold', 'italic', 'underline', 'strike', 'blockquote',
                            //         'list', 'bullet', 'indent',
                            //         'link', 'image','video',
                            //         'align',
                            //         'code-block'
                            //         ]}
                            // />
                            <SunEditor
                                disable={true}
                                hideToolbar={true} 
                                setDefaultStyle="font-family: THSarabun; font-size: 18px;" 
                                width="100%"
                                height="100%"
                                setContents={formik.values.ContentTH}
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
                            : 
                            // <ReactQuill
                            //     theme="snow"
                            //     placeholder={"Write something awesome..."}
                            //     readOnly={true}
                            //     value={formik.values.ContentENG}
                            //     onChange={v =>  formik.setFieldValue('ContentENG', v)} 
                            //     modules={{
                            //         // syntax: true,
                            //         toolbar: null
                            //     }}
                            //     formats={[
                            //         'header',
                            //         'bold', 'italic', 'underline', 'strike', 'blockquote',
                            //         'list', 'bullet', 'indent',
                            //         'link', 'image','video',
                            //         'align',
                            //         'code-block'
                            //         ]}
                            // />
                            <SunEditor
                                disable={true}
                                hideToolbar={true} 
                                setDefaultStyle="font-family: THSarabun; font-size: 18px;" 
                                width="100%"
                                height="100%"
                                setContents={formik.values.ContentENG}
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
                        }

                        </div>
                        <div className='font-bold w-full lg:w-10/12 mx-auto mt-6 text-sm'>{locale.t("Main.lblListAttach")}</div>
                        <div className='file-content lg:w-10/12 mx-auto mb-3 mt-3 text-xs'>
                            {
                                attachData.map(item => {
                                    return (
                                        <div className='flex flex-wrap mb-2 py-2  attach-list' key={item.id}>
                                                <span className='pt-1 text-blue-mju-front text-sm cursor-pointer' onClick={() => {DownloadFile(item.FileData,item.FileName)}}><i className="fas fa-download"></i>&nbsp;&nbsp;{locale.t("Main.lblDownload")}&nbsp;&nbsp;</span> 
                                                <span><img src={require("assets/img/"+FilesService.changeImageType(item.FileType)).default} className="CourseFilePic"/></span><span className='mt-2 pt-1 text-sm'>&nbsp;&nbsp;{item.FileName}</span>
                                           
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
