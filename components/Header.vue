<template>
  <v-toolbar primary dark>
    <template v-if="$route.name === 'index'">
      <v-toolbar-title>あなたのポイント {{}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon dark>
        <v-icon>mdi-logout</v-icon>
        <span class="icon-text">ログアウト</span>
      </v-btn>
    </template>
    <template v-else>
      <v-toolbar-title>{{ $route.name }} Page</v-toolbar-title>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      point: 0,
    }
  },
  created() {
    axio
  }
}
</script>

<style scoped>
>>> .v-toolbar__content {
  background-color: #1976D2;
}

>>> .v-btn__content {
  flex-direction: column !important;
}

>>> .v-btn {
  margin-right: -4px !important;
}

.icon-text {
  font-weight: bold;
  font-size: 10px;
  letter-spacing: -0.2px;
}
</style>
