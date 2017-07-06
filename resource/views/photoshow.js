/**
 * Created by zhangbin
 * Date 2017/4/24.
 * E-mail skyxuanbin@qq.com
 * Link https://superbinlin.github.io/blog/dist/#/resume
 */

'use strict';
import '../css/album.css';
import DocumentTitle from'react-document-title';
import Masonry from 'react-masonry-component';
import API_Upload from '../service/upload.service.js';
/**
 * https://github.com/hotoo/pinyin
 */
//import pinyin from "pinyin";

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
      },
      currentCity:"--"
    }
  }

  componentWillMount(){
    let city = this.props.location.query.city;

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
        },
        currentCity:res[0].pinyin
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
    this.setState({photoSwipe:Object.assign({}, this.state.photoSwipe,{
      options:{
          index:i,
          shareButtons: [
            {id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
          ],
          bgOpacity:0.8,
          showHideOpacity:true,
          preload:[2,2]
        }
      })
    })
  }

  render(){
    let {photoCollection, masonryOptions, photoSwipe, isphotoSwipeOpen, currentCity} = this.state;
    let childElements = photoCollection[0].img.map((element, index) => {
     return (
        <div className="image-element-class col-lg-3 col-md-4 col-sm-6 col-xs-12" key={index} onClick={()=>{this.showPhotoswipe(index)}}>
          <div className="img-wp">
            <img src={element.src} />
          </div>
        </div>
      );
    });

    return (
      <DocumentTitle title={currentCity}>
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
              <span className="name">{currentCity}</span>
              <span className="text">Photography</span>
            </div>
          </header>
          <Masonry
              className={'my-gallery-class row'} // default ''
              elementType={'div'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false
          >
              {childElements}
          </Masonry>

          <PhotoSwipe isOpen={isphotoSwipeOpen} items={photoSwipe.items} options={photoSwipe.options} onClose={this.closePhotoswipe}/>
        </div>
      </DocumentTitle>
    );
  }
};

export default Photoshow;

