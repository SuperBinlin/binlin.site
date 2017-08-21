/**
 * Created by Binlin
 * Date: 2016/09/26
 * Time: 10:30
 */
'use strict';

import '../css/resume.css';

class Resume extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			baseInfo:[
				{keys:'Birthday',val:'1991/03/10'},
				{keys:'Phone',val:'15262517173'},
				{keys:'Wechat',val:'Binlin321'},
				{keys:'Email',val:'skyxuanbin@qq.com'},
				{keys:'Address',val:'ShangHai,SuZhou'}
			]
		}
	}

	download () {
		window.scroll(0,0);
		html2canvas(document.body).then((canvas) => {
			var imgData = canvas.toDataURL('image/jpeg');
			this.saveFile(imgData, 'test')
		});
	}

	saveFile (data, filename){
		var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
		save_link.href = data;
		save_link.download = filename;
		
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		save_link.dispatchEvent(event);
	}

	render(){
		let {baseInfo} = this.state;
		return (
		<div className="container-fluid">
			<div className="header">
				<div className="container">
					<div className="header-profile">
						<img src="./images/zb_bai.png" alt=""/>
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
							2013年软件工程专业本科毕业,从实习开始接触前端,最初被所写即可得的效果吸引,之后不断深入,开始对前端领域欲罢不能。
						</p>
						<p>
							专职前端,职业生涯初期还是jQuery的时代,转眼如今前端盛世,始终努力的跟着前端发展的节奏,精通主流MVVM框架,有完整的移动端混合模式app开发经验和webApp开发经验,有nodejs的开发经验,独立开发过express+mongodb的后台服务。带领过前端团队,引领团队技术走向及帮助成员成长,始终以做一个有追求的优秀前端为目标,十分欣赏和愿意与有自己想法的产品经理合作。
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
								<a className="download" onClick={(e)=>this.download()}><span></span>Download Resume</a>
							</div>
							<div className="clearfix"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="experience">
				<div className="container add-bottom">
					<div className="exp-top">
						<h3 className="top-title">About</h3>
						<span className="line"></span>
					</div>
					<div className="exp-devide">
						<h4>Experience</h4>
						<span className="devide-line">
						</span>
						<label className="bag"></label>
						<div className="exp-devide-grid-left">
							<h5>lodestone(2016/12~至今)</h5>
							<small>前端架构师</small>
							<p>为了追求更高的技术境界,我选择来到上海,出于各种因素的考虑,进入这家瑞士外资的公司,成为了前端leader,负责前端技术选型,搭建PC端以及混合App的前端框架,在帮助组员成长的同时,不断自主学习</p>
						</div>
						<div className="exp-devide-grid-right">
							<h5>苏州卡说信息科技有限公司(2016/1~2016/12)</h5>
							<small>web前端开发工程师</small>
							<p>此公司项目主要是一些后台系统,主要工作是负责构建前端框架,开发常用vue组件,开发公用css ui库。</p>
						</div>
						<div className="exp-devide-grid-left">
							<h5>智慧芽信息科技有限公司(2014/10~2016/1)</h5>
							<small>web前端开发工程师</small>
							<p>前端进阶,为了寻求更多突破,来到这家前端大牛聚集地的公司,进入我技术的转折点,从使用seajs、requirejs开始,进行模块化开发,用juicer作为模板引擎实现数据和视图模型的分离(初尝MVC),慢慢接触npm管理包,到后来接触angular、react、vue并最终决定使用vue+webpack来构建前端架构,开始重构公司项目的代码,不断成长的同时,也庆幸从很多良师益友身上,铸就了我至今扔不断学习的品质</p>
						</div>
						<div className="exp-devide-grid-right">
							<h5>江苏中科梦兰信息科技有限公司(2013/1~2014/9)</h5>
							<small>web前端开发工程师</small>
							<p>入门前端,主要工作是一些静态页面的开发,和一些比较炫酷的动态效果的开发,主要用html+css+jquery</p>
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
									<p>能手写符合w3c标准的代码,有较多移动端经验,熟悉响应式布局,css3,非常熟悉less、sass,常用库css库:bootstrap、pure、mui</p>
								</div>
							</div>
							<div className="col-md-3 skill-column">
								<div className="skill-grid">
									<div className="circle" id="circles-1"></div>
									<h3>JAVASCRIPT</h3>
									<p>es5、es6、typescript、vue、react、angular、jquery、zepto、lodash、underscoreJs、requireJs、seaJs、reactNative、node、express</p>
								</div>
							</div>
							<div className="col-md-3 skill-column">
								<div className="skill-grid">
									<div className="circle" id="circles-2"></div>
									<h3>前端工程</h3>
									<p>webpack、gulp、npm、git</p>
								</div>
							</div>
							<div className="col-md-3 skill-column">
								<div className="skill-grid">
									<div className="circle" id="circles-4"></div>
									<h3>移动端</h3>
									<p>ionic2、cordova、reactNative、weex、weux</p>
								</div>
							</div>
							<div className="clearfix"></div>
						</div>
					</div>
				</div>
			</div>
			<div className="social-media">
				<div className="container">
					<div className="social-media-top">
						<h3 className="top-title">Projects</h3>
						<span className="line"></span>
						<div className="container projects">
							<div className="row">
								<div className="col-sm-4">
									<a className="project-item" href="http://trademark.patsnap.cn/" target="_blank">
										<img src="./images/logo/logo-cn.png" />
									</a>
								</div>
								<div className="col-sm-4">
									<a className="project-item" href="http://x.patsnap.cn/" target="_blank">
										<img src="./images/logo/course-logo.png" />
									</a>
								</div>
								<div className="col-sm-4">
									<a className="project-item" href="http://analytics.patsnap.cn/" target="_blank">
										<img src="./images/logo/database.png" />
									</a>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-4">
									<a className="project-item" href="http://www.patsnap.com/" target="_blank">
										<img src="./images/logo/logo_patsnap.png" />
									</a>
								</div>
								<div className="col-sm-4">
									<a className="project-item" href="http://binlin.site/#/album" target="_blank">
										<img src="./images/logo/binlinsite.jpg" />
									</a>
								</div>
								<div className="col-sm-4">
									<a className="project-item" href="http://ranking.patsnap.com/" target="_blank">
										<img src="./images/logo/ranking.png" />
									</a>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-4">
									<a className="project-item" href="http://binlin.site/project/email-editor/app/email-editor.html" target="_blank">
										<img src="./images/logo/mail.png" />
									</a>
								</div>
								<div className="col-sm-4">
									<a className="project-item" href="http://binlin.site/project/snake/snake.html" target="_blank">
										<img src="./images/logo/timg.jpeg" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
	}
};

export default Resume;
