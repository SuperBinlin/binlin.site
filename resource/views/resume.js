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
                            <h5>苏州卡说信息科技有限公司(2016/2~至今)</h5>
                            <small>web前端开发工程师</small>
                            <p>前端路漫漫其修远兮,吾将上下而求索,构建前端框架,开发公司公用css框架,开发vue组件库</p>
                        </div>
                        <div className="exp-devide-grid-left">
                            <h5>智慧芽信息科技有限公司(2014/10~2016/2)</h5>
                            <small>web前端开发工程师</small>
                            <p>前端进阶,为了寻求更多突破,来到这家前端大牛聚集地的公司,进入我技术的转折点,从使用seajs、requirejs开始,进行模块化开发,用juicer作为模板引擎实现数据和视图模型的分离(初尝MVC),慢慢接触npm管理包,到后来接触angular、react、vue并最终决定使用vue+webpack来构建前端架构,用来重构公司项目的代码,感觉自己终于跟上时代的步伐了</p>
                        </div>
                        <div className="exp-devide-grid-rightb">
                            <h5>江苏中科梦兰信息科技有限公司(2013/1~2014/9)</h5>
                            <small>web前端开发工程师</small>
                            <p>入门前端,对所见即所得的效果中毒不轻,手写兼容到IE6的代码,JQUERY操作DOM溜的不行</p>
                        </div>
                    </div>
                    <div className="exp-devide education">
                        <h4>Education</h4>
                        <span className="devide-lineTwo">
                        </span>
                        <label className="book"></label>
                        <div className="exp-devide-grid-right">
                            <h5>常熟理工学院</h5>
                            <small>2009/9~2013/6</small>
                            <p>软件工程</p>
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
                                    <div className="circle" id="circles-3"></div>
                                    <h3>HTML/CSS</h3>
                                    <p>能手写符合w3c标准的代码,有较多移动端经验,熟悉响应式布局,css3,常用库:bootstrap、pure</p>
                                </div>
                            </div>
                            <div className="col-md-3 skill-column">
                                <div className="skill-grid">
                                    <div className="circle" id="circles-1"></div>
                                    <h3>JAVASCRIPT</h3>
                                    <p>原生js、jquery、zepto、lodash、underscoreJs、requireJs、seaJs、angularJs、reactJs、reactNative、vueJs</p>
                                </div>
                            </div>
                            <div className="col-md-3 skill-column">
                                <div className="skill-grid">
                                    <div className="circle" id="circles-2"></div>
                                    <h3>构建工具</h3>
                                    <p>webpack</p>
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
