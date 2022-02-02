

import React, { useEffect, useState } from 'react'
import { useHistory, Link, useParams } from "react-router-dom";
import CommentBox from './CommentBox';
import ReactQuill from 'react-quill';
import urlPath from 'services/urlServer';
import FilesService from 'services/files'
import axios from 'axios';
import { useFormik  } from "formik";
import Spinner from 'components/Loadings/spinner/Spinner';
import './subject.css'
import * as Storage from "../../../../src/services/Storage.service";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
const locale = require("react-redux-i18n").I18n;


export default function Subject() {

    const [listCourse,setListCourse] = useState([]);
    const [listSubject,setListSubject] = useState([]);
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    async function fetchData() {
        setIsLoading(true);
        axios.get(urlPath + `/courses/byId/${id}`).then((response) => {
            formik.setFieldValue("DescriptionTH",FilesService.buffer64UTF8(response.data.DescriptionTH), false);
            formik.setFieldValue("DescriptionENG",FilesService.buffer64UTF8(response.data.DescriptionENG), false);
            response.data.DescriptionTH = FilesService.buffer64UTF8(response.data.DescriptionTH)
            response.data.DescriptionENG = FilesService.buffer64UTF8(response.data.DescriptionENG)
            setListCourse(response.data);
        });

    }

    async function fetchDataSubject() {
        let response = await axios(urlPath + `/subjects/byCoursesId/${id}`);
        let subjects = await response.data;
        if (subjects !== null) {
            setListSubject(response.data);
            setIsLoading(false);
        }
    }

    const formik = useFormik({
        initialValues : {
          DescriptionTH:'',
          DescriptionENG:'',
       },
       onSubmit: values => {
       
       }
     });

    useEffect (  ()  =>  {
        fetchData();
        fetchDataSubject();
  
    },[]);

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
                <h1 className='text-4xl px-2 py-2 THSarabunBold mt-4 font-bold'> {(Storage.GetLanguage() === "th") ? <span>{listCourse.CurriculumNameTH}</span> :  <span>{listCourse.CurriculumNameENG}</span> }</h1>
                <div className='w-full'>
                    <div className=" min-h-screen-35 py-4 relative flex flex-col min-h-3 break-words bg-white w-full mb-6 rounded-lg shadow-lg">
                        <div className='ReactQuill-Editor'>
                            {/* <ReactQuill
                                theme="snow"
                                placeholder={"Write something awesome..."}
                                readOnly={true}
                                value={formik.values.DescriptionTH}
                                modules={{
                                    toolbar: null
                                }}
                                formats={null}
                            /> */}
                            {(Storage.GetLanguage() === "th") ? 
                            
                            // <ReactQuill
                            //     theme="snow"
                            //     value={formik.values.DescriptionTH}
                            //     onChange={v =>  formik.setFieldValue('DescriptionTH', v)} 
                            //     placeholder={"Write something awesome..."}
                            //     modules={{
                            //     // syntax: true,
                            //     toolbar: null
                            //     }}
                            //     formats={[
                            //     'header',
                            //     'bold', 'italic', 'underline', 'strike', 'blockquote',
                            //     'list', 'bullet', 'indent',
                            //     'link', 'image','video',
                            //     'align',
                            //     'code-block'
                            //     ]}
                            // />
                            // <div dangerouslySetInnerHTML={{ __html: formik.values.DescriptionENG }}></div>
                            <SunEditor
                                disable={true}
                                hideToolbar={true} 
                                setDefaultStyle="font-family: THSarabun; font-size: 18px;" 
                                width="100%"
                                height="100%"
                                setContents={formik.values.DescriptionTH}
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
                            //     value={formik.values.DescriptionENG}
                            //     onChange={v =>  formik.setFieldValue('DescriptionENG', v)} 
                            //     placeholder={"Write something awesome..."}
                            //     modules={{
                            //     // syntax: true,
                            //     toolbar: null
                            //     }}
                            //     formats={[
                            //     'header',
                            //     'bold', 'italic', 'underline', 'strike', 'blockquote',
                            //     'list', 'bullet', 'indent',
                            //     'link', 'image','video',
                            //     'align',
                            //     'code-block'
                            //     ]}
                            // />
                                    <SunEditor
                                    disable={true}
                                    hideToolbar={true} 
                                    width="100%"
                                    height="100%"
                                    setContents={formik.values.DescriptionENG}
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

                        <div className='subject-content px-4 py-1 rounded-lg lg:w-8/12 mx-auto mt-3 mb-3'>
                            {
                                listSubject.map((item) => {
                                    return (
                                        <Link to={'/home/content/'+item.id} key={item.id}>
                                            <div className='font-bold subjectName'>{(Storage.GetLanguage() === "th") ?  <span>{ item.SubjectNameTH }</span> : <span>{ item.SubjectNameENG }</span> } </div>
                                            <div className='text-mute subjectOfHour'>
                                                {item.SubjectOfHour} {locale.t("Main.lblMinute")}
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                        <div className='divComment'>
                            <hr className="mt-6 border-b-1 mb-6 border-blueGray-300" />
                            <CommentBox
                                comments={[]}
                                post={[]} 
                                CourseId={id.toString()}
                                />
                       

                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
