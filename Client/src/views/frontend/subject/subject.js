import React from 'react'
import { useHistory } from "react-router-dom";
import CommentBox from './CommentBox';

import './subject.css'

export default function Subject() {

    const history = useHistory();

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

    return (
        <>
            <div className="container pt-20 relative mx-auto lg:w-10/12 flex flex-wrap">
                <div className='mx-auto w-full header-bar'>
                    <div className="w-full lg:w-3/12">
                        <i className="fas fa-arrow-left text-sm cursor-pointer " onClick={() => history.goBack()}>
                            <span>&nbsp;กลับ</span>
                        </i>
                    </div>
                </div>
                <div className='w-full mt-3'>
                    <div className="min-h-screen-35 px-4 relative flex flex-col min-h-3 break-words bg-white w-full mb-6 rounded-lg shadow-lg">

                    </div>
                </div>

                <CommentBox
                    comments={data.comments}
                    post={data.post} />
            </div>

        </>
    )
}
