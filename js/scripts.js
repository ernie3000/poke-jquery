
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


function addListItem(pokemon) {
  var $NameButton = $('<button class="name-button">' + pokemon.name + '</button>');
  var $li = $('<div class="list-item"></div>');
  var $modal = $('<div class="modal-container"></div>');
  var $ul = $('<ul></ul>');
  $("#Poke-List").append($li); 
  $("#modal-container").append($modal);
  $ul.append($modal);
  $li.append($NameButton);

  $NameButton.on('click', function(event){
    showDetails(pokemon)});
 
};

// Creating List and Buttons

$(pokemonRepositoryNew).each(function(pokemon) {
  addListItem(pokemon)
});

// Showing Modal with Picture / Height / Name

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    showModal(item);   });
};


function showModal(item) {
  var $modalContainer = $('#modal-container');
  $modalContainer.show();
  $('#modal-container').html('');

 var modal = $('<div class="modal"></div>');
  
  var closeButtonElement = $('<button class="modal-close">Close</button>');
  var nameElement = $('<h1>' + item.name + '</h1>');
  
  var imageElement = $('<img class="modal-image"></img>');
  imageElement.attr("src",item.imageUrl);    //attribute set in jquery format
  
  var heightElement = $('<p>' + item.height + '</p>');

  var modalContent = $('<div class = "modal-content">');

 //appending element to modal and modal to modal container


  modalContent.append(closeButtonElement).append(nameElement).append(imageElement).append(heightElement);
 
  modal.append(modalContent);
  $modalContainer.append(modal).addClass('is-visible');

  closeButtonElement.on('click', function(event){
    $modalContainer.hide()});

    //hide modal when ESC on keyboard is pressed down
 
    $(window).on('keydown', (e) => {
      if (e.key === 'Escape' && $('#modal-container').hasClass('is-visible')) {
         $modalContainer.hide();
      }
    });
 
    //hide modal if clicked outside of it  #9
 
    $('#modal-container').on('click', function (event) {
      if ($(event.target).is($modalContainer)) {
        $modalContainer.hide();
      }
    });



};

