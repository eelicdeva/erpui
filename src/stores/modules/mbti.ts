import { defineStore } from "pinia";

const useMbtiStore = defineStore(
  'mbti', {

    state: () => ({
      usernameMbti: ''
    }),

    actions: {
      setUserNameMbti(userNameMbti: string) {
        this.usernameMbti = userNameMbti;
      }
    }
  } 
);

export default useMbtiStore;