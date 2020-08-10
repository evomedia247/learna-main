/* eslint-disable no-console */
// Defaults (dev) - Add a .env file to overwrite these values
let siteName = 'Learna'
let cdn = 'https://learna.imgix.net'
let baseUrl = 'http://localhost:3000'
let apiUrl = 'https://www.learna.ac.uk/v1'
let applyUrl = 'https://my-staging.learna.ac.uk/apply'
let googleTagManagerID = ''
let googleAnalyticsID = ''

if (process.env.NODE_ENV === 'production') {
  console.log('Setting env vars to: production')
  baseUrl = 'https://www.learna.ac.uk'
  apiUrl = 'https://www.learna.ac.uk/v1'
  applyUrl = 'https://my.learna.ac.uk/apply'
  googleTagManagerID = 'GTM-P3WJPPD'
  googleAnalyticsID = 'UA-16238264-19'
} else if (process.env.NODE_ENV === 'staging') {
  console.log('Setting env vars to: staging')
  siteName = 'Learna Staging'
  baseUrl = 'https://staging.learna.ac.uk'
  apiUrl = 'https://staging.learna.ac.uk/v1'
  googleTagManagerID = 'GTM-MLWLNMG'
  googleAnalyticsID = 'UA-16238264-21'
} else {
  console.log('Setting env vars to defaults')
  siteName = process.env.siteName || siteName
  cdn = process.env.cdn || cdn
  baseUrl = process.env.baseUrl || baseUrl
  apiUrl = process.env.apiUrl || apiUrl
  applyUrl = process.env.applyUrl || applyUrl
  googleTagManagerID = process.env.googleTagManagerID || googleTagManagerID
  googleAnalyticsID = process.env.googleAnalyticsID || googleAnalyticsID
}
const isDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging'

console.log('dev: ', isDev)
console.log('siteName: ', siteName)
console.log('baseUrl: ', baseUrl)
console.log('apiUrl: ', apiUrl)
console.log('applyUrl: ', applyUrl)
console.log('cdn: ', cdn)
console.log('googleTagManagerID: ', googleTagManagerID)
console.log('googleAnalyticsID: ', googleAnalyticsID)

export default {
  dev: isDev,
  mode: 'universal',
  target: 'static',
  srcDir: 'src',
  env: {
    siteName,
    cdn,
    baseUrl,
    apiUrl,
    applyUrl,
    googleTagManagerID,
    googleAnalyticsID
  },
  // https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config
  publicRuntimeConfig: {
    siteName,
    cdn,
    baseUrl,
    apiUrl,
    applyUrl,
    googleTagManagerID,
    googleAnalyticsID
  },
  router: {
    linkActiveClass: 'active',
    trailingSlash: false
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#f0508a', height: '0.5rem', continuous: true },
  css: ['~/assets/css/learna-bootstrap.scss'],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  plugins: [
    '~/plugins/cdn',
    '~/plugins/list',
    '~/plugins/referrer',
    '~/plugins/global',
    { src: '~/plugins/scrollactive', mode: 'client' } // Could we use https://bootstrap-vue.org/docs/directives/scrollspy
  ],
  buildModules: [
    '@nuxtjs/eslint-module', // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/gtm', // Doc: https://github.com/nuxt-community/gtm-module
    '@nuxtjs/google-analytics'
  ],
  gtm: {
    id: googleTagManagerID,
    enabled: googleTagManagerID !== '',
    pageTracking: false,
    respectDoNotTrack: false,
    autoInit: true
  },
  googleAnalytics: {
    id: googleAnalyticsID
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
    'bootstrap-vue/nuxt',
    ['vue-scrollto/nuxt', { duration: 300, container: 'body' }],
    ['nuxt-lazy-load', { directiveOnly: true }], // Let's try migrating to bootstrap lazy loading https://bootstrap-vue.org/docs/components/image
    'cookie-universal-nuxt',
    'nuxt-google-optimize'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    componentPlugins: ['FormPlugin', 'FormInputPlugin'],
    directivePlugins: [],
    components: [
      // Layout
      'BContainer',
      'BRow',
      'BCol',
      // Form
      'BFormGroup',
      'BFormInput',
      'BFormTextarea',
      'BButton',
      // Nav
      'BNavbar',
      'BNavbarNav',
      'BNavbarBrand',
      'BNavItem',
      'BNavItemDropdown',
      'BDropdownItem',
      'BDropdownDivider',
      'BNavbarToggle',
      // Cards
      'BCardGroup',
      'BCard',
      'BCardHeader',
      'BCardTitle',
      'BCardImg',
      'BCardBody',
      'BCardText',
      // Tabs
      'BTabs',
      'BTab',
      // List
      'BListGroup',
      'BListGroupItem',
      // Misc
      'BImgLazy',
      'BAlert',
      'BBadge',
      'BTable',
      'BCollapse',
      // Icons
      'BIconGrid3x3Gap',
      'BIconPentagonFill',
      'BIconBullseye',
      'BIconDiamondHalf',
      'BIconExclude',
      'BIconPersonFill',
      'BIconLayersFill',
      'BIconCalendar',
      'BIconBuilding',
      'BIconAlarm',
      'BIconPencilSquare',
      'BIconStar',
      'BIconCreditCard',
      'BIconExclamationDiamond',
      'BIconPeople'
      // Unused
      // 'BImg',
      // 'BSidebar'
      // 'BBreadcrumb',
      // 'BBreadcrumbItem'
    ],
    directives: ['BToggle']
  },
  build: {
    analyze: false,
    extractCSS: true,
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[name]-[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[name]-[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : '[name]-[contenthash].css')
    },
    extend(config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  sitemap: {
    hostname: process.env.baseUrl,
    gzip: true,
    exclude: ['/contact/**', '/legal/**', '/paid', '/test'],
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = []

      const courses = await $content('courses')
        .only(['slug'])
        .where({ visible: true })
        .fetch()
      files.push(...courses.map((course) => `/courses/${course.slug}`))

      // const pages = await $content('pages')
      //   .only(['slug'])
      //   .where({ visible: true })
      //   .fetch()
      // files.push(...pages.map((page) => `/pages/${page.slug}`))

      console.log('files: ', files)
      return files
    }
  },
  generate: {
    dir: './public',
    // routes: configurator.getRoutes,
    async routes() {
      const { $content } = require('@nuxt/content')
      const files = []

      const courses = await $content('courses')
        .only(['slug'])
        .fetch()
      files.push(...courses.map((course) => `/courses/${course.slug}`))

      // const pages = await $content('pages')
      //   .only(['slug'])
      //   .fetch()
      // files.push(...pages.map((page) => `/courses/${page.slug}`))

      console.log('files: ', files)
      return files
    }
  }
}
