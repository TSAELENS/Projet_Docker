document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const messageList = document.getElementById("messageList");
    const messageContent = document.getElementById("messageContent");
    const messageListContainer = document.getElementById("messageListContainer");
    const messageContentContainer = document.getElementById("messageContentContainer");
    const sendMessageButton = document.getElementById("sendMessageButton");
    const pseudoInput = document.getElementById("pseudo");
    const pseudoContainer = document.getElementById("pseudoContainer");

    let pseudo = "";

    // Cachez initialement la zone de messages et le formulaire d'envoi
    messageListContainer.style.display = "none";
    messageContentContainer.style.display = "none";

    function loadMessages() {
        fetch('/messages')
            .then(response => response.json())
            .then(data => {
                messageList.innerHTML = '';
                data.forEach(message => {
                    const messageItem = document.createElement("li");
                    messageItem.textContent = `${message.pseudo}: ${message.content}`;
                    messageList.appendChild(messageItem);
                });
            })
            .catch(error => console.error('Erreur lors du chargement des messages:', error));
    }

    startButton.addEventListener("click", function () {
        pseudo = pseudoInput.value.trim();

        if (pseudo) {
            pseudoContainer.style.display = "none";
            messageListContainer.style.display = "block";
            messageContentContainer.style.display = "block";
            loadMessages(); // Charger les messages seulement après que le pseudo soit entré
        } else {
            alert("Veuillez entrer un pseudo.");
        }
    });

    sendMessageButton.addEventListener("click", function () {
        const content = messageContent.value.trim();

        if (content) {
            fetch('/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pseudo: pseudo, content: content })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La réponse du réseau n\'était pas ok.');
                }
                return response.text();
            })
            .then(data => {
                console.log(data);
                loadMessages(); // Recharger les messages après envoi
                messageContent.value = "";
            })
            .catch(error => {
                console.error('Erreur lors de la tentative d\'envoi du message:', error);
            });
        } else {
            alert("Veuillez entrer un message avant d'envoyer.");
        }
    });
});
