<template>
    <Header />
    <Name
      @click="nameUpdate"
      v-if="!nameOn" />
    <Mbti 
      :user-name="userName"
      v-else />
  </template>
  
  <script lang="ts">
  import Header from '@/views/erp/hr/mbti/components/Mbti/Header.vue'
  import Name from '@/views/erp/hr/mbti/components/Mbti/Name.vue'
  import Mbti from '@/views/erp/hr/mbti/components/Mbti/index.vue'
  import useMbtiStore from "@/stores/modules/mbti";
  
  export default {
    components : {
      Header,
      Name,
      Mbti
    },
    data(){
      return {
        nameOn: false
      }
    },
    computed: {
      userName() {
        return useMbtiStore().usernameMbti;
      }
    },
    methods: {
      nameUpdate(){
        return this.nameOn = true
      }
    }
  }
  </script>