<template>
  <div class="container">
    <div class="loading"></div>
  </div>
</template>

<script>
	export default {
		name: "Loading"
	}
</script>

<style scoped>
  .container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .3;
  }

  .loading {
    width: 100px;
    height: 100px;
    margin: 200px auto 0;
    border-radius: 100%;
    border: 5px #ccc solid;
    border-right-color: #ca32e5;
    animation: loading 1s linear infinite;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>