import React from 'react';
import $ from 'jquery';
import { Component } from 'react/cjs/react.production.min';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Python = () => {

    const [pythonVersion, setPythonVersion] = useState("");
    const handlePythonVersion = (e) => setPythonVersion(e.target.value);

    const [libraryName, setLibraryName] = useState("");
    const handleLibaaryName = (e) => setLibraryName(e.target.value);

    const [libraryVersion, setLibraryVersion] = useState("");
    const handleLibraryVersion = (e) => setLibraryVersion(e.target.value);

    const python_post = () => {
        
        console.log(pythonVersion, libraryName, libraryVersion);
        let data = JSON.stringify({
            langversion : pythonVersion,
            name : libraryName,
            version : libraryVersion
        });
        let options = {
            headers: {"content-type" : "application/json"}
        };
        axios
            // .post('http://10.62.52.32:1323/python', data, options)
            .post('http://52.231.26.131:1323/python', data, options)
            .then((response) => {
                disappear(document.getElementById("loading"));
                console.log(response.data.status_code);
                if(response.data.status_code === "false"){
                    warning_msg(response.data.message);
                }else {
                    open_success(response.data.message); 
                }
            })
            .catch((error)=>{
                disappear(document.getElementById("loading"));
                warning_msg("로딩시간이 너무 지연되었습니다.");
                console.log(error);
            });

    }

    function disappear(object) {
        object.style.visibility = "hidden";
        object.style.opacity = 0;
    }
    
    function warning_msg(msg) {
        if(msg != null) {
            document.querySelector(".bubble_text > p").innerText = msg;
        }
        open_warning();
    }
    function open_warning() {
        let bubble = document.querySelector(".bubble_base.warning");
        $(bubble).fadeIn(500);
    }
    function open_success(msg) {
        if(msg != null) {
            document.querySelector(".bubble_text > p").innerText = msg;
        }
        let bubble = document.querySelector(".bubble_base.success");
        $(bubble).fadeIn(500);
    }
      
    function inputCheck() {
        let arr = $("input");
        let check = true;
        for(let i= 0; i < arr.length; i++){
            let input = arr[i].value;
            $(arr[i]).css({"box-shadow" : "0px 0px 30px 0px #1d70b333"});        
            if(input === "" || input === null) {
                warning_msg("비워진 값이 존재합니다. \n 모두 입력해주세요.");
                $(arr[i]).css({"box-shadow" : " 0 0 5px 0px rgba(255, 0, 0, 0.534)"});
                check = !check;
                break;
            }
        }
        if(check) {
            $("#loading").css({"visibility" : "visible"});
            $("#loading").css({"opacity" : 1});
            $("button[type='submit']").click();
        }
        
    }
    
    return(
        
        <div id="input_form">
            <div id="loading">
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p>Loading..</p>
            </div>
            <Link to={'/'}><i id="back_btn" className="fas fa-arrow-left"></i></Link>
            <img src={require('../img/python_file.png')} width="70"alt="python_file"/>
            <p>파이썬 라이브러리의 세부사항을 입력하세요.</p>
            <ul>
                <li>
                    <span>Python version</span>
                    <select name="python_version" onChange={e => handlePythonVersion(e)} defaultValue={3.9}>
                        
                        <option value="3.9" >3.9</option>
                        <option value="3.7">3.7 or 3.8</option>
                        <option value="3.6">3.6</option>
                    </select>
                </li>
                <li>
                    <span>Library name</span>
                    <input type="text" name="library_name" placeholder="Enter the library name" onInput={e => handleLibaaryName(e)}/>
                </li>
                <li>
                    <span>Library version</span>
                    <input type="text" name="library_version" placeholder="Enter the library version" onInput={e => handleLibraryVersion(e)}/>
                </li>
            </ul>
            <button type="button" className="btn" onClick={inputCheck}>GO</button>
            <button type="submit" onClick={python_post} className="dn"></button>
            <WarningBubble msg={"비워진 값이 존재합니다. \n 모두 입력해주세요." } ></WarningBubble>
            <SuccessBubble msg={"성공적으로 업로드하였습니다."}></SuccessBubble>
        </div>
    );
};

class SuccessBubble extends Component {
    render() {
        function closeBubble() {
    
            let bubble = document.querySelector(".bubble_base.success");
            
            $(bubble).fadeOut(500);
        }

        return(
            <div className='bubble_base success'>
                <div id="bubble_back" onClick={closeBubble}></div>
                <div className="bubble_text">
                    <i className="fas fa-check-circle"></i>
                    <p>{this.props.msg}</p>
                    <button type="button" className="btn" onClick={closeBubble}>닫기</button>
                </div>
            </div>
        );
    }

}

class WarningBubble extends Component {
    
    render() {
        function closeBubble() {
    
            let bubble = document.querySelector(".bubble_base.warning");
            
            $(bubble).fadeOut(500);
        }
        
        return (
            <div className='bubble_base warning'>
                <div id="bubble_back" onClick={closeBubble}></div>
                <div className="bubble_text warning">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>{this.props.msg}</p>
                    <button type="button" className="warning_btn" onClick={closeBubble}>닫기</button>
                </div>
            </div>
        );
    }
}

export default Python;