<template>
   <el-form ref="pwdRef" :model="user" :rules="rules" label-width="80px">
      <el-form-item :label="$t('user.oldPassword')" prop="oldPassword">
         <el-input v-model="user.oldPassword" :placeholder="$t('user.oldPWPlaceholder')" type="password" show-password />
      </el-form-item>
      <el-form-item :label="$t('user.newPassword')" prop="newPassword">
         <el-input v-model="user.newPassword" :placeholder="$t('user.newPWPlaceholder')" type="password" show-password />
      </el-form-item>
      <el-form-item :label="$t('register.confirmPassword')" prop="confirmPassword">
         <el-input v-model="user.confirmPassword" :placeholder="$t('user.cPWPlaceholder')" type="password" show-password/>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="submit">{{ $t('button.save') }}</el-button>
      <el-button type="danger" @click="close">{{ $t('button.close') }}</el-button>
      </el-form-item>
   </el-form>
</template>

<script setup>
import { updateUserPwd } from "@/api/system/user";
import i18n from '@/lang/index';

const {t} = i18n.global;

const { proxy } = getCurrentInstance();

const user = reactive({
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined
});

const equalToPassword = (rule, value, callback) => {
  if (user.newPassword !== value) {
    callback(new Error(t('register.passwordDontMatch')));
  } else {
    callback();
  }
};
const rules = ref({
  oldPassword: [{ required: true, message: t('user.oldPWRules'), trigger: "blur" }],
  newPassword: [{ required: true, message: t('user.newPWRules'), trigger: "blur" }, { min: 5, max: 20, message: t('user.newPWRules2'), trigger: "blur" }],
  confirmPassword: [{ required: true, message: t('user.cPWRules'), trigger: "blur" }, { required: true, validator: equalToPassword, trigger: "blur" }]
});

/** 提交按钮 */
function submit() {
  proxy.$refs.pwdRef.validate(valid => {
    if (valid) {
      updateUserPwd(user.oldPassword, user.newPassword).then(response => {
        proxy.$modal.msgSuccess( t('button.successModify'));
      });
    }
  });
};
/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
};
</script>
