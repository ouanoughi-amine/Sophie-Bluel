
//s'assurer que le DOM est entièrement chargé
window.addEventListener('DOMContentLoaded', (event) => { 
    const loginLink   = document.querySelector('#login');
    const logoutLink  = document.querySelector('#logout');
	const navBar      = document.querySelector('#nav-bar');
	const filterProjet= document.querySelector('.filters');
	const btnModifier = document.querySelector('.modal-btn');

    if(sessionStorage.getItem('userToken')) {
        // Si l'utilisateur est connecté
        loginLink.style.display = 'none';  
        logoutLink.style.display = 'block'; 
        navBar.style.display = 'flex';
		filterProjet.style.display='none';
		
	} else {
        // Si l'utilisateur n'est pas connecté
        loginLink.style.display = 'block';  
        logoutLink.style.display = 'none';  
        navBar.style.display = 'none';  
		btnModifier.style.display = 'none';      
	}
});
const logoutLink = document.querySelector('#logout');
logoutLink.addEventListener('click', (event)=>{
	sessionStorage.removeItem('userToken');
});
// Fonction pour récupérer les données depuis l'API
function getWorks() {
	return fetch("http://localhost:5678/api/works").then((response) => {
	  if (!response.ok) {
		throw new Error("Network response was not ok");
	  }
	  return response.json();
	});
  }
  
  // Fonction pour construire les éléments HTML
  function buildGalleryItem(work) {
	const figure = document.createElement("figure");
  
	const img = document.createElement("img");
	img.src = work.imageUrl;
	img.alt = work.title;
  
	figure.setAttribute("category", `${work.category.id}`);
	figure.setAttribute("data-id", `${work.id}`);
	figure.setAttribute("id", `${work.id}`);
	figure.appendChild(img);
  
	const figcaption = document.createElement("figcaption");
	figcaption.textContent = work.title;
	figure.appendChild(figcaption);
	return figure;
  }
  // Fonction pour afficher les éléments dans la galerie
  function displayWorks(works) {
	const galleryDiv = document.querySelector(".gallery");
	works.forEach((work) => {
	  const galleryItem = buildGalleryItem(work);
	  galleryDiv.appendChild(galleryItem);
	});
  }
  // Fonction principale pour récupérer et afficher les éléments
  function main() {
	getWorks()
	  .then(displayWorks)
	  .catch((error) => {
		console.error("There was a problem:", error.message);
	  });
  }
  function getCategories() {
	return fetch("http://localhost:5678/api/categories").then((response) => {
	  if (!response.ok) {
		throw new Error("Network response was not ok");
	  }
	  // console.log(response.json());
	  return response.json();
	});
  }
  function displayCategoriesButtons(categories) {
	const filterDiv = document.querySelector(".filters");
	// console.log("categories : ",categories);
  
	const allButton = document.createElement("button");
	allButton.innerHTML = "TOUS";
	allButton.classList=("filter-button");
	
	allButton.addEventListener("click", getFilter);
	filterDiv.appendChild(allButton);
  
	for (let i = 0; i < categories.length; i++) {
	  console.log(i);
	  const newButton = document.createElement("button");
	  newButton.innerHTML = categories[i].name;
	  newButton.id = categories[i].id;

	//   newButton.setAttribute("categoryId");
	console.log(newButton);
	 
	  newButton.classList=("filter-button");
	  newButton.addEventListener("click", getFilter);
	  console.log(newButton);
	  filterDiv.appendChild(newButton);
	}
  }
  function getFilter() {
	const filterClicked = event.target;
	const filtreId = event.target.id;
	let allButton = document.querySelectorAll(".filter-button")
	allButton.forEach((element) => {
		element.classList.remove("filter-button-active")
	});

	filterClicked.classList.add("filter-button-active");
	
	const galleryDiv = document.querySelector(".gallery");
	// console.log(galleryDiv.children);
	const figures = galleryDiv.querySelectorAll("figure");
  
	figures.forEach((figure) => {
	  // Vérifiez la valeur de l'attribut 
	  const category = figure.getAttribute("category");

	  figure.style.display = "none";
	  if (filtreId === "") {
		figure.style.display = "block";
	  }
	  if (category == filtreId) {
		// Si la valeur n'est pas 'Objet', cachez l'élément
		figure.style.display = "block";
	  }
	});
  }
  // Exécutez la fonction principale
    getCategories()
	.then((resultat) => {
	displayCategoriesButtons(resultat);
	})
	.catch((err) => {
	  console.log("error while fetching the categories : ", err);
	});
  main();
//   *************modal**********
const modalContainer = document.querySelector(".modal-container");
const modalTiggers   = document.querySelectorAll(".modal-trigger");
const btnAdd = document.querySelector(".btn-add");
const modalAdd = document.querySelector(".modal-add");
const modalDelete = document.querySelector(".modal-delete");

btnAdd.addEventListener("click", () => {
	modalDelete.style.display = 'none';
	modalAdd.style.display = 'block';
});
const btnArrow = document.querySelector(".btn-arrow");

btnArrow.addEventListener("click", ( ) =>{
	modalDelete.style.display = 'block';
	modalAdd.style.display = 'none';
});
modalTiggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
	modalAdd.style.display = 'none';
	modalDelete.style.display = 'block';
	modalContainer.classList.toggle("active")
}
// récupérer les projets 
function getWorkImg(works) {
    fetch(`http://localhost:5678/api/works`, {
    })
    .then(response => response.json())
    .then(works => {
       works.forEach(work => {
		const galleryModal = document.querySelector(".projets");
		// let projetMod = document.querySelector(".projets");
		const galleryElementModal = document.createElement("figure");
		galleryElementModal.dataset.id = work.id;
		
		const imageElementModal = document.createElement("img");
		imageElementModal.src = work.imageUrl; 
		imageElementModal.crossOrigin = "";
		
		const buttonTrashModal = document.createElement("button");
		buttonTrashModal.className = "trash-button-modal";
		const iconeTrashModal = document.createElement("i");
		iconeTrashModal.className = "fa-solid fa-trash-can";

		buttonTrashModal.addEventListener("click", function(event){
			event.preventDefault();
			event.stopPropagation(); 
			deleteWork(work.id);
		});
		buttonTrashModal.appendChild(iconeTrashModal);
		galleryElementModal.appendChild(buttonTrashModal);
		galleryElementModal.appendChild(imageElementModal);
		galleryModal.appendChild(galleryElementModal);
		
		});
    })
    .catch(error => {
        console.error('Erreur :', error);
    });
}
getWorkImg();

const token = sessionStorage.getItem("userToken");

// Fonction de "Suppresion" de projet de la "Gallery" "Modale".
async function deleteWork(workId) {
	
	// Suppression du projet via l'API en fonction de l'ID du Projet (work.id).
	const deleteResponse = await fetch(`http://localhost:5678/api/works/figure[data-id="${workId}"]`, {
		method: "DELETE",
		headers: {
			"Authorization": "Bearer " + token
		},
	});

	// Si réponse de suppression de l'API est OK, alors on supprime le projet du DOM (Gallerie et Modale).
	if (deleteResponse.ok) {
		const workToRemove = document.querySelectorAll(`figure[data-id="${workId}"]`);

		for(let i = 0; i < workToRemove.length; i++){
			workToRemove[i].remove();
		};
		
	} else {
		return alert("Échec de la suppresion du projet");
	};
};

//  *********** ajouter des projets à la modale ***************




  
 







