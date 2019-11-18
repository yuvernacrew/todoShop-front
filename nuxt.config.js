module.exports = {
  mode: 'spa',
  layout: 'default',
  head: {
    title: 'TODO APP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'TODO APP' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap' }
    ]
  },
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  plugins: [
    '@plugins/vuetify'
  ],
}

