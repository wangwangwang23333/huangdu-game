<template>
  <div
  id="app"
  :style="{
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${require('@/assets/background.png')})`,
    backgroundRepeat: 'repeat-y', // 垂直方向重复
    backgroundSize: '100% auto', // 宽度为 100%，高度保持比例
    backgroundPosition: 'top center', // 居中对齐
  }">
    <div class="survey"
  >
    <div 
    class="header">
      <h1> 黄渡游戏公司入职测验</h1>
    </div>

    <!-- 题号导航 -->
    <el-row class="navigation" justify="center" style="margin-bottom: 20px;">
      <el-button
        v-for="(question, index) in questions.filter(q => !q.hidden)"
        :key="index"
        :type = "question.warning ? 'warning' : ''"
        :class="['nav-item', { active: question.index === String(currentQuestionIndexInNav + 1) }]"
        @click="goToQuestion(index)"
      >
        {{ index + 1 }}
      </el-button>
    </el-row>

    <!-- 问卷内容 -->
    <el-card shadow="hover" v-if="currentQuestionIndex < questions.length"
    :class="currentQuestion.hidden ? 'hidden': ''">
      <h2>第 {{ currentQuestion.index }} 题</h2>

      <!-- 单选题 -->
      <div v-if="currentQuestion.type === 'single-choice'">
        <el-tag>单选题</el-tag>
        <h3>{{ currentQuestion.question }}</h3>
        <el-divider />
        <el-radio-group v-model="answers[currentQuestionIndex]" style="width: 100%;">
          <el-radio
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :label="option"
            style="margin-bottom: 10px; width: 100%;"
            border
          >
            {{ option }}
          </el-radio>
        </el-radio-group>
      </div>

      <!-- 多选题 -->
      <div v-if="currentQuestion.type === 'multiple-choice'">
        <el-tag>多选题</el-tag>
        <h3>{{ currentQuestion.question }}</h3>
        <el-checkbox-group v-model="answers[currentQuestionIndex]" style="width: 100%;">
          <el-checkbox
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :label="option"
            style="margin-bottom: 10px; width: 100%;"
            border
          >
            {{ option }}
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <!-- 填空题 -->
      <div v-if="currentQuestion.type === 'fill-in-the-blank'">
        <h3>{{ currentQuestion.question }}</h3>
        <el-input
          v-model="answers[currentQuestionIndex]"
          placeholder="请输入答案"
          clearable
          style="width: 100%;"
        />
      </div>

      <!-- 图片上传题 -->
      <div v-if="currentQuestion.type === 'image-upload'">
        <h3>{{ currentQuestion.question }}</h3>
        <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleUploadError"
            :before-upload="beforeAvatarUpload"
            :auto-upload="true"
          >
          <img v-if="answers[currentQuestionIndex]" :src="answers[currentQuestionIndex]" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        
       
      </div>

      <!-- 下一题或提交按钮 -->
      <el-button
        v-if="currentQuestionIndex < questions.length - 1"
        type="primary"
        @click="nextQuestion"
        style="margin-top: 20px;"
      >
        下一题
      </el-button>

      <el-button
        v-else
        type="success"
        @click="submitSurvey"
        :disabled="!isAnswered"
        style="margin-top: 20px;"
      >
        提交
      </el-button>
    </el-card>

    <!-- 问卷完成 -->
    <div v-else class="completed">
      <el-card>
        <div v-show = "endSituation == -1" v-loading="endSituation == -1" >
          <h2>正在提交答案，请稍等...</h2>
          <span>请耐心等待...</span>
          <!--加载进度条-->
        </div>
        <div v-show="endSituation == 0">
          <h2>您没有通过我们的测试</h2>
          <p>您的分数为{{ Math.round(correctNumber * 100 / 14 , 0)}} ！</p>
          <p>还请更了解我们的公司后，再次参加我们的招聘。</p>
          <p>用心创造快乐，我们永远在等您!</p>
        </div>
        <div v-show="endSituation ==1">
          <h2>您已进入我们的人才池</h2>
          <p>您竟然取得了满分 ！</p>
          <p>用心创造快乐，我们即将在6个月内联系您～</p>
          <p>请您耐心等待^_^</p>
        </div>
        <div v-show="endSituation == 2">
          <h2>不好意思，我们的网页似乎出了一些问题</h2>
          <p>还请您忽视，并立即联系黄渡游戏公司的工作人员！</p>
          <p>用心创造快乐，黄渡游戏公司一直在路上～</p>
        </div>
        <div v-show="endSituation == 3">
          <h2>很高兴您能走到这一步</h2>
          <p>我就是之前成功逃出公司的幸存者。这个问卷也被我黑入了，你通过了我的考验，我也很高兴你能加入到我这里</p>
          <p>我希望你能够混入他们公司的行列，通过面试，成为他们的员工</p>
          <p>我会在你面试之前，给你一些帮助，那么请先加入下面的群聊！</p>
          <img :src="require('@/assets/find_me.jpg')" alt="find_me" style="width: 50%;"/>
        </div>
      </el-card>
    </div>

    <!-- 进度条 -->
    <div
      class="progress-bar"
      @mousedown="startDragging"
      @mousemove="dragProgress"
      @mouseup="stopDragging"
      @mouseleave="stopDragging"
    >
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="progress"
        type="circle"
        style="width: 200px; cursor: pointer;"
      />
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      currentQuestionIndex: 0, // 当前题目索引
      // 当前题目索引在题号导航中的索引
      currentQuestionIndexInNav: 0,
      progress: 5, // 进度条百分比
      startX: 0, // 拖拽开始的 X 坐标
      startY: 0, // 拖拽开始的 Y 坐标
      isDragging: false, // 是否正在拖拽
      startProgress: 0, // 拖拽开始时的进度

      // 结局情景：
      endSituation: 0, // 0: 未完成，1: 普通题目全部正确，2: 特殊题目错误，3: 特殊题目正确
      correctNumber: 0,  

      answers: [

      ], // 存储答案
      questions: [
        {
          type: "single-choice",
          question: "你是否信任黄渡公司的公司文化？",
          options: ["是", "否"],
          hidden: false,
          index: '1'
        },
        {
          type: "single-choice",
          question: "你是否愿意全身心投入黄渡公司？",
          options: ["是", "否"],
          hidden: false,
          index: '2'
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司位于黄渡游戏地铁公司地铁站的几号口？",
          options: ["1号口", "2号口", "3号口", "4号口", "5号口"],
          hidden: false,
          index: '3'
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司会将员工派遣学习到哪座城市？",
          options: ["柏林", "东京", "纽约", "巴黎", "伦敦"],
          hidden: false,
          index: '4'
        },
        {
          type: "multiple-choice",
          question: "黄渡游戏公司已经发展出了哪些子公司？",
          options: ["黄渡健身房", "半糖村饭店", "黄渡玩具公司", "黄渡电影公司"],
          hidden: false,
          index: '5'
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司成立于哪一年？",
          options: ["2018年", "2019年", "2020年", "2021年", "2022年"],
          hidden: false,
          index: '6'
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司宣传片中出现了以下哪个场景",
          options: ["黄渡公司员工在海底捞吃火锅", "员工在虚拟世界中欢迎玩家", "员工在公司门口打羽毛球", "员工在公司门口打篮球"],
          hidden: false,
          index: '7'
        },

        {
          type: "multiple-choice",
          question: "黄渡游戏公司的公司文化包括以下哪些？",
          options: ["以人为本", "创新驱动", "团队合作", "玩家至上"],
          hidden: false,
          index: '8'
        },
        // 四个隐藏问题：
        {
          type: "single-choice",
          question: "黄渡游戏公司以人为本理念的真实含义是什么？",
          options: ["公司的创始人是一只猫", "员工都有很好的福利", "招聘的角色设计师会被转化为游戏内NPC", "角色设计师薪酬丰富，吸引各位加入"],
          hidden: true,
          index: '8-1'
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司创意驱动理念的真实含义是什么？",
          options: ["黄渡游戏公司努力了解玩家的真实需求，并不断改进",
            "黄渡游戏公司通过各种方式监视着玩家的一切",
            "黄渡游戏公司对细节精益求精，不断提升游戏质量",
            "创意是黄渡游戏公司最努力的追求"
          ],
          hidden: true,
          index: '8-2'
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司的玩家至上理念的真实含义是什么？",
          options: ["黄渡游戏公司将玩家的需求放在第一位，不断改进游戏体验",
            "黄渡游戏公司聆听玩家真实需求，不断改进游戏体验",
            "黄渡游戏公司希望玩家能永远留在游戏中",
            "黄渡游戏公司提升产品质量，从而吸引更多的玩家"
          ],
          hidden: true,
          index: '8-3'
        },
        {
          type: "single-choice",
          question: "你愿意加入我，一起打破黄渡游戏公司的统治吗？",
          options: ["是", "否"],
          hidden: true,
          index: '8-4'
        },
        {
          type: "single-choice",
          question: "利用了黄渡游戏公司的仿真技术后，以下不可能会发生的是？",
          options: ["小红作为管理员去吃了一顿海底捞，整个游戏世界都有火锅味", 
          "小强退出游戏后去坐地铁，游戏中的人物也在坐地铁", 
          "小白换了chiikawa主题的手机壳后，黄渡公司的游戏中也有了chiikawa主题", 
          "小黑在游戏中买了一辆法拉利，现实中也有了一辆法拉利"],
          hidden: false,
          index: '9'
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司的核心理念是什么？",
          options: ["无限未来，与你共创", "用心创造快乐", "知人者智，识人者明", "以人为本，创造未来"],
          hidden: false,
          index: '10'
        },
        {
          type: "multiple-choice",
          question: "以下哪些属于黄渡游戏公司的核心技术",
          options: ["AI应用技术", "全平台支持", "区块链技术", "云计算技术", "超真实游戏体验"],
          hidden: false,
          index: '11'
        },
        {
          type: "fill-in-the-blank",
          question: "在黄渡公司推出的超真实游戏体验中，小红从上午7点玩到了晚上10点，那么游戏时间经过了多少小时？",
          hidden: false,
          index: '12'
        },
        {
          type: "single-choice",
          question: "请选择你的意向岗位",
          options: ["角色设计师", "数据工程师", "游戏测试工程师"],
          hidden: false,
          index: '13'
        },
        {
          type: "multiple-choice",
          question: "以下哪些属于黄渡公司的产品？",
          options: ["黄渡方块", "黄渡连连看", "幻想征途", "极限竞速", "黄渡大冒险", "黄渡飞车"],
          hidden: false,
          index: '14'
        },
        {
          type: "fill-in-the-blank",
          question: "请输入你的姓名",
          hidden: false,
          index: '15'
        },
        {
          type: "image-upload",
          question: "请上传你的个人照片",
          hidden: false,
          index: '16'
        },
      ],
    };
  },
  created() {
    // 根据题目类型初始化答案数组
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].type === "multiple-choice") {
        this.answers.push([]);
      } else {
        this.answers.push(undefined);
      }
      this.questions[i].warning = false;
    }

    // this.answers = new Array(this.questions.length).fill(undefined);
  },
  computed: {
    uploadUrl() {
      return `${process.env.VUE_APP_API_BASE_URL}/api/upload`;
      // return "https://huangdu-backend.vercel.app/api/upload";
    },
    submitUrl() {
      return `${process.env.VUE_APP_API_BASE_URL}/api/validateAnswers`;
    },
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    progressPercentage() {
      return Math.round(
        ((this.currentQuestionIndex + 1) / this.questions.length) * 100
      );
    },
    isAnswered() {
      const answer = this.answers[this.currentQuestionIndex];
      if (this.currentQuestion.type === "single-choice") {
        return answer !== undefined && answer !== "";
      } else if (this.currentQuestion.type === "multiple-choice") {
        return Array.isArray(answer) && answer.length > 0;
      } else if (this.currentQuestion.type === "fill-in-the-blank") {
        return answer !== undefined && answer.trim() !== "";
      } else if (this.currentQuestion.type === "image-upload") {
        return answer !== undefined && answer !== null;
      }
      return false;
    },
  },
  methods: {
    nextQuestion() {
      var isHiddenProblem = this.questions[this.currentQuestionIndex].hidden;
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        // 如果当前不是隐藏问题，且下一个问题是隐藏问题，则跳过隐藏问题
        while (!isHiddenProblem && this.currentQuestion.hidden) {
          this.currentQuestionIndex++;
        }
      }
      if (this.currentQuestion.warning) {
        this.currentQuestion.warning = false;
      }
      // 更新进度条百分比 
      this.progress = this.progressPercentage;
      console.log('progress', this.progress, 'percentage', this.progressPercentage);
      // 更新currentQuestionIndexInNav
      this.currentQuestionIndexInNav = Number(this.questions[this.currentQuestionIndex].index) - 1;
    },
    goToQuestion(index) {
      // 获取quetions.index = index 在questions中的索引
      // console.log("index", index);
      this.currentQuestionIndex = this.questions.findIndex(
        (question) => question.index === String(index + 1)
      );
      this.currentQuestionIndexInNav = index;
      if (this.currentQuestion.warning) {
        this.currentQuestion.warning = false;
      }
      // 更新进度条百分比 
      this.progress = this.progressPercentage;

      // console.log("this.currentQuestionIndex", this.currentQuestionIndex);
    },
    handleImageUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$set(this.answers, this.currentQuestionIndex, e.target.result);
      };
      reader.readAsDataURL(file.raw);
    },
    submitSurvey() {
      // 校验是否所有问题都已回答，不校验隐藏问题, 并将对应warning置为true
      let isAllAnswered = true;
      for (let i = 0; i < this.questions.length; i++) {
        if (!this.questions[i].hidden) {
          // 多选题的情况
          if (this.questions[i].type === "multiple-choice") {
            if (this.answers[i].length === 0) {
              this.questions[i].warning = true;
              isAllAnswered = false;
            }
          } else {
            if (this.answers[i] === undefined || this.answers[i].trim() === "") {
              console.log("i", i);
              this.questions[i].warning = true;
              isAllAnswered = false;
            }
          }
        }
      }
      // 最后一个问题的warning
      this.questions[this.questions.length - 1].warning = false;
      // 强制更新组件状态
      this.questions = [...this.questions];
      // 第19题和第20题必须填写
      if (this.answers[18] === undefined || this.answers[18].trim() === "") {
        this.$message.error("请填写姓名！");
        return
      }
      if (this.answers[19] === undefined || this.answers[19] === null) {
        this.$message.error("请上传个人照片！");
        return
      }
      if (!isAllAnswered) {
        this.$message.error("你没有完成全部的题目哦，这样无法通过我们的测试！");
        // return;
      }
      console.log("提交问卷答案：", this.answers);
      this.endSituation = -1;
      // 提交答案到后端
      axios
        .post(this.submitUrl, { answers: this.answers })
        .then((response) => {
          // console.log("提交成功：", response.data);
          const results = response.data.results;
          console.log(results)
          this.$message.success("提交成功！");
          // 如果长度为20，则说明进入普通模式
          if (results.length === 20) {
            // 计算正确数
            this.correctNumber = 0
            for (let i = 0; i < results.length; i++) {
              if (results[i].correct) {
                this.correctNumber++;
              }
            }
            if (this.correctNumber == 14) {
              this.endSituation = 1;
            } else{
              this.endSituation = 0;
            }
            
            
            // this.$router.push({ name: "NormalResult", params: { results } });
          } else {
            // 判断9-12题，也就是隐藏题目是否全部正确
            let isAllCorrect = true;
            for (let i = 0; i < results.length; i++) {
              if (!results[i].correct) {
                isAllCorrect = false;
                break;
              }
            }
            if (isAllCorrect) {
              this.endSituation = 3;
            } else {
              this.endSituation = 2;
            }
            // this.$router.push({ name: "SpecialResult", params: { results } });
          }
          this.currentQuestionIndex = this.questions.length;
          this.currentQuestionIndexInNav = -1;
        })
        .catch((error) => {
          console.error("提交失败：", error);
          this.$message.error("提交失败，请重试！");
        })
      // 发送到
      this.currentQuestionIndex++;
    },

    // 图片上传相关
    /**
     * 上传成功的回调
     * @param {Object} response - 后端返回的响应数据
     * @param {File} file - 上传的文件对象
     */
     handleAvatarSuccess(response, file) {
      console.log(file)
      if (response.url) {
        this.answers[this.currentQuestionIndex] = response.url;
        console.log('图片上传成功，URL:', response.url);
        this.$message.success('图片上传成功！');
      } else {
        this.$message.error('上传失败：未返回图片 URL');
      }
      // 强制更新组件状态
      this.answers = [...this.answers];
    },
    
    /**
     * 上传错误的回调
     * @param {Object} err - 错误对象
     * @param {File} file - 上传的文件对象
     * @param {Array} fileList - 文件列表
     */
    handleUploadError(err, file, fileList) {
      console.log(file, fileList)
      console.error('上传失败:', err);
      this.$message.error('图片上传失败，请重试！');
    },
    
    /**
     * 上传前的钩子，进行文件类型和大小的验证
     * @param {File} file - 上传的文件对象
     * @returns {Boolean} - 是否允许上传
     */
    beforeAvatarUpload(file) {
      const isImage = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
      if (!isImage) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!');
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isImage && isLt5M; // 返回 true 允许上传，否则阻止上传
    },


    // 开始拖拽
    startDragging(event) {
      console.log("开始拖拽", event);
      this.isDragging = true;
      this.startX = event.clientX; // 记录拖拽开始的 X 坐标
      this.startY = event.clientY; // 记录拖拽开始的 Y 坐标
      this.startProgress = this.progress; // 记录拖拽开始时的进度
      this.updateProgress(event); // 初始时更新进度
    },
    // 拖拽时调整进度
    dragProgress(event) {
      if (this.isDragging) {
        this.updateProgress(event); // 更新进度
      }
    },
    // 停止拖拽
    stopDragging(event) {
      if (this.isDragging) {
        this.isDragging = false; // 取消拖拽状态

        const deltaX = Math.abs(event.clientX - this.startX);
        const deltaY = Math.abs(event.clientY - this.startY);
        const totalDisplacement = Math.sqrt(deltaX ** 2 + deltaY ** 2); // 计算位移距离

        if (totalDisplacement > 10) {
          console.log("拖拽完成，当前进度：", this.progress);
          this.triggerFunction(this.progress); // 触发相关函数
        } else {
          console.log("拖拽取消");
          this.progress = this.startProgress; // 恢复进度
        }
       
      }
    },
    updateProgress(event) {
      // 如果当前位置和开始位置相同，不更新进度
      if (event.clientX === this.startX && event.clientY === this.startY) {
        return;
      }

      {
        const deltaX = Math.abs(event.clientX - this.startX);
        const deltaY = Math.abs(event.clientY - this.startY);
        const totalDisplacement = Math.sqrt(deltaX ** 2 + deltaY ** 2); // 计算位移距离
        // 如果位移距离小于 10，不更新进度
        if (totalDisplacement < 10) {
          return;
        }
      }
      
      const progressBar = event.target.getBoundingClientRect(); // 获取进度条边界
      const centerX = progressBar.left + progressBar.width / 2; // 圆心 X 坐标
      const centerY = progressBar.top + progressBar.height / 2; // 圆心 Y 坐标

      // 鼠标相对于圆心的偏移
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      // 计算角度，atan2 返回值范围为 [-PI, PI]，我们需要转换为 [0, 360]
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // 转换为角度

      // 调整角度范围，使正上方为 0 度
      angle = (angle + 360 + 90) % 360; // 加 90 度，使正上方为 0 度

      // 根据调整后的角度计算进度百分比
      this.progress = Math.round((angle / 360) * 100);
      
    },
    // 触发对应函数
    triggerFunction(value) {
      console.log("当前进度：", value);
      // 根据progress计算在questions中的index
      const index = Math.round((value / 100) * this.questions.length);
      // 设置题号 
      this.currentQuestionIndex = index;
      // 更新currentQuestionIndexInNav
      if (this.questions[index].hidden) {
        this.currentQuestionIndexInNav = -1; // 不对应题号导航
      } else {
        this.currentQuestionIndexInNav = Number(this.questions[index].index) - 1;
      }

    },
  },
};
</script>


<style scoped>
.survey {
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

.navigation {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.nav-item {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
}

.nav-item.active {
  background-color: #409eff;
  color: white;
}

.progress-bar {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.header {
  background-color: white; 
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  margin-left: 0;
  margin-bottom: 30px;
}

/* 隐藏问题，背景改为黑色，字体颜色改为白色 */
.hidden {
  background-color: black;
  color: white;
}
</style>