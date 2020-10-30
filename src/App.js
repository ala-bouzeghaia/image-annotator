import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/navbar';
import EditObjectName from './components/edit-objectname';
import ImagesList from './components/images-list';
import AnnotationsList from './components/annotations-list';
import DisplayAnnotationsBox from './components/display-annotationsbox';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container-fluid">

          <div className="row">
            
            <div className="col-sm-3 col-md-2 sidebar" id="right_bar">
              <ul className="nav nav-sidebar"> 
                <EditObjectName />               
              </ul>
              <ul className="nav nav-sidebar">
                <ImagesList />
              </ul>
            </div>

            <DisplayAnnotationsBox />

            <div className="col-md-3" id="right_bar" >
              <AnnotationsList />
            </div>

          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
