/**
 * Register Vue Components
 */

Vue.component('pokemon', {
    template: '#pokemon',
    methods: {
      thisSelect: function(pokeName){
        this.$emit('select', pokeName);        
      }
    },
    props: ['pokemon']  
  }),

Vue.component('single-poke', {
    template: '#pokeCard',
    props: {
      poke: {
        type: null
      }
    }
  })
  
  