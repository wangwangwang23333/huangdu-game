<template>
    <div
      class="ad-popup-dialog"
      v-if="visible"
      style="padding: 30px;"
    >
      <!-- 关闭按钮 -->
      <span
        class="close-button"
        @click="visible = false"
      >
        <i class="el-icon-close"></i>
      </span>

      <span>由运营商提供的广告</span>
  
      <!-- 广告轮播 -->
      <el-carousel
        :interval="3000"
        arrow="never"
        height="300px"
        @change="handleChange"
        ref="carousel"
      >
        <el-carousel-item v-for="(image, index) in images" :key="index">
          <el-image
            :src="image"
            style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
            @click="previewImage(image)"
            :preview-src-list="[image]"
            :lazy="false"
          >
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdPopup",
    data() {
      return {
        visible: true, // 控制弹窗显示
        images: [
          require("@/assets/ads/ad1.png"), // 第一张广告图片
          require("@/assets/ads/ad2.png"), // 第二张广告图片
          require("@/assets/ads/ad3.png"), // 第三张广告图片
        ],
      };
    },
    methods: {
      previewImage() {
        // 使用 Element UI 的 Image 组件预览图片
        this.$refs.imagePreview && this.$refs.imagePreview.show();
      },
      handleChange() {
        // 轮播切换时的回调（可选）
        // console.log(`当前广告页: ${index + 1}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* 关闭按钮样式 */
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    z-index: 2; /* 确保关闭按钮在弹窗内容之上 */
    color: #000; /* 初始颜色 */
    transition: color 0.3s;
  }
  
  .close-button:hover {
    color: #ff4949; /* 悬停时颜色变化 */
  }
  
  /* 弹窗定位和样式 */
  .ad-popup-dialog {
    position: fixed; /* 使用固定定位 */
    bottom: 20px; /* 距离底部 20px */
    right: 20px; /* 距离右侧 20px */
    width: 300px; /* 弹窗宽度，可以根据需要调整 */
    max-width: 90%; /* 响应式支持 */
    background-color: #fff; /* 设置白色背景 */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    border-radius: 8px; /* 圆角 */
    padding: 0; /* 移除默认内边距 */
    z-index: 99; /* 设置高 z-index 确保弹窗在最上层 */
  }
  
  /* 确保轮播占满弹窗 */
  .ad-popup-dialog .el-carousel {
    border-radius: 8px;
    overflow: hidden;
  }
  
  /* 移除对话框的标题栏和底部（如果存在） */
  .ad-popup-dialog .el-dialog__header,
  .ad-popup-dialog .el-dialog__footer {
    display: none;
  }
  
  /* 调整对话框内容区域 */
  .ad-popup-dialog .el-carousel__container {
    padding: 0;
  }
  </style>