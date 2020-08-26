<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{ 'current': isActive == item.current }" @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>
      <!-- form -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="form-item">
          <label for="username">用户名</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="passWord" class="form-item">
          <label for="pwd">密码</label>
          <el-input id="pwd" type="password" v-model="ruleForm.passWord" autocomplete="off" minlength="6" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item prop="repassWord" class="form-item" v-if="menuTab[1].current">
          <label for="repwd">重复密码</label>
          <el-input id="repwd" type="password" v-model="ruleForm.repassWord" autocomplete="off" minlength="6" maxlength="12"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="form-item">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="warning" class="block" size="small" @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('loginForm')" class="login-btn block" plain :disabled="loginButtonStatus">{{menuTab[0].current ? '登录':'注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive, ref, isRef, onMounted } from '@vue/composition-api'
import { GetSms, Register, Login } from '@/api/login'
import {
  stripscript,
  validateMail,
  validatePwd,
  validateCode
} from '@/utils/validate'
export default {
  name: 'login',
  setup(props, context) {
    // 验证码
    let checkCode = (rule, value, callback) => {
      ruleForm.code = stripscript(value)
      value = ruleForm.code
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else if (validateCode(value)) {
        return callback(new Error('验证码格式有误'))
      } else {
        callback()
      }
    }
    // 验证用户
    let validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (validateMail(value)) {
        callback(new Error('用户名格式有误'))
      } else {
        callback()
      }
    }
    // 验证密码
    let validatePassWord = (rule, value, callback) => {
      ruleForm.passWord = stripscript(value)
      value = ruleForm.passWord

      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (validatePwd(value)) {
        callback(new Error('密码为6-12位的字母与数字组合'))
      } else {
        callback()
      }
    }
    // 验证重复密码
    let validateRePassWord = (rule, value, callback) => {
      ruleForm.repassWord = stripscript(value)
      value = ruleForm.repassWord

      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value != ruleForm.passWord) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    /* ********************************************* data ***************************************************************** */
    // 基础类型  ref  改值 xx.value
    const model = ref('login')
    const isActive = ref(1)
    const loginButtonStatus = ref(true)
    const timer = ref(null)

    // 对象类型 reactive
    const menuTab = reactive([
      { txt: '登录', current: true, type: 'login' },
      { txt: '注册', current: false, type: 'register' }
    ])
    const ruleForm = reactive({
      username: '12341234123@qq.com',
      passWord: 'aaa111',
      repassWord: '',
      code: ''
    })
    const rules = reactive({
      username: [{ validator: validateUser, trigger: 'blur' }],
      passWord: [{ validator: validatePassWord, trigger: 'blur' }],
      repassWord: [{ validator: validateRePassWord, trigger: 'blur' }],
      code: [{ validator: checkCode, trigger: 'blur' }]
    })
    const codeButtonStatus = reactive({
      status: false,
      text: '获取验证码'
    })

    /* *********************************************声明函数 ***************************************************************** */
    // 切换登陆注册
    const toggleMenu = data => {
      menuTab.forEach(elem => {
        elem.current = false
      })
      model.value = data.type
      data.current = true
      resetFormData()
      clearCountDown()
    }
    // 重置表单数据
    const resetFormData = () => {
      context.refs.loginForm.resetFields()
    }
    // 更新按钮状态
    const updateButtonStatus = params => {
      codeButtonStatus.status = params.status
      codeButtonStatus.text = params.text
    }
    // 获取验证码
    const getSms = () => {
      // 提示
      if (ruleForm.username == '') {
        context.root.$message.error('用户名不能为空！')
        return false
      }
      if (validateMail(ruleForm.username)) {
        context.root.$message.error('用户名格式有误，请重新输入！')
        return false
      }

      // 请求验证码 API
      let reqData = { username: ruleForm.username, module: model }
      // 修改获取验证码状态
      updateButtonStatus({
        status: true,
        text: '发送中'
      })
      // 请求验证码
      GetSms(reqData)
        .then(res => {
          let resData = res.data
          context.root.$message({
            message: resData.message,
            type: 'success'
          })
          // 启用登录，注册按钮
          loginButtonStatus.value = false
          // 调定时器，倒计时
          countDown(60)
        })
        .catch(err => {
          console.log(err)
        })
    }
    // 倒计时
    const countDown = number => {
      // 判断定时器是否存在，存在先清除
      if (timer.value) {
        clearInterval(timer.value)
      }
      let time = number
      timer.value = setInterval(() => {
        time--
        if (time === 0) {
          clearInterval(timer.value)
          updateButtonStatus({
            status: false,
            text: '再次发送'
          })
        } else {
          codeButtonStatus.text = `倒计时${time}秒`
        }
      }, 1000)
    }
    // 清除倒计时
    const clearCountDown = () => {
      updateButtonStatus({
        status: false,
        text: '获取验证码'
      })
      clearInterval(timer.value)
    }
    // 提交表单
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        // 表单验证通过
        if (valid) {
          model.value === 'login' ? login() : register()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    // 登录
    const login = () => {
      let reqData = {
        username: ruleForm.username,
        password: ruleForm.passWord,
        code: ruleForm.code
      }
      context.root.$store
        .dispatch('app/login', reqData)
        .then(res => {
          // 登陆成功页面跳转
          context.root.$router.push({ name: 'Console' })
        })
        .catch(err => {
          '登陆失败'
        })
      // Login(reqData)
      //   .then(res => {
      //     // 登陆成功页面跳转
      //     context.root.$router.push({ name: 'Console' })
      //   })
      //   .catch(err => {
      //     '登陆失败'
      //   })
    }
    // 注册
    const register = () => {
      let reqData = {
        username: ruleForm.username,
        password: ruleForm.passWord,
        code: ruleForm.code,
        module: model.value
      }
      console.log('注册参数：' + reqData.password)
      Register(reqData)
        .then(res => {
          let data = res.data
          context.root.$message({
            message: data.message,
            type: 'success'
          })
          // 模拟注册成功
          toggleMenu(menuTab[0])
          clearCountDown()
        })
        .catch(err => {
          console.log('fail')
        })
    }

    /* *********************************************生命周期 ***************************************************************** */
    onMounted(() => {})

    /* ********************************************* 最后声明的对象/方法全部 return 出去 ******************************************************** */
    return {
      model,
      isActive,
      loginButtonStatus,
      timer,

      menuTab,
      ruleForm,
      rules,
      codeButtonStatus,

      toggleMenu,
      submitForm,
      getSms,
      countDown,
      clearCountDown,
      login,
      register
    }
  }
}
</script>
<style scoped lang="scss">
#login {
  width: 100vw;
  height: 100vh;
  // background: #5cbec1;
  background-image: url('../../assets/login-bg3.png');
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