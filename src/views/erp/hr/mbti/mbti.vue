<template>
    <Header />
    <Name
      @click="nameUpdate"
      v-if="!nameOn" />
    <Mbti 
      :user-name="userName"
      v-else />
  </template>
  
  <script>
  import Header from '@/views/erp/hr/mbti/components/Mbti/Header'
  import Name from '@/views/erp/hr/mbti/components/Mbti/Name'
  import Mbti from '@/views/erp/hr/mbti/components/Mbti/'
  import useAppStore from "@/stores/modules/app";
  
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
        return useAppStore().userNameMbti;
      }
    },
    methods: {
      nameUpdate(){
        return this.nameOn = true
      }
    }
  }
  </script>