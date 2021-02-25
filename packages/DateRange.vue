<template>
  <div>
  <a-range-picker 
    @change="onChange"  
    style="width:100%"   
    v-bind="$attrs"
    :value="value"/>
  </div>
</template>
<script>
import moment from 'moment';
import {dateFormat} from './utils/utlis.js'
export default {
  name:'v-RangePicker',
  props:{
    value:'',
    format:{
      type: String,
      dafault: ()=>'yyyy-MM-dd'
    }
  },
  data(){
    return{
    }
  },
  computed: {
  },
  methods: {
    onChange(e,v){
      this.$emit('input',v)
    },
    pressEnter(e,v){
      this.$emit('input',v)
    }
  },
}
</script>

