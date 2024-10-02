// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzxpoiDIzCXRX9L2iRuQ9KSPai6stkXNI",
  authDomain: "anon-msgs.firebaseapp.com",
  projectId: "anon-msgs",
  storageBucket: "anon-msgs.appspot.com",
  messagingSenderId: "826610652586",
  appId: "1:826610652586:web:ee9a2b94322936ab6407d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Encryption function using AES
export function encryptMessage(message, key) {
  return CryptoJS.AES.encrypt(message, key).toString();
}

// Decryption function using AES
export function decryptMessage(encryptedMessage, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Function to create a new chat
export function createChat(chatCode, onMessageUpdate) {
  const chatRef = ref(database, "chats/" + chatCode);

  // Listen for new messages
  onValue(chatRef, (snapshot) => {
    const messages = snapshot.val();
    onMessageUpdate(messages);
  });

  // Set initial activity time
  update(chatRef, { lastActive: new Date().toISOString() });
}

// Function to send a message
export function sendMessage(chatCode, message) {
  const chatRef = ref(database, "chats/" + chatCode);
  push(chatRef, { message });

  // Update last activity time
  update(chatRef, { lastActive: new Date().toISOString() });
}

// Function to generate a random chat code
export function generateChatCode() {
  return Math.random().toString(36).substr(2, 8);
}