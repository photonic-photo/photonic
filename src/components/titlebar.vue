<template>
  <div class="titlebar q-touch">
    <slot></slot>
    <div class="titlebar-stoplight">
      <div @click="close" ref="close" class="titlebar-close">
        <svg x="0px" y="0px" viewBox="0 0 6.4 6.4">
          <polygon fill="#4d0000"
                   points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2"></polygon>
        </svg>
      </div>
      <div @click="minimize" ref="minimize" class="titlebar-minimize">
        <svg x="0px" y="0px" viewBox="0 0 8 1.1">
          <rect fill="#995700" width="8" height="1.1"></rect>
        </svg>
      </div>
      <div @click="fullscreen" ref="fullscreen" class="titlebar-fullscreen">
        <svg class="fullscreen-svg" x="0px" y="0px" viewBox="0 0 6 5.9">
          <path fill="#006400" d="M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z"></path>
          <path fill="#006400" d="M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z"></path>
        </svg>
        <svg class="maximize-svg" x="0px" y="0px" viewBox="0 0 7.9 7.9">
          <polygon fill="#006400"
                   points="7.9,4.5 7.9,3.4 4.5,3.4 4.5,0 3.4,0 3.4,3.4 0,3.4 0,4.5 3.4,4.5 3.4,7.9 4.5,7.9 4.5,4.5"></polygon>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  const remote = window.require('electron').remote
  const mainWindow = remote.getCurrentWindow()

  export default {
    name: 'titlebar',

    data() {
      return {
        ALT: 18,
        isMaximized: true,
        isWindows: !!navigator.userAgent.match(/[Ww]indows/),
        size: [1000, 600]
      }
    },

    mounted() {
      this.init()
      this.$bus.$on('maximize', () => { this.maximize() })
      this.$bus.$on('unmaximize', () => { this.unmaximize() })
      this.$bus.$on('toggleMaximize', () => { this.toggleMaximize() })
      this.$bus.$on('fullscreen', () => { this.fullscreen() })
      this.$bus.$on('minimize', () => { this.minimize() })
      this.$bus.$on('close', () => { this.close() })
    },

    destroyed() {
      this.$bus.$off('maximize')
      this.$bus.$off('unmaximize')
      this.$bus.$off('toggleMaximize')
      this.$bus.$off('fullscreen')
      this.$bus.$off('minimize')
      this.$bus.$off('close')
    },

    methods: {
      init() {
      },

      close() {
        mainWindow && mainWindow.close()
      },

      minimize() {
        mainWindow && mainWindow.minimize()
      },

      maximize() {
        if (mainWindow) {
          this.size = mainWindow.getSize()
          mainWindow.maximize()
        }
      },

      unmaximize() {
        if (mainWindow) {
          mainWindow.unmaximize()
          mainWindow.setSize(this.size[0], this.size[1], true)
        }
      },

      toggleMaximize() {
        if (mainWindow && mainWindow.isMaximized()) {
          this.unmaximize()
        } else {
          this.maximize()
        }
      },

      fullscreen($event) {
        if ($event.altKey || this.isWindows) {
          this.toggleMaximize()
        } else {
          mainWindow && mainWindow.setFullScreen(!mainWindow.isFullScreen())
        }
      }
    }
  }
</script>

<style>
  .windows .titlebar-stoplight {
    float: right;
    text-align: right;
    flex-direction: row-reverse;
  }

  .windows .titlebar-close,
  .windows .titlebar-minimize,
  .windows .titlebar-fullscreen {
    text-align: center;
  }

  .windows .titlebar-close { order: 1 }
  .windows .titlebar-minimize { order: 3 }
  .windows .titlebar-fullscreen { order: 2 }

  .titlebar {
    padding: 0 3px;
    -webkit-app-region: drag;
  }

  .titlebar-stoplight {
    float: left;
    text-align: left;
    display: flex;
  }

  .titlebar-stoplight:hover svg,
  .titlebar-stoplight:hover svg.fullscreen-svg,
  .titlebar-stoplight:hover svg.maximize-svg {
    opacity: 1;
  }

  .titlebar.alt svg.fullscreen-svg {
    display: none;
  }

  .titlebar.alt svg.maximize-svg {
    display: block;
  }

  .titlebar-close,
  .titlebar-minimize,
  .titlebar-fullscreen {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 6px 4px;
    line-height: 0;
  }

  .titlebar .titlebar-close,
  .titlebar .titlebar-minimize,
  .titlebar .nodrag,
  .titlebar .titlebar-fullscreen {
    -webkit-app-region: no-drag;
  }

  .titlebar-close {
    border: 1px solid #e2463f;
    background-color: #ff5f57;
    margin-left: 6px;
  }

  .titlebar-close:active {
    border-color: #ad3934;
    background-color: #bf4943;
  }

  .titlebar-close svg {
    width: 6px;
    height: 6px;
    margin-top: 2px;
    margin-left: 2px;
    opacity: 0;
  }

  .titlebar-minimize {
    border: 1px solid #e1a116;
    background-color: #ffbd2e;
  }

  .titlebar-minimize:active {
    border-color: #ad7d15;
    background-color: #bf9123;
  }

  .titlebar-minimize svg {
    width: 8px;
    height: 8px;
    margin-top: 1px;
    margin-left: 1px;
    opacity: 0;
  }

  .titlebar-fullscreen,
  .titlebar-maximize {
    border: 1px solid #12ac28;
    background-color: #28c940;
  }

  .titlebar-fullscreen:active {
    border-color: #128622;
    background-color: #1f9a31;
  }

  .titlebar-fullscreen svg.fullscreen-svg {
    width: 6px;
    height: 6px;
    margin-top: 2px;
    margin-left: 2px;
    opacity: 0;
  }

  .titlebar-fullscreen svg.maximize-svg {
    width: 8px;
    height: 8px;
    margin-top: 1px;
    margin-left: 1px;
    opacity: 0;
    display: none;
  }
</style>
