// // declaration des variables 
// const email    = document.querySelector("#email");
// console.log(email);
// const password = document.querySelector("#password");
// console.log(password);






// // function getEmail () {
// //   if(!email === "@")
// //   alert("veuillez insérez le @ ")
  
// // }
// // getEmail()

// const btn = document.querySelector('#login');

// // Empêche la soumission du formulaire
// btn.addEventListener('click', (event) => {
//   event.preventDefault();
  

//   // Charge l'URL de la page principale
//   window.location.href = 'http://127.0.0.1:5500/FrontEnd/index.html';
// });

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Importez les bibliothèques nécessaires

// Définissez les variables d'API

// Importez les bibliothèques nécessaires


// Définissez les variables d'API
// Importez les bibliothèques nécessaires


// Définissez les variables d'API
const API_URL = "http://localhost:5678/api/users/login";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";

// Créez une fonction pour soumettre le formulaire de connexion
function submitLoginForm() {
  // Obtenez les valeurs du formulaire


  // Vérifiez que les valeurs du formulaire ne sont pas vides
  // if (!email || !password) {
  //   alert("Veuillez remplir tous les champs du formulaire.");
  //   return;
  // }

  // Créez les données d'authentification
   "sophie.bluel@test.tld";
  "S0phie";
const data={
  email :  "sophie.bluel@test.tld",
  password : "S0phie",
}
  // Appelez l'API d'authentification
  fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // Si la réponse est un succès, redirigez l'utilisateur vers la page des travaux
      if (response.status === 200) {
        window.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
      } else {
        // Sinon, affichez un message d'erreur
        alert(response.statusText);
      }
    })
    .catch((error) => {
      // Affiche une erreur si l'API ne répond pas
      console.log(error);
    });
}

// Ajoutez un événement de clic au bouton de connexion
document.querySelector("#login").addEventListener("click", submitLoginForm);
