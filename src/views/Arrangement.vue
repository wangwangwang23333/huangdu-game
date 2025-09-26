<template>
  <div class="arrangement-container">
    <!-- 漂浮数字背景 -->
    <div class="floating-numbers">
      <span v-for="n in 200" :key="n" class="floating-digit" :style="getRandomPosition()">
        {{ Math.random() > 0.5 ? '0' : '1' }}
      </span>
    </div>
    
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>公司排行榜</h1>
      <p>查看各项排名统计</p>
    </div>

    <!-- 排行榜容器 -->
    <div class="leaderboard-container">
      <!-- 工作时长排行榜 -->
      <el-card class="leaderboard-card" shadow="hover">
        <div slot="header" class="card-header">
          <i class="el-icon-time"></i>
          <span>最长连续工作时间</span>
        </div>
        <div class="leaderboard-content">
          <div
            v-for="(item, index) in workTimeRanking"
            :key="item.id"
            class="ranking-item"
            :class="getRankingClass(index)"
          >
            <div class="ranking-number">
              <span v-if="index < 3" class="medal">{{ getMedal(index) }}</span>
              <span v-else class="number">{{ index + 1 }}</span>
            </div>
            <div class="ranking-info">
              <div class="user-id">{{ item.id }}</div>
              <div class="ranking-value">{{ item.hours}}小时</div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 节能排行榜 -->
      <el-card class="leaderboard-card" shadow="hover">
        <div slot="header" class="card-header">
          <i class="el-icon-sunny"></i>
          <span>最佳公司狗</span>
        </div>
        <div class="leaderboard-content">
          <div
            v-for="(item, index) in energySavingRanking"
            :key="item.id"
            class="ranking-item"
            :class="getRankingClass(index)"
          >
            <div class="ranking-number">
              <span v-if="index < 3" class="medal">{{ getMedal(index) }}</span>
              <span v-else class="number">{{ index + 1 }}</span>
            </div>
            <div class="ranking-info">
              <div class="user-id">{{ item.id }}</div>
              <div class="ranking-value">{{ item.score }}分</div>
            </div>
          </div>
        </div>
      </el-card>

      <!-- 入职排行榜 -->
      <el-card class="leaderboard-card" shadow="hover">
        <div slot="header" class="card-header">
          <i class="el-icon-user-solid"></i>
          <span>连续驻守公司天数</span>
        </div>
        <div class="leaderboard-content">
          <div
            v-for="(item, index) in newEmployeeRanking"
            :key="item.id"
            class="ranking-item"
            :class="getRankingClass(index)"
          >
            <div class="ranking-number">
              <span v-if="index < 3" class="medal">{{ getMedal(index) }}</span>
              <span v-else class="number">{{ index + 1 }}</span>
            </div>
            <div class="ranking-info">
              <div class="user-id">{{ item.id }}</div>
              <div class="ranking-value">{{ item.days }}天</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArrangementView',
  data() {
    return {
      // 工作时长排行榜数据（11个人）
      workTimeRanking: [
        { id: 'rene', hours: 37 },
        { id: '舔狗', hours: 31 },
        { id: '管理员', hours: 29 },
        { id: 'Joe', hours: 26 },
        { id: '可爱多', hours: 23 },
        { id: 'Joe', hours: 21 },
        { id: '梦想家', hours: 20 },
        { id: '小尚', hours: 19 },
        { id: 'Joe', hours: 17 },
        { id: '可爱多', hours: 14 },
        { id: 'Joe', hours: 13 }
      ],
      // 节能排行榜数据（5个人）
      energySavingRanking: [
        { id: '舔狗', score: 95 },
        { id: '梦想家', score: 88 },
        { id: '梦想家', score: 82 },
        { id: 'rene', score: 75 },
        { id: '舔狗', score: 68 }
      ],
      // 入职排行榜数据（5个人）
      newEmployeeRanking: [
        { id: '可爱多', days: 30 },
        { id: '梦想家', days: 25 },
        { id: 'Joe', days: 20 },
        { id: '小尚', days: 15 },
        { id: 'rene', days: 10 }
      ]
    }
  },
  methods: {
    // 获取排名样式类
    getRankingClass(index) {
      if (index === 0) return 'first-place'
      if (index === 1) return 'second-place'
      if (index === 2) return 'third-place'
      return 'other-place'
    },
    // 获取奖牌图标
    getMedal(index) {
      const medals = ['🥇', '🥈', '🥉']
      return medals[index]
    },
    // 生成随机位置
    getRandomPosition() {
      return {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 20 + 's',
        animationDuration: (Math.random() * 10 + 15) + 's'
      }
    }
  }
}
</script>

<style scoped>
.arrangement-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 漂浮数字背景 */
.floating-numbers {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-digit {
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  animation: float 20s linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  color: white;
  position: relative;
  z-index: 2;
}

.page-header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.page-header p {
  font-size: 1.2em;
  opacity: 0.9;
}

.leaderboard-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.leaderboard-card {
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform-style: preserve-3d;
}

.leaderboard-card:hover {
  transform: translateY(-5px) rotateX(5deg);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.leaderboard-card >>> .el-card__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-bottom: none;
  padding: 25px;
  position: relative;
  overflow: hidden;
}

.leaderboard-card >>> .el-card__header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.leaderboard-card:hover >>> .el-card__header::before {
  left: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.card-header i {
  margin-right: 12px;
  font-size: 1.4em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: pulse 2s ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

.leaderboard-content {
  padding: 15px 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 18px 25px;
  margin: 0 15px 12px 15px;
  border-radius: 15px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.ranking-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s;
}

.ranking-item:hover::before {
  left: 100%;
}

.ranking-item:hover {
  transform: translateX(8px) translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.ranking-item.first-place {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #fff2a6 100%);
  color: #333;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.4);
  border: 2px solid rgba(255, 215, 0, 0.3);
}

.ranking-item.second-place {
  background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 50%, #f5f5f5 100%);
  color: #333;
  box-shadow: 0 4px 20px rgba(192, 192, 192, 0.4);
  border: 2px solid rgba(192, 192, 192, 0.3);
}

.ranking-item.third-place {
  background: linear-gradient(135deg, #cd7f32 0%, #daa520 50%, #f4d03f 100%);
  color: #333;
  box-shadow: 0 4px 20px rgba(205, 127, 50, 0.4);
  border: 2px solid rgba(205, 127, 50, 0.3);
}

.ranking-item.other-place {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%);
  color: #495057;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.ranking-number {
  margin-right: 25px;
  min-width: 45px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.ranking-number .medal {
  font-size: 1.8em;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.ranking-number .number {
  font-size: 1.5em;
  font-weight: bold;
  color: #666;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.ranking-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.ranking-info .user-id {
  font-weight: bold;
  font-size: 1.15em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
}

.ranking-info .ranking-value {
  font-size: 1.3em;
  font-weight: bold;
  color: #007bff;
  text-shadow: 0 1px 2px rgba(0, 123, 255, 0.2);
  padding: 5px 12px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(0, 123, 255, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .arrangement-container {
    padding: 10px;
  }

  .leaderboard-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .page-header h1 {
    font-size: 2em;
  }

  .ranking-item {
    padding: 12px 15px;
  }

  .ranking-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>