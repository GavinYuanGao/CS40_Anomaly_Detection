<template>
  <div id="app">
    <router-view />
    <Loading v-if='LOADING'/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Loading from './components/Loading'

	export default {
		components: {
			Loading
		},
		computed:{
			...mapState([
				'LOADING'
			])
		},
		name: 'App'
	}
</script>

<style>
  @import "./style/normalize.css";
#app {
  max-width: 540px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
