<template>
  <div id="app" 
  :style="{
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${require('@/assets/background.png')})`,
    backgroundRepeat: 'repeat-y', // 垂直方向重复
    backgroundSize: '100% auto', // 宽度为 100%，高度保持比例
    backgroundPosition: 'top center', // 居中对齐
  }">
    <AdPop />
    <!-- 页面标题 -->
    <header class="header">
     <!--显示logo和公司名称-->
      <img
        src="@/assets/logo.png"
        alt="logo"
        style="width: 100px; height: 100px; border-radius: 50%;"
      />
      <h1>黄渡游戏公司</h1>
      <p>无限未来，与你共创！</p>
    </header>

    <div class="text-display">
      <h2>
        <i class="el-icon-info"></i> &nbsp;公司介绍</h2>
      <p>
        <span>黄渡游戏公司（Huangdu Game Studio）成立于2019年，总部位于黄渡市，是一家专注于开发创新型互动娱乐产品的游戏公司。
        </span>
      </p>
      <!-- <button @click="changeText">更改文字</button> -->
      <el-divider></el-divider>

      <h2>
        <i class="el-icon-s-order"></i> &nbsp;公司历史</h2>
      <p>
        <span>公司致力于将艺术与技术结合，通过创意和精益求精的开发，为全球玩家提供极致的娱乐体验。从休闲游戏到大型多人在线角色扮演游戏（MMORPG），黄渡游戏公司在游戏行业内已建立了广泛的声誉。

        </span>
        <span>自成立以来，公司秉承“用心创造快乐”的核心理念，以玩家体验为中心，不断突破传统游戏开发的界限。目前，黄渡游戏公司已推出多款口碑与市场双赢的游戏产品，在中国及海外市场积累了数千万用户，成为业内备受瞩目的新兴力量。</span>
      </p>

      <h2>
        <i class="el-icon-s-custom"></i> &nbsp;公司文化</h2>
        <p>
          <el-collapse>
    <el-collapse-item
      v-for="item in collapseItems"
      :key="item.name"
      :name="item.name"
    >
      <!-- 自定义标题插槽 -->
      <template v-if="item.hasImage" #title>
        <div class="collapse-item-header">
          <el-image
            :src="item.imageSrc"
            class="collapse-item-image"
            :preview-src-list="[]"
          ></el-image>
          <span class="collapse-item-title">{{ item.title }}</span>
        </div>
      </template>
      
      <!-- 正常标题 -->
      <template v-else #title>
        {{ item.title }}
      </template>

      <!-- 内容部分 -->
      <div v-if="item.contentType === 'text'">
        <p v-for="(paragraph, index) in item.content" :key="index">
          {{ paragraph }}
        </p>
      </div>
      <div v-else-if="item.contentType === 'list'">
        <ul>
          <li v-for="(point, index) in item.content" :key="index">{{ point }}</li>
        </ul>
      </div>
    </el-collapse-item>
  </el-collapse>
             </p>
        
      <h2>
        <i class="el-icon-trophy"></i>&nbsp;公司游戏
      </h2>
      <!--缩放页面-->
      <iframe src="https://wangwangwang.website/huangdu-memory-game/" width="100%" height="700px"></iframe>
      <p>
        <del>黄渡方块是经典的益智消除游戏，结合了丰富的创意关卡和竞技玩法，深受各年龄段玩家喜爱。在这里，体验一下我们的小游戏吧～</del>
      </p>
      <p>
        <del>荣获“最佳休闲游戏”称号，并成为国内外热门手游。</del>
      </p>
      <p style="color: red">黄渡游戏有问题！他们官网已经被我黑掉了，现在我正在全面掌控这个网页!</p>
      <p style="color: red;">我也是黄渡公司的员工，刚从公司逃走！他们正在派人抓捕我！</p>
      <p style="color: red">如果你看到了，赶紧过来找我！赶紧过来找我！赶紧过来找我！</p>
    </div>

    <el-container>
      <el-main>
            <!-- 视频播放器 -->
            <div class="video-container">
              <video
                ref="video"
                class="video-player"
                :src="require('@/assets/video.mp4')"
                controls
                @timeupdate="checkVideoTime"
                @dragover.prevent
                @drop="onDrop"
              ></video>
            </div>
      </el-main>
      <el-aside width="400px">
         <!-- 卡片 -->
          <el-card shadow="always" style="margin-top: 30px;">
            <h3>黄渡游戏公司</h3>
            <img
              :src="require('@/assets/logo.png')"
              alt="logo"
              style="width: 100px; height: 100px; border-radius: 50%;"
            />

    
            <el-progress :percentage="progress" :format="format" color="#5cb87a"></el-progress>
            <p>我们永远的态度：</p>
            <img
              src="@/assets/culture/robot.png"
              alt="logo"
              style="width: 100px; height: 100px; border-radius: 50%;"
            />
            <img
              src="@/assets/culture/eye-care.png"
              alt="logo"
              style="width: 100px; height: 100px; border-radius: 50%;"
            />
            <img
              src="@/assets/culture/happy-face.png"
              alt="logo"
              style="width: 100px; height: 100px; border-radius: 50%;"
            />
            <div style="margin-top: 10px;">
              <span>
                <i class="el-icon-location"></i> &nbsp;
                公司地点：黄渡游戏公司地铁站2号口</span>
            </div>
          </el-card>

      </el-aside>
    </el-container>

    <el-card class="comment-section" shadow="always">
          <h3><i class="el-icon-s-comment"></i> &nbsp;评论区</h3>
          <div class="comments">
            <div
              v-for="(comment, index) in comments"
              :key="index"
              class="comment"
            >
              <el-popover
                trigger="hover"
                placement="top"
                width="200"
              >
                <div class="popover-content">
                  <img
                    :src="require(`@/assets/avatars/${comment.avatar}`)"
                    alt="avatar"
                    class="popover-avatar"
                  />
                  <p class="popover-nickname">{{ comment.nickname }}</p>
                  <el-tag
                    :type="comment.identity === '员工' ? 'success' : 'info'"
                    class="popover-identity"
                  >
                    {{ comment.identity }}
                  </el-tag>
                  <p class="popover-signature">{{ comment.signature }}</p>
                </div>
                <template #reference>
                  <img
                    :src="require(`@/assets/avatars/${comment.avatar}`)"
                    alt="avatar"
                    class="avatar"
                    @dragstart="onDragStart(comment.id)"
                  />
                </template>
              </el-popover>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.nickname }}</span>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <span class="comment-date">{{ comment.date }}</span>
                </div>
                <div class="comment-text">{{ comment.text }}</div>
              </div>
            </div>
          </div>
          <div class="add-comment">
            <el-input
              v-model="newComment"
              placeholder="输入你的评论"
              :disabled="hasCommented"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
            ></el-input>
            <el-button
              type="primary"
              @click="addComment"
              :disabled="hasCommented"
            >
              评论
            </el-button>
          </div>
    </el-card>

   
  </div>
</template>

<script>
import AdPop from '@/components/AdPop.vue';

export default {
  data() {
    return {
      activeNames: ['1'],
      progress: 0,
      collapseItems: [
        {
          name: '1',
          title: '以人为本',
          hasImage: true,
          imageSrc: require('@/assets/culture/robot.png'),
          contentType: 'text',
          content: [
            '黄渡游戏公司坚信，每一款成功的游戏都离不开团队的全身心投入。我们为每一位员工提供深入角色的机会，让他们真正融入产品的每一个细节，力求在职业成长与角色平衡中找到最优解。',
          ],
        },
        {
          name: '2',
          title: '创意驱动',
          hasImage: true,
          imageSrc: require('@/assets/culture/eye-care.png'),
          contentType: 'text',
          content: [
            '我们坚信，真正的创新源于对全局的掌控和对细节的洞察。公司利用先进的数据整合与感知技术，确保在产品开发中始终掌握每一个关键变量。无论是游戏内的动态变化还是现实中的反馈信息，都能被系统精准捕捉，为创新提供可靠的支持。',
          ],
        },
 
        {
          name: '3',
          title: '玩家至上',
          hasImage: true,
          imageSrc: require('@/assets/culture/happy-face.png'),
          contentType: 'text',
          content: [
            '玩家体验是黄渡游戏的核心，但我们坚信，理解玩家比改变产品更重要。公司不仅倾听玩家心声，更从中主动发现深层次需求。我们的目标是让每一位玩家都成为系统的一部分，在与产品的交互中达到无缝融合。',
          ],
        },
      ],
      comments: [
        {
          id: 1,
          avatar: "avatar1.png",
          nickname: "可爱多",
          date: "2024-12-01",
          text: "AI技术应用让黄渡公司一跃成为榜首，这也得益于我们团队成员的不懈努力。我们推出了最新的仿真技术，游戏中的人物形象会随着主控玩家现实环境的变化而变化。欢迎各位用户体验～",
          identity: "员工",
          signature: "计算机的世界里没有感情",
          final: "我不要进入游戏世界!",
        },
        {
          id: 2,
          avatar: "avatar2.png",
          nickname: "梦想家",
          date: "2024-12-02",
          text: "我们部门福利也太棒了！每天都提供半糖村饭店打包的精美甜品～这下打工也动力满满了",
          identity: "员工",
          signature: "美好的一天从一杯啤酒开始！",
          final: "不！不要....",
        },
        {
          id: 3,
          avatar: "avatar3.png",
          nickname: "半糖小子",
          date: "2024-12-03",
          text: "创新驱动，超有趣！我们公司真的是一直在利用先进的数据整合与感知技术，确保在产品开发中始终掌握每个关键变量。",
          identity: "员工",
          signature: "梦中的梦中，梦中人的梦...",
          final: "我的天啊！我的天啊！！！！"
        },
        {
          id: 4,
          avatar: "avatar4.png",
          nickname: "rene",
          date: "2024-12-04",
          text: "我们部门招聘角色设计师啦～薪资丰厚，无任何学历要求，社会关系简单者优先！感兴趣联系我！",
          identity: "员工",
          signature: "有趣游戏的创造者",
          final: "不不不不不不不..."
        },
        {
          id: 5,
          avatar: "avatar5.png",
          nickname: "Joe",
          date: "2024-12-05",
          text: "仿真技术疑似有些过于先进。我今天让同事帮我修改bug，修完忘记关他权限了，然后他晚上去唱K。结果整个游戏世界今天都是各种奇怪的歌声...",
          identity: "员工",
          signature: "发生什么事了，怎么今天都不给开车了啊",
          final: "???????"
        },
        {
          id: 6,
          avatar: "avatar6.png",
          nickname: "小尚",
          date: "2024-12-06",
          text: "黄渡方块真的有意思，我又玩到了凌晨四五点！",
          identity: "员工",
          signature: "专注成长与未来",
          final: "这都是阴谋！"
        },
        {
          id: 7,
          avatar: "avatar7.png",
          nickname: "Oliver",
          date: "2024-12-07",
          text: "我们部门已经将把游戏和影片都对接了仿真技术，后续还要开发随手机壳变化的软件主题呢，哈哈",
          identity: "员工",
          signature: "黄渡的忠实粉丝",
          final: "终于轮到我了吗？"
        },
        {
          id: 8,
          avatar: "avatar8.png",
          nickname: "舔狗",
          date: "2024-12-08",
          text: "黄渡游戏让我成长很多！他给了我去德国柏林研究学习的机会，我还在那里品尝到了最美味的啤酒～",
          identity: "员工",
          signature: "学习与进步的同行者",
          final: "你在干什么！我说你在干什么！"
        }
      ],
      draggedCommentId: null,
      videoInRange: false, // 是否在触发时间区间内
      newComment: "", // 新评论内容
      hasCommented: false, // 标记是否已评论
      deleteNumber: 0,
    };
  },
  components: {
    AdPop,
  },
  methods: {
    // 添加新评论
    addComment() {
      if (this.newComment.trim() === "") {
        this.$message.error("评论内容不能为空！");
        return;
      }
      // 长度必须大于20
      if (this.newComment.trim().length < 20) {
        this.$message.error("评论内容不能少于20个字符！");
        return;
      }

      const newComment = {
        id: this.comments.length + 1,
        avatar: "default_avatar.png", // 默认头像
        nickname: "游客", // 默认昵称
        date: new Date().toISOString().split("T")[0], // 当前日期
        text: this.newComment.trim(),
        identity: "游客",
        signature: "热爱游戏的玩家",
        final: '看来，最后只能我自己进去了...'
      };

      this.comments.push(newComment);
      this.hasCommented = true; // 禁用评论按钮
      this.newComment = ""; // 清空输入框

      this.$message.success("评论成功！");
    },
    // 检查视频播放时间
    checkVideoTime() {
      const currentTime = this.$refs.video.currentTime;
      this.videoInRange = currentTime >= 51 && currentTime <= 57;
    },

    // 记录被拖拽的评论 ID
    onDragStart(commentId) {
      this.draggedCommentId = commentId;
    },

    // 处理头像拖放到视频的逻辑
    onDrop() {
      console.log(this.videoInRange, this.draggedCommentId);
      if (this.videoInRange && this.draggedCommentId !== null) {
        // 存储对应评论的final
        const final = this.comments.find(
          (comment) => comment.id === this.draggedCommentId
        ).final;
        // 删除对应的评论
        this.comments = this.comments.filter(
          (comment) => comment.id !== this.draggedCommentId
        );
        this.$message.error(final);
        this.draggedCommentId = null; // 清空拖拽状态
        this.deleteNumber += 1;
        if (this.progress < 80) {
          this.progress += 10;
        } else {
          this.progress = 100;
        }
        this.updateDeleteStatus();
      } else {
        return
        // this.$message.error("请在视频播放到30～32s时拖动头像！");
      }
    },

    // 更新删除状态
    updateDeleteStatus() {
      const videoElement = this.$refs.video; // 获取 video 元素的引用
  if (this.deleteNumber > 0) {
    const rate = this.deleteNumber + 1;
    videoElement.playbackRate = rate; // 设置视频播放速度

    // 尝试设置 preservesPitch 以保持音调不变
    if ('preservesPitch' in videoElement) {
      videoElement.preservesPitch = false;
    } else if ('mozPreservesPitch' in videoElement) { // Firefox
      videoElement.mozPreservesPitch = false;
    } else if ('webkitPreservesPitch' in videoElement) { // Safari 和旧版 Chrome
      videoElement.webkitPreservesPitch = false;
    } else {
      // console.warn('当前浏览器不支持保持音调的播放设置。');
    }
  } else {
    // 如果 deleteNumber <= 0，可以重置为默认播放速度并关闭保持音调
    videoElement.playbackRate = 1;
    if ('preservesPitch' in videoElement) {
      videoElement.preservesPitch = false;
    } else if ('mozPreservesPitch' in videoElement) { // Firefox
      videoElement.mozPreservesPitch = false;
    } else if ('webkitPreservesPitch' in videoElement) { // Safari 和旧版 Chrome
      videoElement.webkitPreservesPitch = false;
    }
  }
    },

    format() {
        return "";
      }


  },
};
</script>

<style>
/* 样式 */
#app {
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}


.header {
  text-align: center;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  width: 30%;
  margin-left: 35%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.video-container {
  margin: 0 auto;
  width: 90%;
  text-align: center;
}

.video-player {
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 10px;
}

.comment-author {
  font-weight: bold;
}

.comment-section {
  margin: 20px auto;
  width: 80%;
  margin-top: 50px !important;
}

.add-comment {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  gap: 10px;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.comment-text {
  font-size: 1.1em;
  text-align: left;
}

.comment {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 15px;
}

.popover-content {
  text-align: center;
}

.popover-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* margin-bottom: 10px; */
}

.popover-nickname {
  font-size: 1em;
  font-weight: bold;
}

.popover-identity {
  margin: 5px 0;
}

.popover-signature {
  font-size: 0.9em;
  color: #666;
}

.text-display {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px 30px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;
}

.text-display h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #2c3e50;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 10px;
}

.text-display p {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 20px;
}

.text-display p span {
  display: block;
  margin-bottom: 15px;
}

.collapse-item-header {
  display: flex;
  align-items: center;
}

.collapse-item-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.collapse-item-title {
  font-size: 1.2em;
  font-weight: bold;
}

.logo-container {
  position: relative;
  display: inline-block;
  margin: 20px 0;
}

.logo-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: block;
  position: relative;
  z-index: 2; /* 确保图片在进度条之上 */
}

.company-card {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center; /* 居中对齐内容 */
}


</style>