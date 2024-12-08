const apiUrl = "http://localhost:3000/trips"; // Change si ton serveur est sur un autre port ou domaine

document.getElementById("searchButton").addEventListener("click", chercherVoyages);

async function chercherVoyages() {
  const destination = document.getElementById("destination").value.trim();
  const resultatsContainer = document.getElementById("resultats");

  // Effacer les résultats précédents
  resultatsContainer.innerHTML = "";

  if (!destination) {
    resultatsContainer.innerHTML = "<p>Veuillez entrer une destination.</p>";
    return;
  }

  try {
    // Faire une requête GET avec la destination en paramètre
    const response = await fetch(`${apiUrl}?destination=${destination}`);
    const data = await response.json();

    if (response.ok) {
      // Afficher les voyages trouvés
      if (data.length === 0) {
        resultatsContainer.innerHTML = "<p>Aucun voyage trouvé pour cette destination.</p>";
      } else {
        data.forEach((trip) => {
          const tripElement = document.createElement("div");
          tripElement.classList.add("trip");
          tripElement.innerHTML = `
            <h3>${trip.destination}</h3>
            <p><strong>Prix :</strong> ${trip.price}€</p>
            <p><strong>Contact :</strong> ${trip.contact}</p>
            <p><strong>Email :</strong> ${trip.email}</p>
            <p><strong>Dates :</strong> ${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}</p>
            <p><strong>Description :</strong> ${trip.description || "Aucune description"}</p>
          `;
          resultatsContainer.appendChild(tripElement);
        });
      }
    } else {
      resultatsContainer.innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    resultatsContainer.innerHTML = "<p>Une erreur est survenue. Veuillez réessayer plus tard.</p>";
  }
}
