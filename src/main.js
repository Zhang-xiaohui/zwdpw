// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Demo from './page/Demo'
import Me from './page/Me'
import App from './App'
import Buy from './page/Buy'
import Collect from './page/Collect'
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuerify from 'vuerify'
//import Validator from 'vue-validator';
import Router from 'vue-router'
import Resource from 'vue-resource'
import VueHtml5Editor from 'vue-html5-editor'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//Vue.use(Validator);
//Vue.config.debug = true;
Vue.use(Router);
Vue.use(MintUI);
Vue.use(Vuex);
Vue.use(Vuerify);
Vue.use(Resource);
Vue.config.productionTip = false
Vue.http.interceptors.push(function(request, next) {//拦截器
// 跨域携带cookie
  request.credentials = true;
  next()
})
Vue.use(VueHtml5Editor, {
    // 全局组件名称，使用new VueHtml5Editor(options)时该选项无效  
    // global component name 
    name: "vue-html5-editor",
    // 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称 
    // if set true,will append module name to toolbar after icon 
    showModuleName: true,
    // 自定义各个图标的class，默认使用的是font-awesome提供的图标 
    // custom icon class of built-in modules,default using font-awesome 
    icons: {
        text: "fa fa-pencil",
        color: "fa fa-paint-brush",
        font: "fa fa-font",
        align: "fa fa-align-justify",
        list: "fa fa-list",
        link: "fa fa-chain",
        unlink: "fa fa-chain-broken",
        tabulation: "fa fa-table",
        image: "fa fa-file-image-o",
        hr: "fa fa-minus",
        eraser: "fa fa-eraser",
        undo: "fa-undo fa",
        "full-screen": "fa fa-arrows-alt",
        info: "fa fa-info",
    },
    // 语言，内建的有英文（en-us）和中文（zh-cn） 
    //default en-us, en-us and zh-cn are built-in 
    language: "zh-cn",
    // 自定义语言 
    i18n: {
        //specify your language here 
        "zh-cn": {
            "align": "对齐方式",
            "image": "图片",
            "list": "列表",
            "link": "链接",
            "unlink": "去除链接",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "关于",
            "color": "颜色",
            "please enter a url": "请输入地址",
            "create link": "创建链接",
            "heading": "标题",
            "font name": "字体",
            "font size": "文字大小",
            "left justify": "左对齐",
            "center justify": "居中",
            "right justify": "右对齐",
            "ordered list": "有序列表",
            "unordered list": "无序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行数",
            "column count": "列数",
            "save": "确定",
            "upload": "上传",
            "progress": "进度",
            "unknown": "未知",
            "please wait": "请稍等",
            "error": "错误",
            "abort": "中断",
            "reset": "重置"
        }
    },
    // 隐藏不想要显示出来的模块 
    // the modules you don't want 
    hiddenModules: [
		"color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "text",
        "hr",
        "eraser",
        "undo",
        "full-screen",
		"info",
		"image",
	],
    // 自定义要显示的模块，并控制顺序 
    // keep only the modules you want and customize the order. 
    // can be used with hiddenModules together 
    visibleModules: [
		
    ],
    // 扩展模块，具体可以参考examples或查看源码 
    // extended modules 
    modules: {
        //omit,reference to source code of build-in modules 
    }
})
const router = new Router({
	routes : [
		{
			path: '/',
			meta: {
	          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	    	},
			component: resolve => require(["./page/Home"], resolve)
		},
		{
			path: '/home',
			meta: {
	          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	    	},
			component: r => require.ensure([], () => r(require("./page/Home")), 'home')
		},
		{
			path: '/loading',
			name:'登录',
//			component: r => require.ensure([], () => r(require("./page/Loading")), 'loading')
            component: resolve => require(["./page/Loading"], resolve)
		},
		{
			path: '/more',
			component: r => require.ensure([], () => r(require("./page/More")), 'more')
		},
		{
			path: '/me',
			component: r => require.ensure([], () => r(require("./page/Me")), 'me')
		},
		{
			path: '/schoolwork',
			component: r => require.ensure([], () => r(require("./page/Schoolwork")), 'schoolwork')
		},
		{
			path: '/qualityReading',
			component: r => require.ensure([], () => r(require("./page/QualityReading")), 'qualityReading')

		},
		{
			path: '/repertoryOne',
			component: r => require.ensure([], () => r(require("./page/RepertoryOne")), 'repertoryOne')

		},
		{
			path: '/searchRepertory',
			component: r => require.ensure([], () => r(require("./page/SearchRepertory")), 'searchRepertory')

		},
		{
			path: '/buy',
			component: r => require.ensure([], () => r(require("./page/Buy")), 'buy')

		},
		{
			path: '/collect',
			component: r => require.ensure([], () => r(require("./page/Collect")), 'collect')

		},
		{
			path: '/activeDetail',
			component: r => require.ensure([], () => r(require("./page/activeDetail")), 'activeDetail')

		},
		{
			path: '/contribute',
			component: r => require.ensure([], () => r(require("./page/Contribute")), 'Contribute')

		},
		{
			path: '/articleDetails',
			component: r => require.ensure([], () => r(require("./page/ArticleDetails")), 'articleDetails')

		},
		{
			path: '/bookDetail',
			component: r => require.ensure([], () => r(require("./page/BookDetail")), 'bookDetail')
		},
		{
			path: '/bookCategory',
			component: r => require.ensure([], () => r(require("./page/BookCategory")), 'bookCategory')
		},
		{
			path: '/bookPreview',
			component: r => require.ensure([], () => r(require("./page/BookPreview")), 'bookPreview')
		},
		{
			path: '/audioPreview',
			component: r => require.ensure([], () => r(require("./page/AudioPreview")), 'audioPreview')
		},
		{
			path: '/videoPreview',
			component: r => require.ensure([], () => r(require("./page/VideoPreview")), 'videoPreview')
		},
		{
			path: '/register',
			component: r => require.ensure([], () => r(require("./page/Register")), 'register')
		},
		{
			path: '/teacher',
			component: r => require.ensure([], () => r(require("./page/teacher")), 'teacher')
		},
		{
			path: '/student',
			component: r => require.ensure([], () => r(require("./page/Student")), 'student')
		},
		{
			path: '/essentialInformation',
			component: r => require.ensure([], () => r(require("./page/EssentialInformation")), 'essentialInformation')
		},
		{
			path: '/readingStyle',
			component: r => require.ensure([], () => r(require("./page/ReadingStyle")), 'readingStyle')
		},
		{
			path: '/replyTo',
			component: r => require.ensure([], () => r(require("./page/ReplyTo")), 'replyTo')
		},
		{
			path: '/answerClick',
			component: r => require.ensure([], () => r(require("./page/AnswerClick")), 'answerClick')
		},
		{
			path: '/remark',
			component: r => require.ensure([], () => r(require("./page/Remark")), 'remark')
		},
		{
			path: '/libraryList',
			component: r => require.ensure([], () => r(require("./page/LibraryList")), 'libraryList')
		},
		{
			path: '/set',
			component: r => require.ensure([], () => r(require("./page/Set")), 'set')
		},
		{
			path: '/changepassword',
			component: r => require.ensure([], () => r(require("./page/ChangePassword")), 'changepassword')
		}
		,
		{
			path: '/teachertask',
			component: r => require.ensure([], () => r(require("./page/TeacherTask")), 'teachertask')
		}
		,
		{
			path: '/createclasswork',
			component: r => require.ensure([], () => r(require("./page/CreateClasswork")), 'createclasswork')
		},
		{
			path: '/repertory',
			component: r => require.ensure([], () => r(require("./page/Repertory")), 'repertory')
		},
		{
			path: '/library',
			component: r => require.ensure([], () => r(require("./page/Library")), 'library')
		}
		,
		{
			path: '/taskdetails',
			component: r => require.ensure([], () => r(require("./page/TaskDetails")), 'taskdetails')
		}
		,
		{
			path: '/completion',
			component: r => require.ensure([]
				, () => r(require("./page/Completion")), 'completion')
		}
		,
		{
			path: '/correctComposition',
			component: r => require.ensure([], () => r(require("./page/CorrectComposition")), 'correctComposition')
		}
		,
		{
			path: '/evaluated',
			component: r => require.ensure([], () => r(require("./page/Evaluated")), 'evaluated')
		}
		,
		{
			path: '/searchBook',
			component: r => require.ensure([], () => r(require("./page/SearchBook")), 'searchBook')

		}
		// ,{
		// 	path: '/WaitIssueDetails',
		// 	component: r => require.ensure([], () => r(require("./page/WaitIssueDetails")), 'WaitIssueDetails')
		// }
		
	]
});

