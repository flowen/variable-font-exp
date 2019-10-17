const autoprefixer = require('autoprefixer')
const mqPacker = require('css-mqpacker') // compresses media queries into a single query
const cssnano = require('css-mqpacker') // super compressor

module.exports = {
  siteMetadata: {
    siteUrl: `localhost:8000`,
    title: `Fibre Gatsby love`,
    description: `template with react-fibre and gatsby`,
    author: `@flowen_nl`,
    keywords: `react-fibre, gatsby`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          autoprefixer(),
          cssnano({
            preset: [
              `default`,
              {
                autoprefixer: true,
                discardUnused: true,
                mergeIdents: true,
                zindex: true,
              },
            ],
          }),
          mqPacker({
            sort: true,
          }),
        ],
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     //icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [`Work+Sans: 600, 900`],
        },
        // custom: {
        //   families: [`Recursive: 300, 900`],
        //   url: '/src/scss/common/_fontface.css',
        // },
      },
    },
  ],
}
