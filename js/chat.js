// Encryption function using AES
function encryptMessage(message, key) {
  return CryptoJS.AES.encrypt(message, key).toString();
}

// Decryption function using AES
function decryptMessage(encryptedMessage, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Function to create a new chat
window.createChat = function createChat() {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("create-chat").style.display = "block";
  const chatCode = generateChatCode();
  document.getElementById("chat-code-display").innerText = `Chat Code: ${chatCode}`;

  const chatRef = ref(database, "chats/" + chatCode);
  const chatScreen = document.getElementById("chat-screen");
  onValue(chatRef, (snapshot) => {
    const messages = snapshot.val();
    chatScreen.innerHTML = ""; // Clear screen before re-rendering messages
    if (messages) {
      for (const messageKey in messages) {
        const encryptedMessage = messages[messageKey].message;
        if (encryptedMessage) {
          const decryptedMessage = decryptMessage(encryptedMessage, chatCode);
          const messageElement = document.createElement("div");
          messageElement.innerText = decryptedMessage;
          messageElement.classList.add("message");
          chatScreen.appendChild(messageElement);
        }
      }
      chatScreen.scrollTop = chatScreen.scrollHeight; // Scroll to bottom
    }
  });

  // Set initial activity time
  update(chatRef, { lastActive: new Date().toISOString() });
};

// Function to send a message
window.sendMessage = function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  if (message.trim() !== "") {
    const chatCode = document
      .getElementById("chat-code-display")
      .innerText.split(" ")[2];

    const encryptedMessage = encryptMessage(`[${userNumber}] ${message}`, chatCode);

    const chatRef = ref(database, "chats/" + chatCode);
    push(chatRef, {
      message: encryptedMessage, // Send encrypted message
    });
    messageInput.value = ""; // Clear input

    // Update last activity time
    update(chatRef, { lastActive: new Date().toISOString() });
  }
};

// Function to join an existing chat
window.joinChat = function joinChat() {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("join-chat").style.display = "block";
};

// Function to enter a chat using chat code
window.enterChat = function enterChat() {
  const chatCodeInput = document.getElementById("chat-code-input");
  const chatCode = chatCodeInput.value.trim();
  if (chatCode !== "") {
    document.getElementById("join-chat").style.display = "none";
    document.getElementById("create-chat").style.display = "block";
    document.getElementById("chat-code-display").innerText = `Chat Code: ${chatCode}`;

    const chatRef = ref(database, "chats/" + chatCode);
    const chatScreen = document.getElementById("chat-screen");
    onValue(chatRef, (snapshot) => {
      const messages = snapshot.val();
      chatScreen.innerHTML = ""; // Clear screen before re-rendering messages
      if (messages) {
        for (const messageKey in messages) {
          const encryptedMessage = messages[messageKey].message;
          if (encryptedMessage) {
            const decryptedMessage = decryptMessage(encryptedMessage, chatCode);
            const messageElement = document.createElement("div");
            messageElement.innerText = decryptedMessage;
            messageElement.classList.add("message");
            chatScreen.appendChild(messageElement);
          }
        }
        chatScreen.scrollTop = chatScreen.scrollHeight; // Scroll to bottom
      }
    });

    // Set initial activity time
    update(chatRef, { lastActive: new Date().toISOString() });
  }
};

// Function to go back to main menu
window.backToMainMenu = function backToMainMenu() {
  document.getElementById("create-chat").style.display = "none";
  document.getElementById("join-chat").style.display = "none";
  document.getElementById("main-menu").style.display = "block";
};

// Function to generate a random chat code
function generateChatCode() {
  return Math.random().toString(36).substr(2, 8);
}

// Function to download chat as TXT file
window.downloadChat = function downloadChat() {
  const chatScreen = document.getElementById("chat-screen");
  const chatCode = document
    .getElementById("chat-code-display")
    .innerText.split(" ")[2];
  const chatContent = chatScreen.innerText;

  const blob = new Blob([chatContent], {
    type: "text/plain;charset=utf-8",
  });
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `chat_${chatCode}.txt`;
  downloadLink.click();
};