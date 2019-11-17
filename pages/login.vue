<template>
  <v-container>
    <div class="forms-container">
      <v-text-field
        v-model="email"
        label="メールアドレス"
        prepend-icon="mdi-email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="パスワード"
        prepend-icon="mdi-key"
        required
      ></v-text-field>
      <div class="btn-container">
        <v-btn 
          color="primary"
        >ログイン</v-btn>
      </div>
      <nuxt-link to="registar" class="text-link">登録がまだの方はこちら</nuxt-link>
    </div>   
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    }
  }
}
</script>

<style scoped>
>>> .v-label {
  font-size: 14px;
}

.forms-container {
  padding: 100px 10px;
}

.btn-container {
  text-align: center;
  margin: 10px 0 15px;
}

.text-link {
  display: block;
  text-align: center;
  font-size: 12px; 
}
</style>