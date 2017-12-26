/**
 * Register Vue Components
 */

Vue.component('pokemon', {
    template: '#pokemon',
    props: ['pokemon']
  
  }),

Vue.component('pokeCard', {
    template: '#pokeCard',
    data: function(){
      return {poke: ""}
    }
  })
  
  