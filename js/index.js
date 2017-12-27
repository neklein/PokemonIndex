/**
 * index.js
 * - All our useful JS goes here, awesome!
 */

//Instantiate a new PokeClient.  Use this to retrieve data about Pokemon.  https://github.com/PokeAPI/pokeapi-js-wrapper
var PokeClient = new Pokedex.Pokedex({
    protocol: "https",
    cache: true,
    timeout: 5 * 1000 // 5s
  });
  
  // Init Vue!


  var app = new Vue({
    el: "#pokedex",
    
    data: function() {
      return {
        offset: 0,
        pokemonList: [],
        listDisplayed: true,
        singleDisplayed: false,
        pokeArray: []        
      }
    },
   
    mounted: function() {
      this.load();            
    },
    methods: {  
      load: function(){
        var vm = this;
        PokeClient.getPokemonsList({ limit: 12, offset: vm.offset }).then(function(response) {
          vm.pokemonList = response.results;          
      });   
      },
      previous: function() {
        this.offset = Math.max(0, this.offset - 12);
          this.load();
      },

      next: function() {
        this.offset += 12;
        this.load();        
      },
      select: function(pokeName) {
        var vm = this;

        PokeClient.resource('/api/v2/pokemon/' + pokeName).then(function(response) {
          vm.$set(vm.pokeArray, 0, response.name);          
          vm.$set(vm.pokeArray, 1, response.abilities[0].ability.name);
          vm.$set(vm.pokeArray, 2, response.moves[0].move.name);
          vm.$set(vm.pokeArray, 3, response.types[0].type.name);
          vm.$set(vm.pokeArray, 4, response.weight);
        });
        vm.listDisplayed = false;   
        vm.singleDisplayed = true;   
      }
    }
  });
  