import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    
    
    return (
        <div id="main">
            <a href="/" id="logo"><img src={require('../img/logo.png')} width="100" alt="logo"/></a>
            <h1>Choose a Program to check</h1>
            <p>선택한 언어의 버전별 라이브러리를 확인하실 수 있습니다.</p>

            <div id="select_container">
                <Link to={'/python'}>
                <div className="select_box" >
                    <img src={require('../img/python.png')} alt="python"/>
                    <p>Python</p>
                </div>
                </Link>
                <Link to={'/maven'}>
                <div className="select_box">
                    <img src={require('../img/maven.png')} alt="maven"/>
                    <p>Maven Project</p>
                </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;