<template>
  <div class="login">
    <!-- :rules="loginRules" -->
    <el-form ref="loginRef" 
    :model="loginForm" 
    :rules="loginRules" 
    :validate-on-rule-change="false"
    class="login-form">
      <h3 class="title">{{ $t("login.title") }}</h3>
      <lang-select @selectLangEvent="langListen" class="set-language" />
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          :placeholder="$t('login.username')"
        >
          <template #prefix
            ><svg-icon icon-class="user" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          :placeholder="$t('login.password')"
          @keyup.enter="handleLogin"
        >
          <template #prefix
            ><svg-icon icon-class="password" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          :placeholder="$t('login.captcha')"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix
            ><svg-icon icon-class="validCode" class="el-input__icon input-icon"
          /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">{{ $t("login.logIn") }}</span>
          <span v-else>{{ $t("login.logloading") }}</span>
        </el-button>
        <div style="float: right" v-if="register">
          <router-link class="link-type" :to="'/register'">{{
            $t("login.signupnow")
          }}</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2022- EELIC SYSTEM All Rights Reserved.</span>
    </div>
  </div>
</template>

<script lang="ts" name="login">
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { getCodeImg, getPublicKey } from "@/api/login";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUserStore from "@/stores/modules/user";
import LangSelect from "@/components/LangSelect/index.vue";
//import ElForm from "element-plus/es/components/form";

//const loginRef = ref([] as Array<HTMLElement>)
export default {
  name: "login",
  'components': { LangSelect },
  data() {
    return {
      loginForm: {
        code: "",
        password: "admin123",
        lang: "",
        rememberMe: false,
        username: "admin",
        uuid: ""
      },
      codeUrl: "",
      loading: false,
      captchaOnOff: true,
      register: true,
      redirect: undefined,
    };
  },
   setup() {  
    const userStore = useUserStore();
    const router = useRouter();
    return {
      userStore, router
    }
  },
  computed: {
    loginRules: function () {
      return {
        username: [
          { required: true, trigger: "blur", message: this.$t('login.enterUsername')},
          { min: 4, max: 16, message: this.$t('login.usernameError'), trigger: 'blur' },
          { pattern: /^[a-zA-Z]/, message: this.$t('login.usernameError'), trigger: "blur"},
          { pattern: /^[a-zA-Z0-9_-]+$/, message: this.$t('login.usernameError'), trigger: "blur"}
        ],
        password: [
          { required: true, trigger: "blur", message: this.$t('login.enterPassword') },
          { min: 5, max: 20, message: this.$t('login.passwordError'), trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: "change", message: this.$t('login.enterCaptcha') },
          { pattern: /^[0-9]+$/, trigger: "change", message: this.$t('register.verificationCode') }
        ],
      };
    },
  },
  watch: {
    // $route: {
    //   handler: function (route) {
    //     this.redirect = route.query && route.query.redirect;
    //   },
    //   immediate: true,
    // },
    
  },
  created() {
      this.getCode();
      this.getCookie();
      this.getPublic();
  },
  methods: {
    langListen() {      
      this.$refs.loginRef.clearValidate();
      this.$nextTick(() => this.$refs.loginRef.validate(()=>{}));
   },
    handleLogin() {    
      this.$refs.loginRef.validate((valid) => {
        if (valid) {
         
          this.loading = true;
          // 勾选了需要记住密码设置在cookie中设置记住用户名和密码
          if (this.loginForm.rememberMe) {
            Cookies.set("username", loginForm.value.username, { expires: 30 });
            Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 });
            Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
          } else {
            // 否则移除
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }

          if (this.loginForm.lang != Cookies.get("lang")) {
            this.loginForm.lang = Cookies.get("lang");          
          };

          // 调用action的登录方法
        this.userStore.login(this.loginForm).then(() => {
        this.router.push({ path: this.redirect || "/" })
      }).catch(() => {
        this.loading = false;
        // 重新获取验证码
        if (this.captchaOnOff) {
          this.getCode();
        }
      });    
        }
      });
    },
    getCode() {
      getCodeImg().then((res) => {
        this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getPublic() {
      getPublicKey().then((res) => {


      });
    },

    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 10px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
