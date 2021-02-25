<template>
  <div>
    <slot name="tabs"></slot>
  </div>
</template>
<<script>
export default {
  name:'v-tabs',
  props:{
    
  },
  data(){
    return{
    }
  },
  computed: {
  },
  methods: {
    onChange(e){
      this.$emit('input',e.target.value)
    },
  },
}
</script>

