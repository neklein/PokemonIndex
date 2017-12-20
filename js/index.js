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
    
    data: function(){
      return {
        pokemonList: []
      }
    },
   
    mounted: function() {
      //Could not get the interval to function when added to getPokemonsList(interval)
      //it still gives me the entire list, making next and previous more difficult.
      //var interval = {
        //limit: 12,
        //offset: 0
      //}    
      
      PokeClient.getPokemonsList().then(function(response) {
          for(var i = 0; i < 12; i++)
          {
            var index = i;
            var val = response.results[i];
            app.$set (app.pokemonList, index, val);
          }
          
      });

      
    },
    methods: {      
      previous: function() {
        while(true)
        {
          var inputValue = document.getElementById("poke").value;
          console.log(inputValue);
          inputValueToAdd = inputValue - 1;
          console.log(inputValueToAdd);          
  
          if(inputValue == 1){
            alert("You have reached the end of the list of pokemon!");
            break;
          }
  
          var divToHide = document.getElementById("pokeList" + inputValue);
          console.log(divToHide);
          
          divToHide.style.display = "none";

          var divToDisplay = document.getElementById("pokeList" + inputValueToAdd);
          
          divToDisplay.style.display = "block";
          break;
            
        }
      },

      next: function() {
        while(true)
        {
          var inputValue = document.getElementById("poke").value;
          var inputValueToAdd = 1 + parseInt(inputValue);

          if(((inputValueToAdd * 12) - 1) > 948)
          {
            alert("You have reached the end of the list of pokemon!");
            break;
          }

          
          document.getElementById("poke").value = inputValueToAdd;
          
          PokeClient.getPokemonsList().then(function(response){

            var pieceToSplice = inputValue*12 - 12;
            var i = inputValue*12;
            var max = inputValueToAdd*12;
            for(i; i < max; i++)
            {
              var indexOfPoke = i;
              var val = response.results[i];
              
              //verify that the correct index and pokemon are passed:
              //console.log(val);
              app.$set (app.pokemonList, indexOfPoke, val);
            }

          })



          break;
        }
        
      },
      select: function() {
        console.log(test);
        //https://vuejs.org/v2/guide/components.html#Async-Components
        //PokeClient.resource('/api/v2/pokemon/' + poke.name)
      }
    }
  });
  