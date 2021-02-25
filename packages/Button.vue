<template>
    <a-button :type="type" @click="click">{{isName}}</a-button>
</template>
<script>
import { Button } from 'ant-design-vue'
export default {
  name: 'v-button',
  props: {
    ...Button.props,
    isName:{
      type: String,
      default: ()=>'默认'
    }
  },
  data() {
    return {}
  },
  computed: {},
  created(){
    console.log(Button)
  },
  methods: {
    click() {
      this.$emit('input', '')
    }
  }
}
</script>
