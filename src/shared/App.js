import React, {Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Python from '../pages/Python';
import Maven from '../pages/Maven';

import $ from 'jquery';

// import jQuery from "jquery";

// window.$ = window.jQuery = jQuery;

class App extends Component {
    
    render() {
        return (
            
            <section id="back">
        
                <section id="container">
                    <BrowserRouter>
                        <Routes>
                            <Route exact path="/" element={<Home/>}></Route>
                            <Route path="/python" element={<Python />}></Route>
                            <Route path="/maven" element={<Maven />}></Route>
                        </Routes>
                    </BrowserRouter>
                </section>
            </section>
        )
    }
}


export default App;