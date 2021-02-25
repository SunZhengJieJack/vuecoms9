import Vue from 'vue'
import Grid from './v-grid/v-grid.js'
import vInput from './Input.vue'
import vSelect from './Select.vue'
import vDate from './Date.vue'
import vDaterange from './DateRange.vue'
import vButton from './Button.vue'
const Components = {
  Grid,
  str: vInput,
  vSelect,
  date: vDate,
  daterange: vDaterange,
  vButton: vButton
}
const install =  Vue => {
  Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name])
  })
}

export default{
  install,
  ...Components
}