<template>
  <!--说明弹框-->
  <div class="Amount-box" v-show="isPopup">
    <div class="Amount">
      <ul class="explain">
        <li>
          <p v-html="text"></p>
        </li>
      </ul>
      <p @click="close">知道了</p>
    </div>
  </div>
</template>

<script>
  import { Ajax } from "@/mixins";

  export default {
    components: {

    },
    props: {
      // 必填，是否显示弹框
      isShow: {
        type: Boolean,
        required: true
      },
      text: {
        type: [Number, String],
        required: true
      }
    },
    data() {
      return {
        // 弹框状态
        isPopup: this.isShow || false,
      };
    },
    watch: {
      isShow(nextValue) {
        this.isPopup = nextValue;
      }
    },
    methods: {
      /**
       * 关闭弹框
       */
      close() {
        // 更改弹框状态
        this.isPopup = false;
        // 更新外层isShow状态
        this.$emit("update:isShow", this.isPopup);
      }
    },
    mounted(){

    }
  };
</script>

<style scoped>
  /*出入金弹框*/
  .Amount-box{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.45);
  }
  .Amount{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    width: 80%;
    height:6rem;
    border-radius: 0.3rem;
    overflow: hidden;
  }
  .Amount h4{
    height: 1.32rem;
    line-height: 1.32rem;
    text-align: center;
    font-size: 0.48rem;
    color: #8e79c0;
    background: #f3f1f9;
  }
  .Amount .explain{
    overflow-y: auto;
    padding: 0.69rem 0.55rem;
    height: 4rem;
    background: #fff;
    font-size: 0.42rem;
  }
  .Amount .explain li{
    margin-bottom: 0.6rem;
  }
  .Amount .explain h5{
    font-size: 0.42rem;
    color: #8e79c0;
  }
  .Amount .explain p{
    line-height: 0.72rem;
  }
  .Amount .explain p .link{
    font-size: 0.36rem;
    color: #8e79c0;
  }
  .Amount>p{
    height: 1.32rem;
    line-height: 1.32rem;
    text-align: center;
    font-size: 0.48rem;
    color: #fff;
    background: #8e79c0;
    border-bottom-left-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }
</style>
