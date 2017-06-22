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
        {path:[]}
      ],
      masonryOptions:{
        transitionDuration: 500
      },
      isphotoSwipeOpen:false,
      photoSwipe: {
        items:[
           {
        src: 'http://localhost:3001/uploadImage/0.7984753753156648.jpg',
        w: 1200,
        h: 900,
        title: 'Image 1'
      },
      {
        src: 'http://localhost:3001/uploadImage/0.16143636716795862.jpg',
        w: 1200,
        h: 900,
        title: 'Image 2'
      },
      {
        src: 'http://localhost:3001/uploadImage/0.5790153392843134.jpg',
        w: 1200,
        h: 900,
        title: 'Image 3'
      }
        ],
        options:{
          index:1
        }
      }
    }
  }

  componentWillMount(){
    let city = this.props.params.city;
    API_Upload.getimg({'city':city}, (err, res) => {
      if(err) {
        console.log(err)
        return;
      }
      this.setState({photoCollection: res})

    })
  }

  closePhotoswipe = () => {
    this.setState({isphotoSwipeOpen:false})
  }

  showPhotoswipe = () => {
    this.setState({
      isphotoSwipeOpen: true,
      options: {
        closeOnScroll: false
      }
    });
  }

  render(){
    let {photoCollection, masonryOptions, photoSwipe, isphotoSwipeOpen} = this.state;
    let childElements = photoCollection[0].path.map((element, index) => {
     return (
        <div className="image-element-class col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index} onClick={this.showPhotoswipe}>
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
        <PhotoSwipe isOpen={isphotoSwipeOpen} items={photoSwipe.items} options={photoSwipe.options} onClose={this.closePhotoswipe}/>
      </div>
    );
  }
};

export default Photoshow;

