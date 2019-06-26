
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
  //var $NameButton = $('<button class="Name-button"></button>');
  
  
  //  var listItemheight = document.createTextNode(pokemon.height); 
  //  var listItemtypes = document.createTextNode(pokemon.types)  
  //  var buttonText = document.createTextNode(pokemon.name);       
  
  
  
  
  
  
  var $li = $('<li class="list-item"></li>');
  var $ul = $('ul');
  var listItemheight =$('<div>'+ pokemon.height + '</div>');
  var listItemtypes =$('<div>'+ pokemon.types + '</div>');  
  //var buttontext = $('<div>' + pokemon.name + '</div>');
  
  $("#Poke-List").append($li); 
  $("#modal-container").append($modal);
  $ul.append($modal);
  $li.append($NameButton);
 


 // var listItemheight = document.createTextNode(pokemon.height); 
 // var listItemtypes = document.createTextNode(pokemon.types);  
 var listItemheight = $('<div>"pokemon.height"</div>'); 
 var listItemtypes = $('<div>"pokemon.types"</div>'); 
 
 // var buttonText = document.createTextNode(pokemon.name);          

   //creating  DOM

  //var $NameButton = document.createElement('button');
  //var $li = document.createElement('li');
 // var $ul = document.getElementById('Poke-List');
  //var $modal = document.createElement ('modal-container');

  //adding classes
  //$NameButton.classList.add('Name-button');                   
 // $li.classList.add('list-item');
  //$modal.classList.add('modal-container')
  
  //appending button and Items
 

 // document.getElementById('Poke-List').appendChild($li);
 // document.getElementById('modal-container').appendChild($modal);
 // $ul.appendChild($modal);
 // $NameButton.appendChild(buttonText);                       
 // $li.appendChild($NameButton);
 
//on click show details 

$($NameButton).on('click', showDetails(pokemon));
};
//------------------------------------------------------------//



//loop.creating.pokemons.from.repository

//pokemonRepositoryNew.forEach(function(pokemon) {
//  addListItem(pokemon)
//});

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
  // var $modalContainer = document.querySelector('modal-container');
  var $modalContainer = $('#modal-container');
  var $modalContainer = $('<div class="is-visible"></div>');

  //clearing all existing modal content
  //$modalContainer.innerHTML = '';
 // $($modalContainer).html("");





  //creating div element in DOM

  var $modal = $('<div class="modal"></div>');
  
  //adding class to div DOM element
 // modal.classList.add('modal');
  // $modalContainer.classList.add('is-visible');
  
  
  //creating closing button in modal content
  //var closeButtonElement = document.createElement('button');
  //closeButtonElement.classList.add('modal-close');
  //closeButtonElement.innerText = 'Close';
  var closeButtonElement =$('<button class="modal-close">close</button>');


  // adding event listener to close modal when clicked on button
  
  //closeButtonElement.addEventListener('click', hideModal);
  
  $(closeButtonElement).on('click', hideModal);
  
 // window.addEventListener('keydown', (e) => {
 //  var $modalContainer = document.querySelector('modal-container');
 //   if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
  //    hideModal();  
  //  }
  //});



  
 // $modalContainer.addEventListener('click', e => {
 //   var target = e.target;
 //   if (target === $modalContainer) {
 //     hideModal();
 //   }
//});



 // function hideModal() {
   // var $modalContainer = document.querySelector('modal-container');
    //$modalContainer.classList.remove('is-visible');
 // };

  function hideModal() {
    $modalContainer.removeClass('is-visible')
  };




  
  //creating element for name in modal content
  //var nameElement = document.createElement('h1');
 // nameElement.innerText = item.name;
  var nameElement = $('<h1>' + item.name + '</h1>');
  


  // creating img in modal content
  //var imageElement = document.createElement('img');
  //imageElement.classList.add('modal-img');
  //imageElement.setAttribute('src', item.imageUrl);                                                                                   
  var imageElement = $('<img class="modal-img">' + item.imageUrl +'</img>');
  
  
  //creating element for height in modal content
  //var heightElement = document.createElement('p');
  // heightElement.innerText = 'height : ' + item.height;
  var heightElement = $('<p>' + item.height + '</p>');
  
  //appending modal content to webpage
  
  $(closeButtonElement).append('$modal');
  $(nameElement).append('$modal');
  $(imageElement).append('$modal');
  $(heightElement).append('$modal');
  $($modal).append('$modalcontainer');
  
  
  //modal.appendChild(closeButtonElement);
 // modal.appendChild(nameElement);
 // modal.appendChild(imageElement); 
 // modal.appendChild(heightElement);
 // $modalContainer.appendChild(modal)
  
  
};
  