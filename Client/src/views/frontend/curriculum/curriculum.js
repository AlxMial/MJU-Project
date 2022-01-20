import TimeAgo from 'timeago-react';
import React from 'react'
import { useHistory, Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import './curriculum.css'

export default function Curriculum() {

    const [searchText, setSearchText] = useState('');
    const [tagText, setTagText] = useState('');
    const [valueSearch, setValueSearch] = useState('');
    const history = useHistory();

    const clearSearch = () => {
        setSearchText('');
        setTagText('');
        setValueSearch('');
    }

    const FrmSearch = () => {
        return (
            <>
                <div className="px-4 w-full justify-center frmSearch">
                    <div className="w-full ml-auto mr-auto">
                        <h1 className="text-white font-semibold text-sm">
                            ค้นหาหลักสูตร
                        </h1>
                        <div className='flex mt-2'>
                            <label className="block uppercase text-white text-sm font-bold mb-2 label-form"> ค้นหา </label >
                            <input className='text-form border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150'
                                type="text"
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className='flex mt-2'>
                            <label className="block uppercase text-white text-sm font-bold mb-2 label-form"> แท็ก </label >
                            <textarea value={tagText} onChange={e => setTagText(e.target.value)}
                                className='text-form border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150' />
                        </div>

                        <div className='flex flex-wrap mt-2'>
                            <label className='label-form'></label>
                            <button onClick={() => clearSearch()}
                                className="w-3/12 lg:w-3/12 bg-green-mju text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-2 ease-linear transition-all duration-150"
                                type="button">
                                <i className="fas fa-redo-alt"></i>&nbsp;ล้างค่า
                            </button>
                            <button onClick={() => setValueSearch(searchText)}
                                className="w-6/12 lg:w-3/12 bg-green-mju text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                type="button">
                                <i className="fas fa-filter"></i>&nbsp;ใช้ตัวกรอง
                            </button>
                        </div>

                    </div>
                </div>
            </>
        );
    }

    const items = [
        {
            id: "01", cardImage: "https://picsum.photos/id/1/200/150",
            title: "Top Notch Services 1",
            detail: "The Arctic Ocean freezes every winter.",
            timeStamp: "2022-01-17T06:24:44.124Z",
            tag: 'ข้าว',
            url: '/Subject'
        },
        {
            id: "02", cardImage: "https://picsum.photos/id/2/200/150",
            title: "Top Notch Services 2",
            detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, assumenda ratione. Tenetur, facilis suscipit a magnam veniam laudantium commodi libero distinctio doloribus cum quam iusto illum consequuntur, dolorum et nesciunt!"
            , timeStamp: "2021-06-21T06:24:44.124Z",
            tag: 'ข้าว',
            url: '/Subject'
        },
        {
            id: "03", cardImage: "https://picsum.photos/id/3/200/150",
            title: "Top Notch Services 3",
            detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, assumenda ratione. Tenetur, facilis suscipit a magnam veniam laudantium commodi libero distinctio doloribus cum quam iusto illum consequuntur, dolorum et nesciunt!"
            , timeStamp: "2021-06-21T06:24:44.124Z",
            tag: 'ข้าว',
            url: '/Subject'
        },
        {
            id: "04", cardImage: "https://picsum.photos/id/444/200/150",
            title: "Top Notch Services 4",
            detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, assumenda ratione. Tenetur, facilis suscipit a magnam veniam laudantium commodi libero distinctio doloribus cum quam iusto illum consequuntur, dolorum et nesciunt!"
            , timeStamp: "2021-06-21T06:24:44.124Z",
            tag: 'ข้าว',
            url: './Subject'
        },
        {
            id: "05", cardImage: "https://picsum.photos/id/555/200/150",
            title: "Top Notch Services 5",
            detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, assumenda ratione. Tenetur, facilis suscipit a magnam veniam laudantium commodi libero distinctio doloribus cum quam iusto illum consequuntur, dolorum et nesciunt!"
            , timeStamp: "2021-06-21T06:24:44.124Z",
            tag: 'ข้าว',
            url: '/Subject'
        }
    ];

    return (
        <>
            <div className="relative pt-20 pb-32 flex max-h-screen-37 bg-darkgreen-mju">
                <div className="container px-4 relative mx-auto lg:w-10/12 mt-2 flex flex-wrap">
                    <div className="w-full lg:w-3/12">
                        <i className="fas fa-arrow-left text-white text-sm cursor-pointer " onClick={() => history.goBack()}>
                            <span>&nbsp;กลับ</span>
                        </i>
                    </div>
                    <div className='w-full lg:w-6/12'>
                        <FrmSearch />
                    </div>
                </div>
            </div>
            <div className="container relative mx-auto lg:w-10/12 mt-2 px-4">
                <div className='title text-sm font-bold px-4'>
                    ข้าว
                </div>
            </div>
            <div className="container relative mx-auto lg:w-10/12 mt-2">
                <div className="w-full">
                    <div className='flex flex-wrap '>
                        {items.filter((item) => {
                            if (!valueSearch) return true
                            if (item.title.includes(valueSearch) || item.tag.includes(valueSearch)) {
                                return true
                            }
                        }).map((item) =>
                            <Link to={item.url} key={item.id} className="card px-4 md:w-4/12 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg">
                                <img
                                    alt="..."
                                    src={item.cardImage}
                                    className="w-full align-middle rounded-t-lg"
                                />
                                <blockquote className="blockquote relative p-4 mb-4 shadow-lg rounded-b-lg max-h-200-px ">
                                    <h4 className="text-xl font-bold ">
                                        {item.title}
                                    </h4>
                                    <p className="text-md font-light mt-2 ">
                                        {item.detail}
                                    </p>
                                    <footer>
                                        <div>
                                            <TimeAgo datetime={item.timeStamp} />
                                        </div>
                                        <div>
                                            <label className='tag py-1 px-2'>{item.tag}</label>
                                            {/* <button className="tag active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                                {item.tag}
                                            </button> */}
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
