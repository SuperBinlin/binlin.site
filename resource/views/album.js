/**
 * Created by zhangbin
 * Date 2017/4/24.
 * E-mail skyxuanbin@qq.com
 * Link https://superbinlin.github.io/blog/dist/#/resume
 */

'use strict';
import '../css/album.css';
import Masonry from 'react-masonry-component';
import API_Upload from '../service/upload.service.js';

class Album extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      photoCollection: [
        {path:[]},
        {path:[]},
        {path:[]},
      ],
      masonryOptions:{
        transitionDuration: 500
      }
    }
  }

  componentWillMount(){
    API_Upload.getimg( (err, res) => {
      if(err) {
        console.log(err)
        return;
      }

      this.setState({photoCollection: res})
      console.log(2)
    })
  }

  render(){
    let {photoCollection, masonryOptions} = this.state;
    console.log(photoCollection)
    var childElements = photoCollection.map(function(element, index){
     return (
        <div className="image-element-class image-element-class-album col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
            <img src={element.path[0]} />
            <div className="shadow">
              <p className="current-city">{element.city}</p>
              <a className="view-more" href="">view more</a>
            </div>
            
        </div>
      );
    });

    return (
      <div className="container">
        <div className="bg-ooo"></div>
        <header>
          <div className="title">
            <a className="link-wp">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </a>
            <span className="name">SuperBinlin</span>
            <span className="text">Photography</span>
          </div>
        </header>
        {childElements}
      </div>
    );
  }
};

export default Album;

