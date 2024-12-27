<!--
调取${process.env.VUE_APP_API_BASE_URL}/api/user API
获取的数据格式为[
{
name: '',
avatar: '',
default: false
}
]
可以选择一条数据，点击设置，调取${process.env.VUE_APP_API_BASE_URL}/api/set?index=0或者选中的下标 API
然后刷新数据
-->

<template>
    <div class="user-selector">
      <h2>选择用户</h2>
  
      <!-- 显示加载状态 -->
      <div v-if="loading" class="loading">
        正在加载...
      </div>
  
      <!-- 显示错误信息 -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
  
      <!-- 显示成功信息 -->
      <div v-if="success" class="success">
        {{ success }}
      </div>
  
      <!-- 用户列表 -->
      <form @submit.prevent="handleSet">
        <div v-for="(user, index) in users" :key="index" class="user-item">
          <input
            type="radio"
            :id="'user-' + index"
            name="selectedUser"
            :value="index"
            v-model="selectedIndex"
          />
          <label :for="'user-' + index">
            <img :src="user.avatar" :alt="user.name" class="avatar" />
            <span>{{ user.name }}</span>
          </label>
          <span v-if="user.default" style="color: blue">（默认）</span>
        </div>
  
        <!-- 设置按钮 -->
        <button type="submit" :disabled="selectedIndex === null || setting">
          {{ setting ? '设置中...' : '设置' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserSelector',
    data() {
      return {
        users: [],           // 存储从 API 获取的用户数据
        selectedIndex: null, // 当前选中的用户下标
        loading: false,     // 数据加载状态
        setting: false,     // 设置操作状态
        error: '',           // 错误信息
        success: '',         // 成功信息
      };
    },
    methods: {
      // 获取用户数据
      async fetchUsers() {
        this.loading = true;
        this.error = '';
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/user`);
          this.users = response.data;
        } catch (err) {
          this.error = '获取用户数据失败，请稍后重试。';
          console.error(err);
        } finally {
          this.loading = false;
        }
      },
      // 设置选中的用户
      async handleSet() {
        if (this.selectedIndex === null) return;
  
        this.setting = true;
        this.error = '';
        this.success = '';
  
        try {
          const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/api/set`, {
            params: { index: this.selectedIndex },
          });
  
          if (response.data && response.data.message) {
            this.success = response.data.message;
          } else {
            this.success = '用户已成功设置。';
          }
  
          // 刷新用户数据
          await this.fetchUsers();
          // 重置选择
          this.selectedIndex = null;
        } catch (err) {
          this.error = '设置用户数据失败，请稍后重试。';
          console.error(err);
        } finally {
          this.setting = false;
        }
      },
    },
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style scoped>
  .user-selector {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .loading,
  .error,
  .success {
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 4px;
  }
  
  .loading {
    background-color: #f0f8ff;
    color: #00008b;
  }
  
  .error {
    background-color: #ffe6e6;
    color: #cc0000;
  }
  
  .success {
    background-color: #e6ffe6;
    color: #006600;
  }
  
  .user-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .user-item input[type='radio'] {
    margin-right: 10px;
  }
  
  .user-item label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }
  
  button {
    padding: 10px 20px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #a0cfff;
    cursor: not-allowed;
  }
  </style>