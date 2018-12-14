<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
import './config/rem'

export default {
  name:'App',
  components: {

  },
  data() {
    return {
    }
  },
  created(){
  },
  mounted(){

  }
};
</script>

<style>
  @import './style/common.css';
.app{
  height: 100%;
}
</style>
