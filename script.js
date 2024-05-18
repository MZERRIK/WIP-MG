document.addEventListener("DOMContentLoaded", function() {
    const creerCommandeForm = document.getElementById("creerCommandeForm");
    const commandesListe = document.getElementById("commandesListe");
    const rechercherInput = document.getElementById("rechercheInput");
    const rechercherBtn = document.getElementById("rechercherBtn");

    creerCommandeForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const numeroCommande = document.getElementById("numeroCommande").value;
        const nomClient = document.getElementById("nomClient").value;
        const telephone = document.getElementById("telephone").value;
        const description = document.getElementById("description").value;
        const etat = document.getElementById("etat").value;

        creerCommande(numeroCommande, nomClient, telephone, description, etat);
        creerCommandeForm.reset();
    });

    rechercherBtn.addEventListener("click", function() {
        const termeRecherche = rechercherInput.value.trim().toLowerCase();
        const commandes = Array.from(commandesListe.querySelectorAll("li"));

        commandes.forEach(function(commande) {
            const numeroCommande = commande.querySelector("strong:first-of-type").textContent.toLowerCase();
            if (numeroCommande.includes(termeRecherche)) {
                commande.style.display = "block";
            } else {
                commande.style.display = "none";
            }
        });
    });

    function creerCommande(numeroCommande, nomClient, telephone, description, etat) {
        const commandeHTML = `
            <li>
                <strong>Numéro de commande:</strong> ${numeroCommande}<br>
                <strong>Nom du client:</strong> ${nomClient}<br>
                <strong>Téléphone:</strong> ${telephone}<br>
                <strong>Description:</strong> ${description}<br>
                <strong>État:</strong>
                <select>
                    <option value="en_attente" ${etat === 'en_attente' ? 'selected' : ''}>En Attente</option>
                    <option value="en_cours" ${etat === 'en_cours' ? 'selected' : ''}>En Cours</option>
                    <option value="terminee" ${etat === 'terminee' ? 'selected' : ''}>Terminée</option>
                </select>
            </li>
        `;
        commandesListe.insertAdjacentHTML("beforeend", commandeHTML);
    }
});
rechercherBtn.addEventListener("click", function() {
    const termeRecherche = rechercherInput.value.trim().toLowerCase();
    const commandes = Array.from(commandesListe.querySelectorAll("li"));

    commandes.forEach(function(commande) {
        const numeroCommande = commande.querySelector("strong:first-of-type").textContent.toLowerCase();
        if (numeroCommande.includes(termeRecherche)) {
            commande.style.display = "block";
        } else {
            commande.style.display = "none";
        }
    });
});
creerCommandeForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const numeroCommande = document.getElementById("numeroCommande").value;
    const nomClient = document.getElementById("nomClient").value;
    const telephone = document.getElementById("telephone").value;
    const description = document.getElementById("description").value;
    const etat = document.getElementById("etat").value;

    const formData = {
        numeroCommande: numeroCommande,
        nomClient: nomClient,
        telephone: telephone,
        description: description,
        etat: etat
    };

    fetch('/enregistrer-commande', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Erreur lors de la sauvegarde de la commande.');
    })
    .then(data => {
        console.log('Commande enregistrée avec succès:', data);
        // Faire quelque chose après l'enregistrement réussi, par exemple afficher un message à l'utilisateur
    })
    .catch(error => {
        console.error('Erreur:', error);
        // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
    });

    creerCommandeForm
