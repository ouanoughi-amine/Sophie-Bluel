

document.addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      //console.error("Erreur:", data.message);
      const errorMessage = document.querySelector(".message-erreur");
      console.log(errorMessage);
      errorMessage.textContent = "Erreur d'utilisateur ou de mot de passe, veuillez réessayer";
  
    } else {
      const data = await response.json();
      console.log("Utilisateur connecté ! Token:");
      sessionStorage.setItem('userToken', data.token);
      window.location.href = 'index.html';
    
      // Stockez le token où vous le souhaitez (par exemple, dans localStorage)
    }
  }
   catch (error) {
    alert(`Erreur lors de l'appel API: ${error}`);
    
  }
});
