/**
 * Created by Binlin
 * Date: 2016/09/26
 * Time: 10:30
 */
'use strict';
import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.css'

export default React.createClass({
    getInitialState: function() {
        return {
            baseInfo:[
                {keys:'Birthday',val:'1991/03/10'},
                {keys:'Phone',val:'15262517173'},
                {keys:'Email',val:'skyxuanbin@qq.com'},
                {keys:'Address',val:'SuZhou'}
            ]
        };
    },
    render(){
        let {baseInfo} = this.state;
        return (
        <div>
            <div className="header">
                <div className="container">
                    <div className="header-profile">
                        <img src="./images/zb.png" alt=""/>
                    </div>
                </div>
            </div>
            <div className="header-top">
                <h2>张斌</h2>
                <small>web前端开发工程师</small>
            </div>
            <div className="about">
                <div className="container">
                    <div className="about-top">
                        <h3 className="top-title">About Me</h3>
                        <span className="line"></span>
                        <p className="about-p">
                            2013年大学毕业,专业软件工程,从实习开始接触前端,之后便对前端技术欲罢不能,三年的历练,正在成为大神的道路上不断努力。
                        </p>
                        <p>
                            专职前端,从最初的html+css+jquery到如今的html+css+MVVM+webpack,始终努力的跟着前端发展的节奏,做一个有追求的优秀前端,十分欣赏和愿意与有自己想法的产品经理合作。
                        </p>
                        <div className="row about-row">
                            <div className="col-md-4 about-row-column">
                                <ul className="about-details">
                                    {
                                        baseInfo.map(function(obj, index){
                                            return <li
                                                key={index}>
                                                <p>{obj.keys}:<span>{obj.val}</span></p>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="col-md-8 about-row-column">
                                <h3>HOBBIES & INTERESTS</h3>
                                <ul className="hoby">
                                    <li><i className="tv"></i></li>
                                    <li><i className="car"></i></li>
                                    <li><i className="music"></i></li>
                                    <li><i className="shopping"></i></li>
                                    <li><i className="reading"></i></li>
                                    <li><i className="travel"></i></li>
                                    <li><i className="tea"></i></li>
                                </ul>
                                <a href="" className="download"><span></span>Download Resume</a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="experience">
                <div className="container">
                    <div className="exp-top">
                        <h3 className="top-title">About</h3>
                        <span className="line"></span>
                    </div>
                    <div className="exp-devide">
                        <h4>Experience</h4>
                        <span className="devide-line">
                        </span>
                        <label className="bag"></label>
                        <div className="exp-devide-grid-right">
                            <h5>SENIOR UI/UX DESIGNER</h5>
                            <small>Google - 2013 . Current</small>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                        </div>
                        <div className="exp-devide-grid-left">
                            <h5>JUNIOR UI DESIGNER</h5>
                            <small>Microsoft - 2010 . 2012</small>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                        <div className="exp-devide-grid-rightb">
                            <h5>UI/UX DESIGNER</h5>
                            <small>IBM - 2006 . 2010</small>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                    <div className="exp-devide education">
                        <h4>Education</h4>
                        <span className="devide-line">
                        </span>
                        <label className="book"></label>
                        <div className="exp-devide-grid-right">
                            <h5>MASTERS DEGREE</h5>
                            <small>Modern Sciences & Arts University - 2014 . 2012</small>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div className="exp-devide-grid-left">
                            <h5>BACHELORS DEGREE</h5>
                            <small>Modern Sciences & Arts University - 2012 . 2010</small>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <div className="exp-devide-grid-rightb">
                            <h5>GRADUATION</h5>
                            <small>Modern Sciences & Arts University - Faculty of Computer Science - 2006 . 2010</small>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="skills">
                <div className="container">
                    <div className="skills-top">
                        <h3 className="top-title">Skills</h3>
                        <span className="line"></span>
                        <div className="row skill-grids text-center">
                            <div className="col-md-3 skill-column">
                                <div className="skill-grid">
                                    <div className="circle" id="circles-1"></div>
                                    <h3>PHOTOSHOP</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </div>
                            <div className="col-md-3 skill-column">
                                <div className="skill-grid">
                                    <div className="circle" id="circles-2"></div>
                                    <h3>ILLUSTRATOR</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </div>
                            <div className="col-md-3 skill-column">
                                <div className="skill-grid">
                                    <div className="circle" id="circles-3"></div>
                                    <h3>HTML/CSS</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </div>
                            <div className="col-md-3 skill-column">
                                <div className="skill-grid">
                                    <div className="circle" id="circles-4"></div>
                                    <h3>JAVASCRIPT</h3>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="social-media">
                <div className="container">
                    <div className="social-media-top">
                        <h3 className="top-title">SOCIAL MEDIA CONNECTIONS</h3>
                        <span className="line"></span>
                        <ul className="social">
                            <li><i className="fb"></i></li>
                            <li><i className="tw"></i></li>
                            <li><i className="li"></i></li>
                            <li><i className="yt"></i></li>
                            <li><i className="ca"></i></li>
                            <li><i className="ph"></i></li>
                            <li><i className="gp"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="awards">
                <div className="container">
                    <div className="awards-top">
                        <h3 className="top-title">AWARDS & ACHIEVEMENTS</h3>
                        <span className="line"></span>
                        <div className="row award-row">
                            <div className="col-md-3 award-column">
                                <i className="award"></i>
                                <h5>50</h5>
                                <small>Awards Won!</small>
                            </div>
                            <div className="col-md-3 award-column">
                                <i className="project"></i>
                                <h5>570</h5>
                                <small>PROJECTS DONE</small>
                            </div>
                            <div className="col-md-3 award-column">
                                <i className="client"></i>
                                <h5>215</h5>
                                <small>HAPPY CLIENTS</small>
                            </div>
                            <div className="col-md-3 award-column">
                                <i className="cups"></i>
                                <h5>2145</h5>
                                <small>CUPS OF COFFEE</small>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="twitter">
                <div className="container">
                    <div className="twitter-top">
                        <i className="twit"></i>
                        <span className="line"></span>
                        <div  id="top" className="callbacks_container">
                            <ul className="rslides" id="slider4">
                                <li>
                                    <div className="slider-top">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem<br />Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="slider-top">
                                        <p>simply dummy text of the Lorem Ipsum is printing and typesetting industry. Lorem<br />Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="slider-top">
                                        <p>printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem<br />Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="slider-top">
                                        <p>and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem<br />Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="slider-top">
                                        <p>typesetting Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem<br />Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }
});
