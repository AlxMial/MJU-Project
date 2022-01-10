import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class card extends Component {
    render() {
        return (
            <>
                <Link to={this.props.value[0]}>
                    {/* <div className="container px-3 mx-auto"> */}
                    {/* <div className="flex flex-wrap items-center"> */}
                    {/* <div className="w-10/12 md:w-4/12 lg:w-3/12 px-12 md:px-4 mr-auto ml-auto -mt-32"> */}
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-green-mju">
                        <div className='bg-white rounded-lg card-home-top'>
                            {/* <i class="far fa-calendar-alt"></i> */}
                        </div>
                        <blockquote className="relative p-8 mb-4">
                            <svg
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 583 95"
                                className="absolute left-0 w-full block h-95-px -top-94-px"
                            >
                                <polygon
                                    points="-30,95 583,95 583,10"
                                    className="text-green-200-mju fill-current"
                                ></polygon>
                            </svg>
                            <h4 className="text-xl font-bold text-white">
                                {this.props.value[1]}
                            </h4>
                        </blockquote>
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                    {/* </div> */}
                </Link>
            </>
        )
    }
}
