module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    './app/javascript/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        'theme-purple': '#cdb4db',
        'theme-light-pink': '#ffc8dd',
        'theme-pink': '#ffafcc',
        'theme-light-blue': '#bde0fe',
        'theme-blue': '#a2d2ff',
      },
    },
  },
}
