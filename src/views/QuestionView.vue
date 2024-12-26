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
        v-for="(question, index) in questions"
        :key="index"
        
        :class="['nav-item', { active: index === currentQuestionIndex }]"
        @click="goToQuestion(index)"
      >
        {{ index + 1 }}
      </el-button>
    </el-row>

    <!-- 问卷内容 -->
    <el-card shadow="hover" v-if="currentQuestionIndex < questions.length">
      <h2>第 {{ currentQuestionIndex + 1 }} 题 / {{ questions.length }}</h2>

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
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        
        <el-upload
          class="upload-demo"
          action=""
          :on-change="handleImageUpload"
          :auto-upload="false"
          :show-file-list="false"
        >
          <el-button slot="trigger" type="primary">上传图片</el-button>
          <div v-if="answers[currentQuestionIndex]">
            <img
              :src="answers[currentQuestionIndex]"
              alt="Uploaded Image"
              style="max-width: 100%; max-height: 200px; margin-top: 10px;"
            />
          </div>
        </el-upload>
      </div>

      <!-- 下一题或提交按钮 -->
      <el-button
        v-if="currentQuestionIndex < questions.length - 1"
        type="primary"
        @click="nextQuestion"
        :disabled="!isAnswered"
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
        <h2>问卷已完成！</h2>
        <p>感谢您的参与！</p>
        <pre>{{ answers }}</pre>
      </el-card>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar">
      <el-progress
        :text-inside="true"
        :stroke-width="20"
        :percentage="progressPercentage"
        type="circle"
        style="width: 200px;"
      />
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestionIndex: 0, // 当前题目索引
      answers: [

      ], // 存储答案
      questions: [
        {
          type: "single-choice",
          question: "你是否信任黄渡公司的公司文化？",
          options: ["是", "否"],
        },
        {
          type: "single-choice",
          question: "你是否愿意全身心投入黄渡公司？",
          options: ["是", "否"],
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司位于黄渡游戏地铁公司地铁站的几号口？",
          options: ["1号口", "2号口", "3号口", "4号口", "5号口"],
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司会将员工派遣学习到哪座城市？",
          options: ["柏林", "东京", "纽约", "巴黎", "伦敦"],
        },
        {
          type: "multiple-choice",
          question: "黄渡游戏公司已经发展出了哪些子公司？",
          options: ["黄渡健身房", "半糖村饭店", "黄渡玩具公司", "黄渡电影公司"],
        },
        {
          type: "multiple-choice",
          question: "黄渡游戏公司的公司文化包括以下哪些？",
          options: ["以人为本", "创新驱动", "团队合作", "玩家至上"],
        },
        {
          type: "single-choice",
          question: "利用了黄渡游戏公司的仿真技术后，以下步可能会发生的是？",
          options: ["小红作为管理员去吃了一顿海底捞，整个游戏世界都有火锅味", 
          "小强退出游戏后去坐地铁，游戏中的人物也在坐地铁", 
          "小白换了chiikawa主题的手机壳后，黄渡公司的游戏中也有了chiikawa主题", 
          "小黑在游戏中买了一辆法拉利，现实中也有了一辆法拉利"],
        },
        {
          type: "single-choice",
          question: "黄渡游戏公司的核心理念是什么？",
          options: ["无限未来，与你共创", "用心创造快乐", "知人者智，识人者明", "以人为本，创造未来"],
        },
        {
          type: "multiple-choice",
          question: "以下哪些属于黄渡游戏公司的核心技术",
          options: ["AI应用技术", "全平台支持", "区块链技术", "云计算技术", "超真实游戏体验"],
        },
        {
          type: "fill-in-the-blank",
          question: "在黄渡公司推出的超真实游戏体验中，小红从上午7点玩到了晚上10点，那么游戏时间经过了多少小时？",
        },
        {
          type: "single-choice",
          question: "请选择你的意向岗位",
          options: ["角色设计师", "数据工程师", "游戏测试工程师"],
        },
        {
          type: "multiple-choice",
          question: "以下哪些属于黄渡公司的产品？",
          options: ["黄渡方块", "黄渡连连看", "幻想征途", "极限竞速", "黄渡大冒险", "黄渡飞车"],
        },
        {
          type: "fill-in-the-blank",
          question: "请输入你的姓名",
        },
        {
          type: "image-upload",
          question: "请上传你的个人照片",
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
    }
    // this.answers = new Array(this.questions.length).fill(undefined);
  },
  computed: {
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
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    goToQuestion(index) {
      this.currentQuestionIndex = index;
    },
    handleImageUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.$set(this.answers, this.currentQuestionIndex, e.target.result);
      };
      reader.readAsDataURL(file.raw);
    },
    submitSurvey() {
      console.log("提交问卷答案：", this.answers);
      this.currentQuestionIndex++;
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
</style>