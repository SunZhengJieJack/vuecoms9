<template>
  <div>
   <a-date-picker
      format="YYYY-MM-DD HH:mm:ss"
      :disabled-date="disabledDate"
      :disabled-time="disabledDateTime"
      style="width:100%"
      @change="onchange"
      :value="value"
    />
  </div>
</template>
<script>
// :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
import moment from 'moment';
import {dateFormat} from './utils/utlis.js'
export default {
  name:'v-date',
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
    moment,
    disabledDate(e){
    },
    disabledDateTime(e){
    },
    onchange(e){
      this.$emit('input',dateFormat(e._d,this.format))
    },
  },
}
</script>

