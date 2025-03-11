<template>
  <router-view></router-view>
</template>

<script>

export default {
  data () {
    return {
      api: "http://localhost:8080/api/flights",
    }
  }
}
</script>