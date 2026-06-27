function startGame(){

    const name = document.getElementById("name").value.trim();

    const error = document.getElementById("error");

    if(name === ""){

        error.textContent = "Veuillez entrer votre prénom.";

        return;
    }

    localStorage.setItem("playerName", name);

    window.location.href = "game.html";

}
function startGame() {
    let prenom = document.getElementById("name").value;

    if (prenom.trim() === "") {
        document.getElementById("error").textContent = "Entre ton prénom 💖";
        return;
    }

    localStorage.setItem("prenom", prenom);

    // 👉 on ouvre le jeu
    window.location.href = "game.html";
}