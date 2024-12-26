"use strict";(self["webpackChunkhuangdu"]=self["webpackChunkhuangdu"]||[]).push([[594],{1116:function(e,t,s){s.r(t),s.d(t,{default:function(){return c}});var n=function(){var e=this,t=e._self._c;return t("div",{style:{backgroundImage:`linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${s(9528)})`,backgroundRepeat:"repeat-y",backgroundSize:"100% auto",backgroundPosition:"top center"},attrs:{id:"app"}},[t("div",{staticClass:"survey"},[e._m(0),t("el-row",{staticClass:"navigation",staticStyle:{"margin-bottom":"20px"},attrs:{justify:"center"}},e._l(e.questions,(function(s,n){return t("el-button",{key:n,class:["nav-item",{active:n===e.currentQuestionIndex}],on:{click:function(t){return e.goToQuestion(n)}}},[e._v(" "+e._s(n+1)+" ")])})),1),e.currentQuestionIndex<e.questions.length?t("el-card",{attrs:{shadow:"hover"}},[t("h2",[e._v("第 "+e._s(e.currentQuestionIndex+1)+" 题 / "+e._s(e.questions.length))]),"single-choice"===e.currentQuestion.type?t("div",[t("el-tag",[e._v("单选题")]),t("h3",[e._v(e._s(e.currentQuestion.question))]),t("el-divider"),t("el-radio-group",{staticStyle:{width:"100%"},model:{value:e.answers[e.currentQuestionIndex],callback:function(t){e.$set(e.answers,e.currentQuestionIndex,t)},expression:"answers[currentQuestionIndex]"}},e._l(e.currentQuestion.options,(function(s,n){return t("el-radio",{key:n,staticStyle:{"margin-bottom":"10px",width:"100%"},attrs:{label:s,border:""}},[e._v(" "+e._s(s)+" ")])})),1)],1):e._e(),"multiple-choice"===e.currentQuestion.type?t("div",[t("el-tag",[e._v("多选题")]),t("h3",[e._v(e._s(e.currentQuestion.question))]),t("el-checkbox-group",{staticStyle:{width:"100%"},model:{value:e.answers[e.currentQuestionIndex],callback:function(t){e.$set(e.answers,e.currentQuestionIndex,t)},expression:"answers[currentQuestionIndex]"}},e._l(e.currentQuestion.options,(function(s,n){return t("el-checkbox",{key:n,staticStyle:{"margin-bottom":"10px",width:"100%"},attrs:{label:s,border:""}},[e._v(" "+e._s(s)+" ")])})),1)],1):e._e(),"fill-in-the-blank"===e.currentQuestion.type?t("div",[t("h3",[e._v(e._s(e.currentQuestion.question))]),t("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入答案",clearable:""},model:{value:e.answers[e.currentQuestionIndex],callback:function(t){e.$set(e.answers,e.currentQuestionIndex,t)},expression:"answers[currentQuestionIndex]"}})],1):e._e(),"image-upload"===e.currentQuestion.type?t("div",[t("h3",[e._v(e._s(e.currentQuestion.question))]),t("el-upload",{staticClass:"avatar-uploader",attrs:{action:"https://jsonplaceholder.typicode.com/posts/","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?t("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]),t("el-upload",{staticClass:"upload-demo",attrs:{action:"","on-change":e.handleImageUpload,"auto-upload":!1,"show-file-list":!1}},[t("el-button",{attrs:{slot:"trigger",type:"primary"},slot:"trigger"},[e._v("上传图片")]),e.answers[e.currentQuestionIndex]?t("div",[t("img",{staticStyle:{"max-width":"100%","max-height":"200px","margin-top":"10px"},attrs:{src:e.answers[e.currentQuestionIndex],alt:"Uploaded Image"}})]):e._e()],1)],1):e._e(),e.currentQuestionIndex<e.questions.length-1?t("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"primary",disabled:!e.isAnswered},on:{click:e.nextQuestion}},[e._v(" 下一题 ")]):t("el-button",{staticStyle:{"margin-top":"20px"},attrs:{type:"success",disabled:!e.isAnswered},on:{click:e.submitSurvey}},[e._v(" 提交 ")])],1):t("div",{staticClass:"completed"},[t("el-card",[t("h2",[e._v("问卷已完成！")]),t("p",[e._v("感谢您的参与！")]),t("pre",[e._v(e._s(e.answers))])])],1),t("div",{staticClass:"progress-bar"},[t("el-progress",{staticStyle:{width:"200px"},attrs:{"text-inside":!0,"stroke-width":20,percentage:e.progressPercentage,type:"circle"}})],1)],1)])},i=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"header"},[t("h1",[e._v(" 黄渡游戏公司入职测验")])])}],r=(s(4114),{data(){return{currentQuestionIndex:0,answers:[],questions:[{type:"single-choice",question:"你是否信任黄渡公司的公司文化？",options:["是","否"]},{type:"single-choice",question:"你是否愿意全身心投入黄渡公司？",options:["是","否"]},{type:"single-choice",question:"黄渡游戏公司位于黄渡游戏地铁公司地铁站的几号口？",options:["1号口","2号口","3号口","4号口","5号口"]},{type:"single-choice",question:"黄渡游戏公司会将员工派遣学习到哪座城市？",options:["柏林","东京","纽约","巴黎","伦敦"]},{type:"multiple-choice",question:"黄渡游戏公司已经发展出了哪些子公司？",options:["黄渡健身房","半糖村饭店","黄渡玩具公司","黄渡电影公司"]},{type:"multiple-choice",question:"黄渡游戏公司的公司文化包括以下哪些？",options:["以人为本","创新驱动","团队合作","玩家至上"]},{type:"single-choice",question:"利用了黄渡游戏公司的仿真技术后，以下步可能会发生的是？",options:["小红作为管理员去吃了一顿海底捞，整个游戏世界都有火锅味","小强退出游戏后去坐地铁，游戏中的人物也在坐地铁","小白换了chiikawa主题的手机壳后，黄渡公司的游戏中也有了chiikawa主题","小黑在游戏中买了一辆法拉利，现实中也有了一辆法拉利"]},{type:"single-choice",question:"黄渡游戏公司的核心理念是什么？",options:["无限未来，与你共创","用心创造快乐","知人者智，识人者明","以人为本，创造未来"]},{type:"multiple-choice",question:"以下哪些属于黄渡游戏公司的核心技术",options:["AI应用技术","全平台支持","区块链技术","云计算技术","超真实游戏体验"]},{type:"fill-in-the-blank",question:"在黄渡公司推出的超真实游戏体验中，小红从上午7点玩到了晚上10点，那么游戏时间经过了多少小时？"},{type:"single-choice",question:"请选择你的意向岗位",options:["角色设计师","数据工程师","游戏测试工程师"]},{type:"multiple-choice",question:"以下哪些属于黄渡公司的产品？",options:["黄渡方块","黄渡连连看","幻想征途","极限竞速","黄渡大冒险","黄渡飞车"]},{type:"fill-in-the-blank",question:"请输入你的姓名"},{type:"image-upload",question:"请上传你的个人照片"}]}},created(){for(let e=0;e<this.questions.length;e++)"multiple-choice"===this.questions[e].type?this.answers.push([]):this.answers.push(void 0)},computed:{currentQuestion(){return this.questions[this.currentQuestionIndex]},progressPercentage(){return Math.round((this.currentQuestionIndex+1)/this.questions.length*100)},isAnswered(){const e=this.answers[this.currentQuestionIndex];return"single-choice"===this.currentQuestion.type?void 0!==e&&""!==e:"multiple-choice"===this.currentQuestion.type?Array.isArray(e)&&e.length>0:"fill-in-the-blank"===this.currentQuestion.type?void 0!==e&&""!==e.trim():"image-upload"===this.currentQuestion.type&&(void 0!==e&&null!==e)}},methods:{nextQuestion(){this.currentQuestionIndex<this.questions.length-1&&this.currentQuestionIndex++},goToQuestion(e){this.currentQuestionIndex=e},handleImageUpload(e){const t=new FileReader;t.onload=e=>{this.$set(this.answers,this.currentQuestionIndex,e.target.result)},t.readAsDataURL(e.raw)},submitSurvey(){console.log("提交问卷答案：",this.answers),this.currentQuestionIndex++}}}),o=r,u=s(1656),a=(0,u.A)(o,n,i,!1,null,"f492b688",null),c=a.exports}}]);
//# sourceMappingURL=about.579a7de9.js.map