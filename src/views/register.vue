<template>
  <div class="register">
    <el-form ref="registerRef" :model="registerForm" :rules="registerRules" :validate-on-rule-change="false" class="register-form">
      <h3 class="title">{{ $t('register.title') }}</h3>
      <lang-select @selectLangEvent="langLisen" class="set-language" />
      <el-form-item prop="username">
        <el-input 
          v-model="registerForm.username" 
          type="text" 
          size="large" 
          auto-complete="off" 
          :placeholder="$t('login.username')"
        >
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          type="password"
          size="large" 
          auto-complete="off"
          :placeholder="$t('login.password')"
          @keyup.enter="handleRegister"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          type="password"
          size="large" 
          auto-complete="off"
          :placeholder="$t('register.confirmPassword')"
          @keyup.enter="handleRegister"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <el-input
          size="large" 
          v-model="registerForm.code"
          auto-complete="off"
          :placeholder="$t('login.captcha')"
          style="width: 63%"
          @keyup.enter="handleRegister"
        >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="register-code">
          <img :src="codeUrl" @click="getCode" class="register-code-img"/>
        </div>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="large" 
          type="primary"
          style="width:100%;"
          @click.prevent="handleRegister"
        >
          <span v-if="!loading">{{ $t('register.Register') }}</span>
          <span v-else>{{ $t('register.registering') }}</span>
        </el-button>
        <div style="float: right;">
          <router-link class="link-type" :to="'/login'">{{ $t('register.login') }}</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-register-footer">
      <span>Copyright © 2018-2022 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg, register } from "@/api/login";
import LangSelect from "@/components/LangSelect";

export default {
  name: "Register",
  components: { LangSelect },
  data() {
    return {
      codeUrl: "",
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        code: "",
        uuid: ""
      },
      loading: false,
      captchaOnOff: true
    };
  },
  setup() {
    const router = useRouter();
    return {
      router,
    }

  },
  computed: {
     registerRules: function() {
      const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error(this.$t('register.passwordDontMatch')));
      } else {
        callback();
      }
    };
        return {
          username: [
          { required: true, trigger: "blur", message: this.$t('login.enterUsername')},
          { min: 4, max: 16, message: this.$t('register.usernamelength'), trigger: 'blur' },
          { pattern: /^[a-zA-Z]/, message: this.$t('register.usernamePattern2'), trigger: "blur"},
          { pattern: /^[a-zA-Z0-9_-]+$/, message: this.$t('register.usernamePattern'), trigger: "blur"}
        ],
        password: [
          { required: true, trigger: "blur", message: this.$t('login.enterPassword') },
          { min: 5, max: 20, message: this.$t('register.passwordlength'), trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: this.$t('register.enterConfirmPassword')  },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ],
        code: [
          { required: true, trigger: "change", message: this.$t('login.enterCaptcha') },
          { pattern: /^[0-9]+$/, trigger: "change", message: this.$t('register.verificationCode') }
          ]
        };
      },
  },
  created() {
    this.getCode();
  },
  methods: {
    langLisen() {      
      this.$refs.registerRef.clearValidate();
      this.$nextTick(() => this.$refs.registerRef.validate(()=>{}));
   },
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.registerForm.uuid = res.uuid;
        }
      });
    },
    handleRegister() {
      this.$refs.registerRef.validate(valid => {
        if (valid) {
          this.loading = true;
          register(this.registerForm).then(res => {
            const username = this.registerForm.username;
            this.$alert("<font color='red'>" + this.$t('register.congratulations') + " " + username + " " + this.$t('register.success') + " </font>", this.$t('register.systemhint'), {
              dangerouslyUseHTMLString: true,
              type: 'success'
            }).then(() => {
              this.router.push("/login");
            }).catch(() => {});
          }).catch(() => {
            this.loading = false;
            if (this.captchaOnOff) {
              this.getCode();
            }
          })
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.register {
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

.register-form {
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
.register-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.register-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-register-footer {
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
.register-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
