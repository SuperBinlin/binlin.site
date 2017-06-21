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

class Photoshow extends React.Component{

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
    var childElements = photoCollection[0].path.map(function(element, index){
     return (
        <div className="image-element-class col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index}>
            <img src={element} />
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
        <Masonry
            className={'my-gallery-class row'} // default ''
            elementType={'div'} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
            {childElements}
        </Masonry>
      </div>
    );
  }
};

export default Photoshow;

