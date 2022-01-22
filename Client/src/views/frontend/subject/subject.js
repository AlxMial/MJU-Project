import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import CommentBox from './CommentBox';
import axios from "axios";
import { useParams } from "react-router-dom";

import './subject.css'

export default function Subject() {
    let { id } = useParams();
    const [courseData, setCourseData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);
    const history = useHistory();

    async function fetchCourse() {
        let response = await axios(
            `http://localhost:3001/courses/byId/${id}`
        );
        let data = await response.data;
        if (data !== null) {
            //   for(var columns in response.data) {
            //     if(columns === "DescriptionTH" || columns === "DescriptionENG")
            //     formik.setFieldValue(columns,FilesService.buffer64UTF8(response.data[columns]), false)
            //     else formik.setFieldValue(columns, response.data[columns], false)
            //   }
            setCourseData(response.data);
            console.log(courseData);
        }
        else { console.log('No Data') }
    }

    async function fetchSubject() {
        let response = await axios(`http://localhost:3001/subjects/byCoursesId/${id}`);
        let subjects = await response.data;
        if (subjects !== null) {
            //   for(var columns in response.data) {
            //     if(columns === "ContentTH" || columns === "ContentENG")
            //     {  
            //       formikSubject.setFieldValue(columns,FilesService.buffer64UTF8(response.data[columns]), false) 
            //     }
            //     else 
            //       formikSubject.setFieldValue(columns, response.data[columns], false)
            //   }
            setSubjectData(response.data);
            console.log(subjectData);
            // setIsNewSubject(true);
            // setIsEnableSubjectControl(false);
        }
    }

    useEffect(() => {
        fetchCourse();
        fetchSubject();
    }, []);

    const data = {
        post: {
            id: 1,
            content: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
            user: "Richard McClintock",
            userPic: "https://телеграм.мессенджеры.рус/wp-content/uploads/2016/04/garfild-dlya-telegram-online-16.png",
            publishDate: "2 Weeks ago",
            likes: 18,
            commentsNumber: 3,
        },
        comments: [
            {
                id: 0,
                user: "Bonorum Malorum",
                content: "Many desktop publishing packages and web page editors now use",
                userPic: "https://upload.wikimedia.org/wikipedia/ru/thumb/b/bc/Garfield_the_Cat.svg/1200px-Garfield_the_Cat.svg.png",
                publishDate: "2 days ago"
            },
            {
                id: 1,
                user: "Cicero Areals",
                content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
                userPic: "https://static.tgstat.ru/public/images/channels/_0/f0/f0f7f79a275a83bfe8769dfd81d40bb2.jpg",
                publishDate: "4 days ago"
            },
            {
                id: 2,
                user: "Hanna Pages",
                content: "Lorem Ipsum comes from sectionsof de Finibus Bonorum et Malorum (The Extremes of Good and Evil)",
                userPic: "https://vignette.wikia.nocookie.net/versus-compendium/images/0/09/Garfield.png/revision/latest?cb=20181122134939",
                publishDate: "1 Week ago"
            },
        ]
    };

    const subjectDataTemp = [
        {
            id: 0,
            SubjectNameTH: "ชื่อ Object TH",
            SubjectNameEng: "Object Name Eng",
            SubjectOfHour: "40"
        },
        {
            id: 1,
            SubjectNameTH: "ความรู้พื้นฐาน ถิ่นกำเนิด",
            SubjectNameEng: "kwamroo phuenthan thinkamnerd",
            SubjectOfHour: "120"
        },
        {
            id: 2,
            SubjectNameTH: "นายกฯ ไม่ยอมลาออกสักที แปดปีแล้วไอ่สัส",
            SubjectNameEng: "i here too",
            SubjectOfHour: "8"
        },
        {
            id: 3,
            SubjectNameTH: "นายกฯ ไม่ยอมลาออกสักที แปดปีแล้วไอ่สัส 2",
            SubjectNameEng: "i here too 2",
            SubjectOfHour: "80"
        },
        {
            id: 4,
            SubjectNameTH: "บางคนก็ไม่ยอมกลับบ้าน อยู่แต่เยมันดี",
            SubjectNameEng: "Leader of villege no. 10",
            SubjectOfHour: "55"
        },
        {
            id: 5,
            SubjectNameTH: "บางคนก็ไม่ยอมกลับบ้าน อยู่แต่เยมันดี 2",
            SubjectNameEng: "Leader of villege no. 10 2",
            SubjectOfHour: "90"
        }
    ];

    return (
        <>
            <div className="container pt-20 px-12 relative mx-auto lg:w-10/12 flex flex-wrap">
                <div className='mx-auto w-full header-bar'>
                    <div className="w-full lg:w-3/12">
                        <i className="fas fa-arrow-left text-sm cursor-pointer " onClick={() => history.goBack()}>
                            <span>&nbsp;กลับ</span>
                        </i>
                    </div>
                </div>
                <div className='mt-3 mb-3 text-sm'> หน่วยที่ 1.2 ข้าวเพื่อชีวิตและสังคม</div>
                <div className='w-full mt-3'>
                    <div className="min-h-screen-35 px-4 py-4 relative flex flex-col min-h-3 break-words bg-white w-full mb-6 rounded-lg shadow-lg">
                        <div className='img-course lg:w-4/12 text-center flex flex-wrap mx-auto'>
                            <img
                                className="w-full align-middle"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRxgWGxEtMlqQqTJi9INeFmSksx54dZoSLxg&usqp=CAU" alt="" />
                        </div>
                        <div className='course-content lg:w-8/12 leading-none mx-auto mt-3 mb-3'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque repudiandae quaerat maiores quo, eligendi repellendus officia aliquam fugit numquam fuga laudantium enim eveniet quis reprehenderit nisi quae facere quasi culpa! Nostrum eligendi blanditiis rem vero cum esse quia magni sunt unde beatae numquam quod officiis, dicta ipsam maxime non placeat.
                        </div>

                        <div className='subject-content px-4 py-1 rounded-lg lg:w-8/12 mx-auto mt-3 mb-3'>
                            {
                                subjectDataTemp.map((item) => {
                                    return (
                                        <Link to='#' key={item.id}>
                                            <div className='font-bold subjectName'>{item.SubjectNameTH}</div>
                                            <div className='text-mute subjectOfHour'>
                                                {item.SubjectOfHour} นาที
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <CommentBox
                    comments={data.comments}
                    post={data.post} />
            </div>

        </>
    )
}
