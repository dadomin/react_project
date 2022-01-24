import React from 'react';
import $ from 'jquery';
import { Component } from 'react/cjs/react.production.min';
import axios from 'axios';

const Python = () => {
    
    const python_post = () => {
        let python_version = $("select[name='python_version']").val();
        let library_name = $("input[name='library_name']").val();
        let library_version = $("input[name='library_version']").val();
        console.log(python_version, library_name, library_version);
        let data = JSON.stringify({langversion : python_version,
            name : library_name,
            version : library_version});
        let options = {
            headers: {"content-type" : "application/json"}
        };
        axios.post('http://52.231.26.131:1323/python', data, options)
        .then((response) => {
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        });

        // const link = 'http://localhost:3000';
        // const option = {
        //     url = 'http://loclahost:3000/'
        //     method:'POST',
        //     header : {
        //         'Acceptc' : 'application/json',
        //         'Content-Type' : 'application/json;charset=UTF-9'
        //     },
        //     data: {
        //         langversion : python_version,
        //         name : library_name,
        //         version : library_version
        //     }
        // }

        // axios(option)
        //     .then(response => console.log(response));

        // let link = 'http://localhost:3000/';
        // let body = {
        //     langversion : python_version,
        //     name : library_name,
        //     version : library_version
        // };
        // console.log(body);
        // function handleSuccess(data) { console.log(data); }
        // function handleFailure(data) { console.log('error', data); }
        // axios.get(link,  body)
        //     .then(handleSuccess)
        //     .catch(handleFailure)

        // axios({
        //     url: 'http://localhost:3000',
        //     method : 'get',
        //     data : {
        //         langversion : python_version,
        //         name : library_name,
        //         version : library_version
        //     }
        // }).then (response => console.log(response));


    }
    
      
    function inputCheck() {
        let arr = $("input");
        let check = true;
        for(let i= 0; i < arr.length; i++){
            let input = arr[i].value;
            $(arr[i]).css({"box-shadow" : "0px 0px 30px 0px #1d70b333"});        
            if(input === "" || input === null) {
                let bubble = document.querySelector(".bubble_base");
                $(bubble).fadeIn(500);
                $(arr[i]).css({"box-shadow" : " 0 0 5px 0px rgba(255, 0, 0, 0.534)"});
                check = !check;
                break;
            }
        }
        if(check) {
            $("button[type='submit']").click();
        }
        
    }
    
    let url = "/";
    return(
        
        <div id="input_form">
            <a href={url} id="back_btn"><i className="fas fa-arrow-left"></i></a>
            <img src={require('../img/python_file.png')} width="70"alt="python_file"/>
            <p>파이썬 라이브러리의 세부사항을 입력하세요.</p>
            <ul>
                <li>
                    <span>Python version</span>
                    <select name="python_version" id="">
                        <option value="3.9">3.9</option>
                        <option value="3.7">3.7 or 3.8</option>
                        <option value="3.6">3.6</option>
                    </select>
                </li>
                <li>
                    <span>Library name</span>
                    <input type="text" name="library_name" placeholder="Enter the library name"/>
                </li>
                <li>
                    <span>Library version</span>
                    <input type="text" name="library_version" placeholder="Enter the library version"/>
                </li>
            </ul>
            <button type="button" className="btn" onClick={inputCheck}>GO</button>
            <button type="submit" onClick={python_post} className="dn"></button>
            <Bubble msg={"비워진 값이 존재합니다. \n 모두 입력해주세요."} ></Bubble>
        </div>
    );
};


class Bubble extends Component {
    
    render() {
        function closeBubble() {
    
            let bubble = document.querySelector(".bubble_base");
            
            $(bubble).fadeOut(500);
        }
        return (
            <div className='bubble_base'>
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