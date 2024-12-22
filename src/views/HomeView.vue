<template>
  <div id="app">
    <AdPop />
    <!-- 页面标题 -->
    <header class="header">
      <h1>黄渡游戏公司宣传网页</h1>
      <p>探索黄渡游戏的精彩世界，了解我们的团队与创新精神！</p>
    </header>

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

    <!-- 评论区 -->
    <el-card class="comment-section" shadow="always">
      <h3>评论区</h3>
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
      comments: [
        {
          id: 1,
          avatar: "avatar1.png",
          nickname: "可爱多",
          date: "2024-12-01",
          text: "黄渡游戏公司真不错！",
          identity: "员工",
          signature: "热爱创新的开发者",
          final: "我不要进入游戏世界!",
        },
        {
          id: 2,
          avatar: "avatar2.png",
          nickname: "柏林人",
          date: "2024-12-02",
          text: "这里的团队很棒！",
          identity: "员工",
          signature: "专注技术的梦想家",
          final: "不！不要....",
        },
        {
          id: 3,
          avatar: "avatar3.png",
          nickname: "你好",
          date: "2024-12-03",
          text: "创新驱动，超有趣！",
          identity: "员工",
          signature: "未来科技的探路者",
          final: "我的天啊！我的天啊！！！！"
        },
        {
          id: 4,
          avatar: "avatar4.png",
          nickname: "rene",
          date: "2024-12-04",
          text: "很高兴能在这里工作。",
          identity: "员工",
          signature: "有趣游戏的创造者",
          final: "不不不不不不不..."
        },
        {
          id: 5,
          avatar: "avatar5.png",
          nickname: "Joe",
          date: "2024-12-05",
          text: "氛围超棒，推荐！",
          identity: "员工",
          signature: "热爱团队协作",
          final: "???????"
        },
        {
          id: 6,
          avatar: "avatar6.png",
          nickname: "小尚",
          date: "2024-12-06",
          text: "未来可期的公司！",
          identity: "员工",
          signature: "专注成长与未来",
          final: "这都是阴谋！"
        },
        {
          id: 7,
          avatar: "avatar7.png",
          nickname: "Oliver",
          date: "2024-12-07",
          text: "愿公司越来越好！",
          identity: "员工",
          signature: "黄渡的忠实粉丝",
          final: "终于轮到我了吗？"
        },
        {
          id: 8,
          avatar: "avatar8.png",
          nickname: "舔狗",
          date: "2024-12-08",
          text: "黄渡游戏让我成长很多！",
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
}

.video-container {
  margin: 0 auto;
  width: 80%;
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
  margin-bottom: 10px;
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
</style>