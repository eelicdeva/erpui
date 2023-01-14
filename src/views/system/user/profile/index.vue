<template>
   <div class="app-container">
      <el-row :gutter="20">
         <el-col :span="6" :xs="24">
            <el-card class="box-card">
               <template v-slot:header>
                 <div class="clearfix">
                   <span>{{ $t('user.personalInfo') }}</span>
                 </div>
               </template>
               <div>
                  <div class="text-center">
                     <userAvatar :user="state.user" />
                  </div>
                  <ul class="list-group list-group-striped">
                     <li class="list-group-item">
                        <svg-icon icon-class="user" />{{ $t('user.name') }}
                        <div class="pull-right">{{ state.user.userName }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="phone" />{{ $t('user.phoneNumber') }}
                        <div class="pull-right">{{ state.user.phonenumber }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="email" />{{ $t('user.userEmail') }}
                        <div class="pull-right">{{ state.user.email }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="tree" />{{ $t('user.departementName') }}
                        <div class="pull-right" v-if="state.user.dept">{{ state.user.dept.deptName }} / {{ state.postGroup }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="peoples" />{{ $t('user.roleGroup') }}
                        <div class="pull-right">{{ state.roleGroup }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="date" />{{ $t('user.DateCreated') }}
                        <div class="pull-right">{{ state.user.createTime }}</div>
                     </li>
                  </ul>
               </div>
            </el-card>
         </el-col>
         <el-col :span="18" :xs="24">
            <el-card>
               <template v-slot:header>
                 <div class="clearfix">
                   <span>{{ $t('user.BasicData') }}</span>
                 </div>
               </template>
               <el-tabs v-model="activeTab">
                  <el-tab-pane :label="$t('user.BasicData')" name="userinfo">
                     <userInfo :user="state.user" />
                  </el-tab-pane>
                  <el-tab-pane :label="$t('user.ChangePW')" name="resetPwd">
                     <resetPwd :user="state.user" />
                  </el-tab-pane>
               </el-tabs>
            </el-card>
         </el-col>
      </el-row>
   </div>
</template>

<script setup lang="ts" name="Profile">
import userAvatar from "./userAvatar.vue";
import userInfo from "./userInfo.vue";
import resetPwd from "./resetPwd.vue";
import { getUserProfile } from "@/api/system/user";
import { ref, reactive } from 'vue';

interface User {
   userName?: string
   phonenumber?: string
   email?: string
   dept?: {
      deptName: string
   }
   createTime?: string
}

const activeTab = ref("userinfo");
const state = reactive<{
    user: User;
    roleGroup: object;
    postGroup: object;
}>({
  user: {},
  roleGroup: {},
  postGroup: {}
});

function getUser() {
  getUserProfile().then(response => {
    state.user = response.data;
    state.roleGroup = response.roleGroup;
    state.postGroup = response.postGroup;
  });
};

getUser();
</script>
