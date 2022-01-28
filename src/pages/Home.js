import React from 'react';


const Home = () => {
    
    function maven(e) {
        window.location.href="/maven";
    }
    function python(e) {
        window.location.href="/python";
    }
    return (
        <div id="main">
            <a href="/" id="logo"><img src={require('../img/logo.png')} width="100" alt="logo"/></a>
            <h1>Choose a Program to check</h1>
            <p>선택한 언어의 버전별 라이브러리를 확인하실 수 있습니다.</p>

            <div id="select_container">
                <div className="select_box" onClick={python}>
                    <img src={require('../img/python.png')} alt="python"/>
                    <p>Python</p>
                </div>
                <div className="select_box" onClick={maven}>
                    <img src={require('../img/maven.png')} alt="maven"/>
                    <p>Maven Project</p>
                </div>
            </div>
        </div>
    );
};

export default Home;