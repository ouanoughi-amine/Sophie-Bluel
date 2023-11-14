// au click sur se conecter 
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
      const errorMessage = document.querySelector(".message-error");
      errorMessage.textContent = "Erreur d'utilisateur ou de mot de passe, veuillez réessayer";
    } else {
      const data = await response.json();
      // Stockez le token 
      sessionStorage.setItem('userToken', data.token);
      window.location.href = 'index.html';
    }
  }
  // si ya eu erreur on l'a rattrape avec un "catch"
   catch (error) {
    alert(`Erreur lors de l'appel API: ${error}`);
  }
});
