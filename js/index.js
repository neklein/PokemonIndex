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
    
    data: {
      offset: 0,
      pokemonList: [],
      pokeAbilityOne: '',
      pokeAbilityTwo: '',
      listDisplayed: true,
      singleDisplayed: false
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
      select: function() {
        //https://vuejs.org/v2/guide/components.html#Async-Components
        console.log(PokeClient.resource('/api/v2/pokemon/bulbasaur'));
        var vm = this;

        PokeClient.resource('/api/v2/pokemon/bulbasaur').then(function(response) {
          console.log(response);
          console.log(response.abilities[0].ability.name);
          vm.pokeAbilityOne = response.abilities[0].ability.name;
          vm.pokeAbilityTwo = response.abilities[1].ability.name;
          console.log(vm.stat);
        });
        vm.listDisplayed = false;   
        vm.singleDisplayed = true;     
        //it still doesn't change kevin to the ability. I'm guessing it is because data is a function that returns stat.
        //it may not be able to update live. I will need to test that. 
        //I will probably need to create a component that does something slightly different with data
      }
    }
  });
  