<template>
  <section class="container">    
    <section v-if="!result()">
      <div class="progress">
        <el-progress :text-inside="true" :percentage="percentage" :stroke-width="20" />
      </div>
      <p class="question">
        {{ mbti.questionList[cnt].q }}
      </p>
      <div class="container__btn">
        <Btn
          type="text"
          class="active"
          color="#409EFF"
          @click.prevent="select(a.type[0])"
          v-for="a in mbti.questionList[cnt].a"
          :key="a.answer">
          {{ a.answer }}
        </Btn>
      </div>
    </section>
    <section
      v-else
      class="result">
      <div class="result__MbtiTendency">
        {{ userName }} adalah {{ results[0] }}.
      </div>
      <p class="result__explain">
        {{ results[1] }}
      </p>
      <div class="graph">
        <div
          v-for="(ten, idx) in tendency"
          :key="ten"
          class="graph__box">
          <p
            v-for="lTen in leftTendency[idx]"
            :key="lTen"
            class="box__left-tendency">
            {{ lTen }}
          </p>
          <div class="box__left">
            <div 
              v-for="n in mbtiTest.left[idx]"
              :key="n"
              class="left__cnt"></div>  
          </div>
          <p class="box__explain">
            {{ ten }}
          </p>
          <div class="box__right">
            <div 
              v-for="n in mbtiTest.right[idx]"
              :key="n"
              class="right__cnt"></div>
          </div>
          <p
            v-for="rTen in rightTendency[idx]"
            :key="rTen"
            class="box__right-tendency">
            {{ rTen }}
          </p>
        </div>
      </div> 
      <a href="/mbti">
        <el-button type="primary" class="restart">
          Ulangi
        </el-button>
      </a>
    </section>
  </section>
</template>

<script lang="ts">
// import mbti from 'assets/data.json'
import mbti from '@/assets/demodata.json'
import Btn from '@/views/erp/hr/mbti/components/Mbti/Btn.vue' 
import { addMbti } from "@/api/hr/mbti";

export default {
  components: {
    Btn
  },
  data(){
    return {
      mbti,
      cnt: 0,
      percentage: 0,
      mbtiTest: {
        left: [0, 0, 0, 0], // E , S , T , J
        right : [0, 0, 0, 0] // I , N , F , P
      },
      tendency: ['orientasi energi', 'fungsi pengenalan', 'fungsi penilaian', 'gaya hidup'],
      leftTendency: ['Extrovert(E) ', 'Sensing(S) ', 'Thinking(T)', 'Judging(J)'],
      rightTendency: ['Introvert(I)', 'Intuition(N)', 'Feeling(F)', 'Perceiving(P)'],
      MbtiTendency: '',
      results: ['', ''],
      answer: '',
      form: {},
    }
  },
  props: {
    userName: {
      type: String,
      default: ''
    }
  },
  watch: {
    MbtiTendency(){
      for(let i = 0 ; i < this.mbti.resultsList.length ; i++){
        if(this.MbtiTendency === this.mbti.resultsList[i].types){
          this.results[0] = this.mbti.resultsList[i].types
          this.results[1] = this.mbti.resultsList[i].desc
        }
      } 
    }
  },
  methods: {
    select(type){      
      switch(type){
        case 'E': this.mbtiTest.left[0]++; break
        case 'I': this.mbtiTest.right[0]++; break
        case 'S': this.mbtiTest.left[1]++; break
        case 'N': this.mbtiTest.right[1]++; break
        case 'T': this.mbtiTest.left[2]++; break
        case 'F': this.mbtiTest.right[2]++; break
        case 'J': this.mbtiTest.left[3]++; break
        case 'P': this.mbtiTest.right[3]++; break
      }

   
      this.answer += type;
      this.cnt++

      this.percentage =  Math.ceil(((this.cnt + 1) / this.mbti.questionList.length) * 100)
      if(this.cnt === this.mbti.questionList.length){
        this.mbtiTest.left[0] > this.mbtiTest.right[0] ? this.MbtiTendency += 'E' : this.MbtiTendency += 'I'
        this.mbtiTest.left[1] > this.mbtiTest.right[1] ? this.MbtiTendency += 'S' : this.MbtiTendency += 'N'
        this.mbtiTest.left[2] > this.mbtiTest.right[2] ? this.MbtiTendency += 'T' : this.MbtiTendency += 'F'
        this.mbtiTest.left[3] > this.mbtiTest.right[3] ? this.MbtiTendency += 'J' : this.MbtiTendency += 'P'
        this.form = {
          userId: null,
          userName: this.userName,
          answer: this.answer,
          result: this.MbtiTendency
        }
        addMbti(this.form).then(response => {
          console.log("sukses")
        });
      } 
      // document.querySelector('.progress__box').style.width = ((this.cnt + 1) / this.mbti.questionList.length ) * 100 + '%'

    },
    result() {
      return this.mbti.questionList.length === this.cnt
      }
    }
  }
</script>

<style lang="scss" >
@keyframes move {
  from {
    margin-left: 100%;
    opacity: 0;
  }
  to {
    margin-left: 0%;
    opacity: 1;
  }
}
@keyframes opac {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
  .container {
    position: absolute;
    margin: auto;
    right: 0;
    left: 0;
    border: 1px solid #409EFF;
    border-radius: 10px;
    width: 95%;
    margin-top: 1rem;
    .progress {
      width: 100%;
      margin: 1rem 0 3rem;
    }

    .question {
      text-align: center;
      font-size: 20px;
    }
    .container__btn {
      display: flex;
      align-content: center;
      justify-content: center;
      margin:1rem 0 1rem;
      .active:first-child {
        animation: opac .5s;
      }
      .active:last-child {
        animation: move .5s ease-in-out 1 normal;
      }
    }

    .result{
      position: relative;
      .result__MbtiTendency {
        margin-top: 1rem;
        font-size: 30px;
        text-align: center;
        font-weight: bold;
      }
      .result__explain {
        margin: 1rem;
      }
      .graph {
        margin: 1rem;
        .graph__box {
          display: flex;
          justify-content: center;
          align-items: stretch;
          margin: 10px 0 10px;
          
          .box__left {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            .left__cnt {
              width: 4%;
              height: 1rem;
              background-color:royalblue;
              margin-right: 1px;
            }
          }
          .box__explain {
            font-size: 12px;
            text-align: center;
            margin: 0 1rem 0;
            width: 300px;
          }
          .box__right {
            width: 100%;
            display: flex;
            .right__cnt {
              width: 4%;
              height: 1rem;
              background-color: orange;
              margin-right: 1px;
            }
          }
          .box__left-tendency,
          .box__right-tendency {
            margin: 0 1px 0;
          }
        }
      }
      .restart {
        margin-top: 20px;
        position: absolute;
        left: 50%;
        margin-left: calc(-5rem / 2);
      }
    }
  }
</style>