<template>
  <div id="app" class="col-md-4 offset-md-4">
    <router-view></router-view>
  </div>
</template>

<script>
// import 'mdbootstrap/css/bootstrap.min.css'
// import 'mdbootstrap/css/mdb.min.css'
// import 'mdbootstrap/js/bootstrap.min.js'
// import 'mdbootstrap/js/mdb.min.js'

export default {
  name: 'app'
}
</script>

<style>
body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    /*min-width: 230px;
    max-width: 550px;*/
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
    font-weight: 300;
}

#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;*/
  /*margin: 130px 0 40px 0;*/
}

#app h1 {
  font-weight: 100;
  text-align: center;
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

#app .main {
  position: relative;
  z-index: 2;
}

.md-speed-dial.md-fab-bottom-right,
.md-button.md-fab.md-fab-bottom-right {
  top: auto;
  right: 20px !important;
  bottom: 20px !important;
  left: auto;
  position: fixed !important;
}
</style>
