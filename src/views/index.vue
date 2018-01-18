<template>
  <div style="">
    <input v-model="dir" type="text" style="width: 100%" placeholder="输入图片目录...">

    <q-card inline v-for="img in readImgs(dir)" :key="img" @click="select(img)">
      <q-card-media>
        <img :src="'file://' + img">
      </q-card-media>
      <q-card-title>
        {{img}}
      </q-card-title>
    </q-card>

    <hr>
    {{dir}}
    <hr>
    <pre>{{ readImgs(dir) }}</pre>
  </div>
</template>

<script>
  import {openURL} from 'quasar'

  const fs = window.require('fs')
  const path = window.require('path')

  export default {
    name: 'index',

    data() {
      return {
        dir: '/Users/colin/Desktop/test',
        selected: []
      }
    },
    computed: {},
    methods: {
      launch(url) {
        openURL(url)
      },

      readImgs(dir) {
        let list

        if (dir && fs.existsSync(dir)) {
          list = fs.readdirSync(dir)
          list = list.map(file => {
            return path.join(this.dir, file)
          })
        }

        return this.filterImg(list)
      },

      filterImg(list) {
        return list.filter(file => {
          return !!file.match(/\.(jpe?g|gif|png|webp|bmp)$/)
        })
      },

      select(img) {
        // this.selected.push(img)

        this.selected = [img]
        this.$bus.$emit('selected', this.selected.concat([]))
      },

      unselect(img) {
        // this.selected = this.selected.filter(file => {
        //   return file !== img
        // })

        this.selected = []
        this.$bus.$emit('selected', this.selected)
      }
    },

    mounted() {
    },

    beforeDestroy() {
    }
  }
</script>

<style lang="stylus">
  .logo-container
    width 255px
    height 242px
    perspective 800px
    position absolute
    top 50%
    left 50%
    transform translateX(-50%) translateY(-50%)

  .logo
    position absolute
    transform-style preserve-3d
</style>
