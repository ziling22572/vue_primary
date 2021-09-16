<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
import {getStore} from "@/util/store.js";
import {validatenull} from "@/util/validate";
import {calcDate} from "@/util/date.js";
import {mapGetters} from "vuex";

window.getMessageTimer=null;

require('@/styles/basic.scss');

export default {
  name: "app",
  data() {
    return {
      //刷新token锁
      refreshLock: false,
      //检测token是否需要定时刷新
      refreshTime: "",
      mapGetters
    };
  },
  computed:{ 
    website(){
      return this.$store.getters.website;
    },
    tagName(){
      var list= this.$store.getters.tagList.map(item=>{
        return item.value
      })
      // console.log('list==',this.$store.getters.tagList)
      // console.log('list',list)
      return list;
      
    },
    keepalive(){
      var list= this.$store.getters.tagList.map(item=>{
        return item.value
      })
      var path=this.$route.fullPath;
      var arr=list.filter(item=>{
        return item==path
      })
      return arr.length>0
      
    },
    
  },

  mounted() {
    this.refreshToken();


  },
  beforeDestroy(){
    clearInterval(getMessageTimer)
    clearInterval(this.refreshTime)
  },
  
  methods: {
   
   
     // 定时检测token
    refreshToken() {
      this.refreshTime = setInterval(() => {
        const token =
          getStore({
            name: "token",
            debug: true,
          }) || {};
         
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (date.seconds >= this.website.tokenTime && !this.refreshLock) {
          this.refreshLock = true;
          this.$store.dispatch("refreshToken").then(() => {
              this.refreshLock = false;
            }).catch(() => {
              this.refreshLock = false;
            });
        };
       
      },2*60*1000);
    },


  },
};
</script>
<style lang="scss">

</style>
