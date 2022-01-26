import React from 'react';
import $, { param } from 'jquery';
import { Component } from 'react/cjs/react.production.min';
import axios from 'axios';

const Maven = () => {
    var file_str = "";
    const maven_post = () => {
        // String 형태로 받아왔을 때
        if($("textarea").val() !== ""){
            file_str = $("textarea").val();
        }
        var fff = $("#file")[0].files;
        var reader = new FileReader();
        reader.onload = function(e){
            var arrayBuffer = e.target.result;
            axios.post('http://52.231.26.131:1323/java/mvn?name=rlaekals', null, {params: {
                file : arrayBuffer
            }})
            .then((response) => {
                console.log(response);
            }).catch((error)=>{
                console.log(error);
            });
        }
        reader.readAsArrayBuffer(fff[0]);
        // axios.post('http://52.231.26.131:1323/java/mvn?name=rlaekals', null, {params: {
        //     file_str
        // }})
        // .then((response) => {
        //     console.log(response);
        // }).catch((error)=>{
        //     console.log(error);
        // });
    };
    
    function mavenCheck() {
        if(($("textarea").val() === "" || $("textarea").val() === null) && ($("#file").val() === "" || $("#file").val() === null)){
            
            warning_msg("파일을 첨부하거나 \n 내용을 입력해주세요.");
            return;
        }
        $("button[type='submit']").click();
    }

    function fileChange(e) {
        $("#file_input").css({"box-shadow" : "0px 0px 30px 0px #1d70b333"});        
        let ext = $(e.target).val().split('.').pop().toLowerCase();
        if(ext !== "xml") {
            warning_msg("xml 파일만 첨부할 수 있습니다.");
            $("#file_input").css({"box-shadow" : " 0 0 5px 0px rgba(255, 0, 0, 0.534)"});
            $("#file_input").val('');
            e.target.value = '';
            console.log(e.target.value);
            return;
        }
        let fileValue = $(e.target).val().split("\\");
        let fileName = fileValue[fileValue.length-1];
    
        $("#file_input").val(fileName);
        $("textarea").val('');

        let file = new FileReader();
        file.onload = () =>{
            console.log(file.result);
            file_str = file.result;
        };
        file.readAsText(e.target.files[0]);
        
        console.log(e.target.value);
    }
    
    function texting() {
        $("#file_input").val('');
        $("#file").val('');
    }
    
    function warning_msg(msg) {
        if(msg != null) {
            $(".bubble_text > p").text(msg);
        }
        open_warning();
    }
    function open_warning() {
        let bubble = document.querySelector(".bubble_base.warning");
        $(bubble).fadeIn(500);
    }
    function open_success(msg) {
        if(msg != null) {
            $(".bubble_text > p").text(msg);
        }
        let bubble = document.querySelector(".bubble_base.success");
        $(bubble).fadeIn(500);
    }

    let url = "/";
    return (
        <div id="input_form">
            <a href={url} id="back_btn"><i className="fas fa-arrow-left"></i></a>
            <img src={require('../img/xml.png')} alt=""/>
            <p>pom.xml 파일을 첨부 또는 내용을 복사해주세요.</p>
            <div className="file_box">
                <input type="text" id="file_input" readOnly placeholder="첨부된 파일 없음"/>
                <label htmlFor="file">Browse</label>
            </div>
            <input type="file" name="file" id="file" className="dn" onChange={fileChange}/>
            <textarea name="txt" id="" cols="30" rows="10" placeholder="Copy here" onInput={texting}></textarea>
            <button type="button" className="btn" onClick={mavenCheck}>GO</button>
            <button type="submit" className="dn" onClick={maven_post}></button>
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


export default Maven;