<template>
  <div class="wrapper">
    <v-app>
      <v-content>
        <nuxt />
      </v-content>
    </v-app>
  </div>
</template>
<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
