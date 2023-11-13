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
  
	figure.setAttribute("category", `${work.category && work.category.id ? work.category.id : work.categoryId}`);
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
  
  async function getCategories() {
	const response = await fetch("http://localhost:5678/api/categories");
	 const categories = await response.json();

	if (!response.ok) {
		throw new Error("Network response was not ok");
	  }else{
	  return categories;
	  }
	};
  
  function displayCategoriesButtons(categories) {
	const filterDiv = document.querySelector(".filters");
	// console.log("categories : ",categories);
  
	const allButton = document.createElement("button");
	allButton.innerHTML = "TOUS";
	allButton.classList=("filter-button");
	
	allButton.addEventListener("click", getFilter);
	filterDiv.appendChild(allButton);
  
	for (let i = 0; i < categories.length; i++) {
	  const newButton = document.createElement("button");
	  newButton.innerHTML = categories[i].name;
	  newButton.id = categories[i].id;
	  newButton.classList=("filter-button");

	  newButton.addEventListener("click", getFilter);
	  
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

//   ************modal*********
const modalContainer = document.querySelector(".modal-container");
const modalTiggers   = document.querySelectorAll(".modal-trigger");
const btnAdd         = document.querySelector(".btn-add");
const modalAdd       = document.querySelector(".modal-add");
const modalDelete    = document.querySelector(".modal-delete");
const btnArrow       = document.querySelector(".btn-arrow");

btnAdd.addEventListener("click", () => {
	modalDelete.style.display = 'none';
	modalAdd.style.display = 'block';
});
btnArrow.addEventListener("click", () => {
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
		const galleryElementModal = document.createElement("figure");
		const imageElementModal   = document.createElement("img");
		const buttonTrashModal    = document.createElement("button");
		const iconeTrashModal     = document.createElement("i");
		galleryElementModal.dataset.id = work.id;
		
		imageElementModal.src = work.imageUrl; 
		imageElementModal.crossOrigin = "";
		
		buttonTrashModal.className = "trash-button-modal";
		iconeTrashModal.className = "fa-solid fa-trash-can";
		buttonTrashModal.addEventListener("click", function(){
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
	const deleteResponse = await fetch("http://localhost:5678/api/works/" + workId, {
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${token}`
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

//  ********* ajouter des projets à la modale *************

// 
const buttonValiderModal = document.querySelector("#button-valider-modal");
const inputAddImage      = document.querySelector("#input-add-image");

inputAddImage.addEventListener("change", () => {

	// Vérification de la taille de l'image ajouter à la "MODALE".
	if(inputAddImage.files[0].size <= 4 * 1024 * 1024){
    // réinitialisation de la zone "content-add-image"
	const contentAddImage = document.querySelector(".content-add-image");
		contentAddImage.innerHTML="";
	// Crée l'image à afficher 
	imagePreviewModal = document.createElement("img");
	imagePreviewModal.src = URL.createObjectURL(inputAddImage.files[0]);
	imagePreviewModal.className = ("image-preview-modal");

	contentAddImage.appendChild(imagePreviewModal);
	// ajout d'un click pour ajouter une autre photo (en cliquant sur l'image)
	imagePreviewModal.addEventListener("click", ()=> {
		inputAddImage.click();
	});
} else {
	inputAddImage.value = "";
	return alert("L'image est supérieure a 4mo")
};
});

//récupérer les catégories de l'api
async function formCategories() {
	const response = await fetch("http://localhost:5678/api/categories");
	 const categories = await response.json();
	// Parcourir les données de "categories" pour les ajouter au HTML et créer les options de la liste "SELECT"
	for(let i=0; i<categories.length; i++){
		const categoryModal = categories[i];
		// récupérer l'id du select
		const titleCategory = document.querySelector("#title-category");
		// créer les balises "option"
		const titleCategoryOptions= document.createElement("option");

		titleCategoryOptions.value = categoryModal.id;
		titleCategoryOptions.innerText = categoryModal.name;
		// ajout des balises option au "select"
		titleCategory.appendChild(titleCategoryOptions);
	}
};
  formCategories();
 
// validation du formulaire de la modale
const titleAdd          = document.querySelector("#title-add");
const titleCategory     = document.querySelector("#title-category");
const galleryModal      = document.querySelector(".projets");
const galleryDiv        = document.querySelector(".gallery"); 

buttonValiderModal.addEventListener("click",  (event) => {
	// Empêcher le formulaire de se soumettre et de rafraîchir la page.
	event.preventDefault();
   
  
	// Vérifier si tous les champs du formulaire sont valides.
	if (inputAddImage.checkValidity() === true && titleAdd.checkValidity() === true && titleCategory.checkValidity() === true) {
		 // masquer la "modalAdd" aprés qu'on a cliquer sur button valider
	modalAdd.style.display="none";
    // afficher la " modalDelete" aprés qu'on a cliquer sur button valider
	modalDelete.style.display="block";
	 postWork();
	} else {
	  // Afficher une erreur si tous les champs du formulaire ne sont pas valides.
	//   alert("Tous les champs sont requis");
	  const ErrorMessageAdd = document.querySelector(".error-message-add");
	  ErrorMessageAdd.textContent = "Tous les champs sont requis";
	}
  });

// ajouter les projet
async function postWork(works){
	// Création de l'objet FormData
	const formData = new FormData();

	formData.append("image", inputAddImage.files[0]);
	formData.append("title", titleAdd.value);
	formData.append("category", titleCategory.value);

	const token = sessionStorage.getItem("userToken");
	const addresponse = await fetch("http://localhost:5678/api/works/", {
		method:"post",
		headers: {
			"Authorization": `Bearer ${token}`,
			accept: "application/json"
		},
		body:formData
});
//  si la réponse est ok on ajoute le projet à la galerie et la modale
if(addresponse.ok){

	try {
		const jsonData = await addresponse.json(); 
		//  ajout de projet à la modale
		const galleryModal = document.querySelector(".projets");
		const galleryElementModal = document.createElement("figure");
		galleryElementModal.dataset.id = jsonData.id;
		
		const imageElementModal = document.createElement("img");
		imageElementModal.src = jsonData.imageUrl; 
		imageElementModal.crossOrigin = "";
		
		const buttonTrashModal = document.createElement("button");
		buttonTrashModal.className = "trash-button-modal";
		const iconeTrashModal = document.createElement("i");
		iconeTrashModal.className = "fa-solid fa-trash-can";
		buttonTrashModal.addEventListener("click", function(){
			
			deleteWork(jsonData.id);
		});
		buttonTrashModal.appendChild(iconeTrashModal);
		galleryElementModal.appendChild(buttonTrashModal);
		galleryElementModal.appendChild(imageElementModal);
		galleryModal.appendChild(galleryElementModal);

		// ajout de projet à la galerie
		const galleryDiv = document.querySelector(".gallery");
	
	  	const galleryItem = buildGalleryItem(jsonData);
	 	galleryDiv.appendChild(galleryItem);

	} catch (error) {
		console.error("Erreur lors de la lecture de l'ajout d'un  work:", error);
	}
} else {
	return alert("Échec de la l'ajout du projet");
};
};