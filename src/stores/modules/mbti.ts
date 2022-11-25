import { defineStore } from "pinia";

interface UseMbtiStore {
  usernameMbti: string;
};

const useMbtiStore = defineStore(
  'mbti', {

    state: (): UseMbtiStore => ({
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