<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{ 'current': isActive == item.current }" @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>
      <!-- form -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="form-item">
          <label>手机号</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passWord" class="form-item">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.passWord" autocomplete="off" minlength="6" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item prop="repassWord" class="form-item" v-if="menuTab[1].current">
          <label>重复密码</label>
          <el-input type="text" v-model="ruleForm.repassWord" autocomplete="off" minlength="6" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="form-item">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="warning" class="block">获取验证码</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('ruleForm')" class="login-btn block" plain>提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validateTel,
  validatePwd,
  validateCode
} from '@/utils/validate'
export default {
  name: 'login',
  data() {
    // 验证码
    var checkCode = (rule, value, callback) => {
      this.ruleForm.code = stripscript(value)
      value = this.ruleForm.code
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else if (validateCode(value)) {
        return callback(new Error('验证码格式有误'))
      } else {
        callback()
      }
    }
    // 验证用户
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (validateTel(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback()
      }
    }
    // 验证密码
    var validatePassWord = (rule, value, callback) => {
      this.ruleForm.passWord = stripscript(value)
      value = this.ruleForm.passWord

      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatePwd(value)) {
        callback(new Error('密码为6-12位的字母与数字组合'))
      } else {
        callback()
      }
    }

    // 验证重复密码
    var validateRePassWord = (rule, value, callback) => {
      this.ruleForm.repassWord = stripscript(value)
      value = this.ruleForm.repassWord

      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value != this.ruleForm.passWord) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      menuTab: [
        { txt: '登录', current: true },
        { txt: '注册', current: false }
      ],
      isActive: 1,
      ruleForm: {
        username: '',
        passWord: '',
        repassWord: '',
        code: ''
      },
      rules: {
        username: [{ validator: validateUser, trigger: 'blur' }],
        passWord: [{ validator: validatePassWord, trigger: 'blur' }],
        repassWord: [{ validator: validateRePassWord, trigger: 'blur' }],
        code: [{ validator: checkCode, trigger: 'blur' }]
      }
    }
  },
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(elem => {
        elem.current = false
      })
      data.current = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
#login {
  width: 100vw;
  height: 100vh;
  // background: #5cbec1;
  background-image: url('../../assets/login-bg.jpg');
  background-size: cover;
  background-position: 50%;

  .login-wrap {
    width: 330px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .menu-tab {
      text-align: center;

      li {
        display: inline-block;
        width: 88px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
      }
      .current {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
.login-form {
  margin-top: 29px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 20px;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
  .form-item {
    margin-bottom: 13px;
  }
  .block {
    width: 100%;
    display: block;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>