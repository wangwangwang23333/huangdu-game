<template>
  <div class="survey">
    <h1>问卷填写系统</h1>

    <!-- 题号导航 -->
    <el-row class="navigation" justify="center" style="margin-bottom: 20px;">
      <el-button
        v-for="(question, index) in questions"
        :key="index"
        type="text"
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
        <h3>{{ currentQuestion.question }}</h3>
        <el-radio-group v-model="answers[currentQuestionIndex]" style="width: 100%;">
          <el-radio-button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :label="option"
            style="margin-bottom: 10px; width: 100%;"
          >
            {{ option }}
          </el-radio-button>
        </el-radio-group>
      </div>

      <!-- 多选题 -->
      <div v-if="currentQuestion.type === 'multiple-choice'">
        <h3>{{ currentQuestion.question }}</h3>
        <el-checkbox-group v-model="answers[currentQuestionIndex]" style="width: 100%;">
          <el-checkbox
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :label="option"
            style="margin-bottom: 10px; width: 100%;"
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
        style="width: 200px;"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentQuestionIndex: 0, // 当前题目索引
      answers: {}, // 存储答案
      questions: [
        {
          type: "single-choice",
          question: "单选题：你最喜欢的颜色是什么？",
          options: ["红色", "蓝色", "绿色", "黄色"],
        },
        {
          type: "multiple-choice",
          question: "多选题：请选择你喜欢的水果",
          options: ["苹果", "香蕉", "橙子", "葡萄"],
        },
        {
          type: "fill-in-the-blank",
          question: "填空题：请输入你的名字",
        },
        {
          type: "image-upload",
          question: "图片上传题：请上传你的头像",
        },
      ],
    };
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
</style>