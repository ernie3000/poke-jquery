
var pokemonRepository = (function () {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function loadList() {
    return $.ajax(apiUrl).then(function (response) {
      response.results.forEach(function (item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    return $.ajax(item.detailsUrl).then(function (response) {
      item.imageUrl = response.sprites.front_default;
      item.height = response.height;
      item.types = response.types.map(function (item) {return ' ' + item.type.name;});

      item.ability = response.abilities.map(function (item) {return ' ' + item.ability.name;});
    }).catch(function (e) {
      console.error(e);
    });
  }


function add(pokemon) {
         repository.push(pokemon);
        }
      
function getAll() {
 return repository;
        }
  return {
    add: add,
    getAll: getAll,  
    loadList: loadList,  
    loadDetails: loadDetails
  
  
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    addListItem(pokemon);
  });
});

//-------------------------------------------------------------//

var pokemonRepositoryNew = pokemonRepository.getAll();


 //add-list-item function:





 function addListItem(pokemon) {
  var $modal = $('<div class="modal-container"></div>')
  var $NameButton = $('<button class="Name-button">' + pokemon.name + '</button>');
  
  

  var $li = $('<li class="list-item"></li>');
  var $ul = $('ul');
  var listItemheight =$('<div>'+ pokemon.height + '</div>');
  var listItemtypes =$('<div>'+ pokemon.types + '</div>');  

  
  $("#Poke-List").append($li); 
  $("#modal-container").append($modal);
  $ul.append($modal);
  $li.append($NameButton);
 


 
 var listItemheight = $('<div>'+ pokemon.height + '</div>'); 
 var listItemtypes = $('<div>' + pokemon.types +'</div>'); 
 
 

 //$NameButton.on('click', function(event){
 // console.log('test pokemon');
//});
$NameButton.on('click', function(event){
  showDetails(pokemon);
});


};
//------------------------------------------------------------//



//loop.creating.pokemons.from.repository



$(pokemonRepositoryNew).each(function(pokemon) {
  addListItem(pokemon)
});


// Showing Modal with Picture / Height / Name

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    showModal(item);   });
};



//-----------------------------
// creating modal content
function showModal(item) {
  var $modalContainer = $('<div></div>');
  $($modalContainer).appendTo('#modal-container');
  $($modalContainer).addClass( "is-visible");
  var $modal = $('<div></div>');
  $($modal).addClass("modal");
  var closeButtonElement =$('<button class="modal-close"> Close </button>');
  var nameElement = $('<h1>' + item.name + '</h1>');
  var imageElement = $('<img class="modal-img">' + item.imageUrl +'</img>');
  var heightElement = $('<p>' + item.height + '</p>');
  

  
  $(closeButtonElement).appendTo('$modal');
  $(nameElement).appendTo('$modal');
  $(imageElement).appendTo('$modal');
  $(heightElement).appendTo('$modal');
  $($modal).appendTo('$modalcontainer');
  
  
  
};
  