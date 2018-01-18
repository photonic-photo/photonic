<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" class="window">

    <!-- .toolbar-header sits at the top of your app -->
    <header class="toolbar toolbar-header">
      <titlebar></titlebar>
      <h1 class="title">Photonic</h1>
      <div class="toolbar-actions">
        <div class="btn-group">
          <button class="btn btn-default">
            <span class="icon icon-home"></span>
          </button>
          <button class="btn btn-default">
            <span class="icon icon-folder"></span>
          </button>
          <button class="btn btn-default active">
            <span class="icon icon-cloud"></span>
          </button>
          <button class="btn btn-default">
            <span class="icon icon-popup"></span>
          </button>
          <button class="btn btn-default">
            <span class="icon icon-shuffle"></span>
          </button>
        </div>

        <button class="btn btn-default">
          <span class="icon icon-home icon-text"></span>
          Filters
        </button>

        <button class="btn btn-default btn-dropdown pull-right">
          <span class="icon icon-megaphone"></span>
        </button>
      </div>
    </header>

    <!-- Your app's content goes inside .window-content -->
    <div class="window-content">
      <div class="pane-group">
        <div class="pane pane-sm sidebar">
          <nav class="nav-group">
            <h5 class="nav-group-title">Favorites</h5>
            <a class="nav-group-item active">
              <span class="icon icon-home"></span>
              connors
            </a>
            <span class="nav-group-item">
                <span class="icon icon-download"></span>
                Downloads
              </span>
            <span class="nav-group-item">
                <span class="icon icon-folder"></span>
                Documents
              </span>
            <span class="nav-group-item">
                <span class="icon icon-signal"></span>
                AirPlay
              </span>
            <span class="nav-group-item">
                <span class="icon icon-print"></span>
                Applications
              </span>
            <span class="nav-group-item">
                <span class="icon icon-cloud"></span>
                Desktop
              </span>
          </nav>


          <nav class="nav-group">
            <h5 class="nav-group-title">Tags</h5>
            <span class="nav-group-item" href="#">
                <span class="icon icon-record" style="color:#fc605b"></span>
                Red
              </span>
            <span class="nav-group-item" href="#">
                <span class="icon icon-record" style="color:#fdbc40"></span>
                Orange
              </span>
            <span class="nav-group-item" href="#">
                <span class="icon icon-record" style="color:#34c84a"></span>
                Green
              </span>
            <span class="nav-group-item" href="#">
                <span class="icon icon-record" style="color:#57acf5"></span>
                Blue
              </span>
          </nav>
          <nav class="nav-group">
            <h5 class="nav-group-title">Devices</h5>
            <span class="nav-group-item">
                <span class="icon icon-drive"></span>
                Backup disk
              </span>
            <span class="nav-group-item">
                <span class="icon icon-drive"></span>
                Backup disk
              </span>
            <span class="nav-group-item">
                <span class="icon icon-drive"></span>
                Backup disk
              </span>
            <span class="nav-group-item">
                <span class="icon icon-drive"></span>
                Backup disk
              </span>
          </nav>
        </div>
        <div class="pane">
          <router-view/>
        </div>
        <div class="pane pane-auto sidebar">
          <exifs></exifs>
        </div>
      </div>
    </div>

    <footer class="toolbar toolbar-footer">
      <div class="toolbar-actions">
        <button class="btn btn-default">
          Cancel
        </button>

        <button class="btn btn-primary pull-right">
          Save
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
  import exifs from './views/defails'
  /*
   * Root component
   */
  export default {
    components: {
      exifs
    }
  }
</script>

<style></style>
