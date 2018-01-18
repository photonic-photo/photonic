<template>
  <div style="">
    <div ref="map" id="map" class="map" style="height: 300px; width: 100%;"></div>

    <div v-for="file in details" :key="file.SourceFile">

      <input type="text" v-model="tag">
      <hr>
      <pre v-if="file && tag" style="background: cadetblue; color: #fff; padding: 2rem;">{{filterTags(file, tag)}}</pre>
      <hr>

      <details>
        <pre>
          {{file}}
        </pre>
      </details>
      <hr>
    </div>
  </div>
</template>

<script>
  const remote = window.require('electron').remote
  const ExifTool = remote.require('exiftool-vendored').ExifTool
  const exiftool = new ExifTool();

  export default {
    name: 'exifs',

    data() {
      return {
        tag: '',
        selected: [],
        details: []
      }
    },
    computed: {},

    mounted() {
      this.$bus.$on('selected', (selected = []) => {
        console.log('selected:', selected)
        this.selected = selected
        this.init()
      })
    },

    methods: {
      init() {
        let exifs = []

        this.selected.forEach(async file => {
          try {

            let exif = await exiftool.read(file)

            console.log(exif)
            exifs.push(exif)
          } catch (err) {
            console.error('xxxxxxxx', err)
          }
        })

        this.$nextTick(function() {
          setTimeout(() => {
            this.initMap()
          }, 3000)
        })

        this.details = exifs
      },

      initMap() {
        let img = this.details[0] || {}

        console.log(img.GPSLatitude, img.GPSLongitude)

        if (!this.map) {
          this.map = new AMap.Map('map', {
            resizeEnable: true,
            zoom: 4,
            center: [img.GPSLatitude || 116.480983, img.GPSLongitude || 40.0958]
          })
        }

        new AMap.Marker({
          position: [img.GPSLatitude || 116.480983, img.GPSLongitude || 116.480983],
          map: this.map
        });
      },

      filterTags(tags, keyword) {
        let result = {}
        let reg = new RegExp(keyword, 'ig')

        Object.keys(tags).forEach(key => {
          if (key.match(reg)) {
            result[key] = tags[key]
          }
        })

        return result
      }
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
