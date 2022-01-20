import React from 'react';
import $ from 'jquery';
import { Component } from 'react/cjs/react.production.min';

const Maven = () => {
    function mavenCheck() {
        if(($("textarea").val() === "" || $("textarea").val() === null) && ($("#file").val() === "" || $("#file").val() === null)){
            
            let bubble = document.querySelector(".bubble_base");
            $(bubble).fadeIn(500);
            return;
        }
        $("button[type='submit'").click();
    }
    let url = "/";
    return (
        <form action="/maven/search" method="post" id="input_form">
            <a href={url} id="back_btn"><i class="fas fa-arrow-left"></i></a>
            <img src={require('../img/xml.png')} alt=""/>
            <p>pom.xml 파일을 첨부 또는 내용을 복사해주세요.</p>
            <div class="file_box">
                <input type="text" id="file_input" readonly placeholder="첨부된 파일 없음"/>
                <label for="file">Browse</label>
            </div>
            <input type="file" name="file" id="file" class="dn"/>
            <textarea name="txt" id="" cols="30" rows="10" placeholder="Copy here"></textarea>
            <button type="button" class="btn" onClick={mavenCheck}>GO</button>
            <button type="submit" class="dn"></button>
            <Bubble msg={"파일을 첨부하거나 \n 내용을 입력해주세요."}></Bubble>
        </form>
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

export default Maven;