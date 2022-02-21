import TimeAgo from 'timeago-react';
import React from 'react'
import { useHistory, Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from "axios";
import FilesServices from '../../../services/files';
import './curriculum.css'
import urlPath from "services/urlServer";
import Spinner from 'components/Loadings/spinner/Spinner';
import * as Storage from "../../../../src/services/Storage.service";
import ReactTags from 'react-tag-autocomplete'
const locale = require("react-redux-i18n").I18n;

export default function Curriculum() {
    let { id } = useParams();
    const [searchText, setSearchText] = useState("");
    const [tagText, setTagText] = useState('');
    const [valueSearch, setValueSearch] = useState('');
    const [valueSearchTag, setValueSearchTag] = useState('');
    const history = useHistory();
    const [optionsLearning, setOptionsLearning] = useState([]);
    const [optionsLearningEng, setOptionsLearningEng] = useState([]);
    const [listCourses, setListCourses] = useState([]);
    const [listCoursesSearch, setListCoursesSearch] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsSearch, settagsSearch] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const clearSearch = () => {
        setSearchText('');
        setTagText('');
        setValueSearch('');
        settagsSearch([]);
        setListCourses(listCoursesSearch);
    }

    //#region Other Event
    const reactTags = useRef()

    
    const onDelete = useCallback((tagIndex) => {
        settagsSearch(tagsSearch.filter((_, i) => i !== tagIndex)) 
    }, [tagsSearch])

    const onAddition = useCallback((newTag) => {
        settagsSearch([...tagsSearch, newTag]);
    }, [tagsSearch])

    const onValidate = useCallback((newTag) => {
        return newTag;
    })

    const ChangeLearning = () => {
        const learningId = localStorage.getItem('learningPathId');
        if (optionsLearning.length > 0)
            return optionsLearning.filter(x => x.value === learningId.toString())[0].label;
    }

    const ChangeLearningEng = () => {
        const learningId = localStorage.getItem('learningPathId');
        if (optionsLearningEng.length > 0)
            return optionsLearningEng.filter(x => x.value === learningId.toString())[0].label;
    }

    async function fetchLearning() {
        const response = await axios(urlPath + "/learning");
        const body = response.data.listLearning;
        var JsonLearning = [];
        body.forEach(field => JsonLearning.push({ value: field.id.toString(), label: field.LearningPathNameTH }))
        setOptionsLearning(JsonLearning)
    }

    
    async function fetchLearningEng() {
        const response = await axios(urlPath + "/learning");
        const body = response.data.listLearning;
        var JsonLearning = [];
        body.forEach(field => JsonLearning.push({ value: field.id.toString(), label: field.LearningPathNameENG }))
        setOptionsLearningEng(JsonLearning)
    }

    function fetchCourse() {
        setIsLoading(true);
        const learningPathId = localStorage.getItem('learningPathId');
        const data = { learningPathId: learningPathId, Type: id };
        axios.post(urlPath + "/courses/getCourseByTypeAndLearning", data, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then((response) => {
            for (const value of response.data) {
                var JsonTags = JSON.parse(value.CurriculumTag);
                for (var i = 0; i < JsonTags.length; i++) {
                    setTags(tags => [...tags, {key:i,id: value.id, name: JsonTags[i].name }]);
                }
                value.ImageCourses = FilesServices.buffer64(value.ImageCourses);
            }
            setListCoursesSearch(response.data);
            setListCourses(response.data);
            setIsLoading(false);
        });
    }

    // const ConvertBuffer = (value, id) => {
    //     var show_date = document.getElementById(id);
    //     if (show_date !== null) {
    //         show_date.innerHTML = FilesServices.buffer64UTF8(value);
    //     }
    // }

    const SearchCurriculum = (searchText,tagsSearch) => {
        setValueSearch(searchText)
        if(tagsSearch.length > 0) {
            setListCourses([]);
            tagsSearch.forEach(value => {   setListCourses(listCoursesSearch.filter(valueSearch => { if(valueSearch.CurriculumTag.toString().includes(value.name)) return true }));  });
        }
        // var textSearch;
        // tagsSearch.forEach(value => {textSearch += value.name + ' , ' });
        // setValueSearchTag(textSearch)
    }

    useEffect(() => {
        fetchLearning();
        fetchLearningEng();
        fetchCourse();
    }, []);

    return (
        <>
            {isLoading ? ( <> <Spinner  customText={"Loading"}/></>) : (<></>)}
            <div className="relative pt-20 backScreen-pb flex max-h-screen-35 bg-darkgreen-mju">
                <div className="container px-12 relative mx-auto lg:w-10/12 mt-2 flex flex-wrap">
                    <div className="w-full lg:w-3/12 mb-2 mt-2">
                        <i className="fas fa-arrow-left text-white text-sm cursor-pointer " onClick={() => history.goBack()}>
                            <span className='THSarabun text-2xl'>&nbsp; {locale.t("Main.lblBack")}</span>
                        </i>
                    </div>
                    <div className='w-full lg:w-6/12'>
                        <div className="w-full justify-center frmSearch ">
                            <div className="w-full ml-auto mr-auto">
                                <h1 className="text-white mt-4 font-semibold text-2xl">
                                    {locale.t("Main.lblCourseSearch")}
                                </h1>
                                <div className='flex mt-4'>
                                    <label className="block text-white text-sm font-bold mb-2 label-form"> {locale.t("Main.lblSearch")} </label >
                                    <input className='text-form border-0 px-2 py-1 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150'
                                        type="text"
                                        value={searchText}
                                        onChange={(e) => { setSearchText(e.target.value) }}
                                    />
                                </div>
                                <div className='flex mt-2'>
                                    <label className="block text-white text-sm font-bold mb-2 label-form"> {locale.t("Main.lblTag")} </label >
                                    <ReactTags
                                        ref={reactTags}
                                        tags={tagsSearch}
                                        onDelete={onDelete}
                                        onAddition={onAddition}
                                        onValidate={onValidate}
                                        autocomplete={true}
                                        maxLength={16}
                                        minQueryLength={1}
                                        allowNew
                                        placeholderText='Tags Search'
                                    />
                                    {/* <textarea value={tagText} rows="4" onChange={e => setTagText(e.target.value)}
                                        className='text-form border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150' /> */}
                                </div>
                                <div className='flex flex-wrap mt-2'>
                                    <label className='label-form'></label>
                                    <button onClick={() => clearSearch()}
                                        className="w-3/12 lg:w-3/12 bg-green-mju text-white active:bg-lightBlue-600 font-bold text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150"
                                        type="button">
                                        <i className="fas fa-redo-alt"></i>&nbsp;{locale.t("Main.lblClear")}
                                    </button>
                                    <button onClick={() => { 
                                        SearchCurriculum(searchText,tagsSearch)}}
                                        className="w-6/12 lg:w-3/12 bg-green-mju text-white active:bg-lightBlue-600 font-bold text-sm px-2 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                        type="button">
                                        <i className="fas fa-filter"></i>&nbsp;{locale.t("Main.lblFilter")}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container relative mx-auto lg:w-10/12 mt-2 px-12 py-4">
                {(Storage.GetLanguage() === "th") ? <div className='title text-xl font-bold px-4'>{ChangeLearning()}</div> :  <div className='title text-xl font-bold px-4'>{ChangeLearningEng()}</div> }
            </div>
            <div className="container relative mx-auto lg:w-10/12 mt-2 px-12">
                <div className="w-full">
                    <div className='flex flex-wrap Block-curriculum'>
                        {listCourses.filter((item) => {
                            if (!valueSearch) return true
                            if ((item.CurriculumNameTH.includes(valueSearch) 
                            || item.CurriculumNameENG.includes(valueSearch))) {
                                return true;
                            }
                        }).map((item) =>
                            <Link to={`/home/subject/${item.id}`} key={item.CoursesID} className="card px-4 md:w-4/12 relative flex flex-col min-w-0 break-words bg-white  mb-6 rounded-lg">
                                <img
                                    alt="..."
                                    src={item.ImageCourses}
                                    className="w-full align-middle rounded-t-lg"
                                />
                                <blockquote className="blockquote relative p-4 mb-4 shadow-lg rounded-b-lg">
                                    {(Storage.GetLanguage() === "th") ? <h4 className="text-sm font-bold mb-2">{item.CurriculumNameTH}</h4> :  <h4 className="text-base font-bold ">{item.CurriculumNameENG}</h4> }
                                    <div className='text-editor THSarabunBold'>
                                        <div>
                                            {(Storage.GetLanguage() === "th") ? <div className='dangerHTML' dangerouslySetInnerHTML={{ __html: FilesServices.buffer64UTF8(item.DescriptionTH) }}></div> : <div className='dangerHTML' dangerouslySetInnerHTML={{ __html: FilesServices.buffer64UTF8(item.DescriptionENG) }}></div> }
                                        </div>
                                    </div>
                                    <footer>
                                        <div>
                                            <TimeAgo datetime={item.createdAt} />
                                        </div>
                                        <div className=''>
                                        {
                                            tags.filter((tagsitem) => tagsitem.id === item.id).map(function (value) {
                                                return (<div className='display-inline mt-1' ><label key={value.key} className='tag text-sm px-2 py-2 text-blue-mju-home mr-2'>{value.name}</label></div>)
                                            })}
                                        </div>
                                    </footer>
                                </blockquote>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
