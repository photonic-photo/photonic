import Vue from 'vue'

[
  require('./titlebar.vue')
].forEach(component => {
  let name

  component = component.default || component
  name = component.name

  Vue.component(name, component)
})