const  vuex_store = new Vuex.Store({
    state:{
        titleName:"首页",
        backUrl:null,
        more:null,
        decide:null,
        moreUrl:null,
        moreTitle:null,
        selectedTab:"home",
        showTopNav:true,
        showBottomNav:true,
		collect:"",
		moreFtn:"",
        isOpen:false,
        selectLib:'01',
        isEmpty:true,
        isStudent:true,
		select:"1",
		selectPath:'/home',
        iswork:false,
		isA:"1",
		saveTitle:'',
		selectdis:"1",
		temporaryStorage:'',
		backurl:'',
		// url:'./../',
        // url:"http://192.168.102.74:8081/webapp/",
        url:"http://192.168.102.229:8088/webapp/",
		// url:"http://192.168.104.40:8080/webapp/",
		// url:"http://192.168.102.16:8080/webapp/",
		isAnswer:true,
		identity:"",
		selectLib:'01',
		//setToken:false,
        managerRecommended:[]
    },
    mutations: {
	    setManagerRecommended (state,data) {
	    	state.managerRecommended = data;
	    },
	},
});

/* eslint-disable no-new */
new Vue({
  el: '#base-dom',
  router,
  store:vuex_store,
  template: '<App/>',
  components: { App },
  created:function(){
	console.log(this);
  }

});