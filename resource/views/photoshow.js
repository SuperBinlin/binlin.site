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

/**
 * https://github.com/minhtranite/react-photoswipe
 */
import {PhotoSwipe} from 'react-photoswipe';

class Photoshow extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      photoCollection: [
        {img:[]}
      ],
      masonryOptions:{
        transitionDuration: 500
      },
      isphotoSwipeOpen:false,
      photoSwipe: {
        items:[],
        options:{}
      }
    }
  }

  componentWillMount(){
    let city = this.props.location.query.city;
    console.log(city)
    API_Upload.getimg({'city':city}, (err, res) => {
      if(err) {
        console.log(err)
        return;
      }
      this.setState({
        photoCollection: res,
        photoSwipe:{
          items:res[0].img,
          options:{}
        }
      })
    })
  }

  closePhotoswipe = () => {
    this.setState({isphotoSwipeOpen:false})
  }

  showPhotoswipe = (i) => {
    console.log(i)
    this.setState({
      isphotoSwipeOpen: true
    });

    this.setState({photoSwipe:Object.assign({}, this.state.photoSwipe,{options:{index:i}})})
  }

  render(){
    let {photoCollection, masonryOptions, photoSwipe, isphotoSwipeOpen} = this.state;
    console.log(photoCollection)
    let childElements = photoCollection[0].img.map((element, index) => {
     return (
        <div className="image-element-class col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index} onClick={()=>{this.showPhotoswipe(index)}}>
            <img src={element.src} />
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

        <PhotoSwipe isOpen={isphotoSwipeOpen} items={photoSwipe.items} options={photoSwipe.options} onClose={this.closePhotoswipe}/>
      </div>
    );
  }
};

export default Photoshow;

