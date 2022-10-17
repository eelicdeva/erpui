<template>
   <el-form ref="userRef" :model="user" :rules="rules" label-width="80px">
      <el-form-item :label="$t('user.nickname')" prop="nickName">
         <el-input v-model="user.nickName" maxlength="30" />
      </el-form-item>
      <el-form-item :label="$t('user.phoneNumber')" prop="phonenumber">
         <el-input v-model="user.phonenumber" maxlength="11" />
      </el-form-item>
      <el-form-item :label="$t('user.email')" prop="email">
         <el-input v-model="user.email" maxlength="50" />
      </el-form-item>
      <el-form-item :label="$t('user.sex')">
         <el-radio-group v-model="user.sex">
            <el-radio label="0">{{ $t('user.male') }}</el-radio>
            <el-radio label="1">{{ $t('user.female') }}</el-radio>
         </el-radio-group>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="submit">{{ $t('button.save') }}</el-button>
      <el-button type="danger" @click="close">{{ $t('button.close') }}</el-button>
      </el-form-item>
   </el-form>
</template>

<script setup>
import { updateUserProfile } from "@/api/system/user";
import i18n from '@/lang/index';

const {t} = i18n.global;
const props = defineProps({
  user: {
    type: Object
  }
});

const { proxy } = getCurrentInstance();

const rules = ref({
  nickName: [{ required: true, message: t('user.nicknameRules'), trigger: "blur" }],
  email: [{ required: true, message: t('user.emailRules'), trigger: "blur" }, { type: "email", message:  t('user.emailRules'), trigger: ["blur", "change"] }],
  phonenumber: [{ required: true, message: t('user.phoneNumberRules'), trigger: "blur" }, { pattern: /[0-9]+$/, message: t('user.pnumberRules'), trigger: "blur" }],
});

/** 提交按钮 */
function submit() {
  proxy.$refs.userRef.validate(valid => {
    if (valid) {
      updateUserProfile(props.user).then(response => {
        proxy.$modal.msgSuccess(t('button.successModify'));
      });
    }
  });
};
/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
};
</script>
