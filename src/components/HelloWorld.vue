<template>
  <div class="layout">
    <!-- Sidebar (like ChatGPT) -->
    <aside class="sidebar">
      <div class="sidebar-header">Conversations</div>
      <button class="new-chat">+ New Chat</button>
      <div class="convo-list">
        <div class="convo-item">Chat 1</div>
        <div class="convo-item">Chat 2</div>
      </div>
    </aside>

    <!-- Main Chat Area -->
    <div class="main">
      <header class="topbar">
        <h1 class="title">ChatGPT-Style Chat</h1>
      </header>

      <main class="messages">
        <div v-for="(msg, index) in messages" :key="index" class="message-wrap">
          <div
            :class="msg.role === 'user' ? 'bubble user' : 'bubble assistant'"
          >
            {{ msg.content }}
          </div>
        </div>
      </main>

      <footer class="footer">
        <form @submit.prevent="sendMessage" class="input-row">
          <input
            v-model="input"
            type="text"
            placeholder="Send a message..."
            class="input"
          />
          <button type="submit" class="btn">Send</button>
        </form>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const input = ref("");
const messages = ref([
  { role: "assistant", content: "Hello! How can I help you today?" },
]);

function sendMessage() {
  if (!input.value.trim()) return;

  messages.value.push({ role: "user", content: input.value });

  setTimeout(() => {
    messages.value.push({
      role: "assistant",
      content: "This is a mock reply.",
    });
  }, 600);

  input.value = "";
}
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  background: #fff;
}

/* Full layout like ChatGPT */
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #202123;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.sidebar-header {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 1rem;
}
.new-chat {
  width: 100%;
  padding: 0.75rem;
  background: #343541;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
}
.new-chat:hover {
  background: #40414f;
}

.convo-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.convo-item {
  padding: 0.75rem;
  background: #343541;
  border-radius: 0.5rem;
  cursor: pointer;
}
.convo-item:hover {
  background: #3c3d47;
}

/* Main area (chat) */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f7f7f8;
}

.topbar {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  background: white;
}
.title {
  margin: 0;
  font-size: 1rem;
  color: #555;
}

.messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-wrap {
  display: flex;
  width: 100%;
}

.bubble {
  max-width: 750px;
  padding: 0.75rem 1rem;
  border-radius: 0.7rem;
}
.bubble.user {
  background: #0b93f6;
  color: white;
  margin-left: auto;
}
.bubble.assistant {
  background: white;
  border: 1px solid #ddd;
  color: #222;
}

.footer {
  padding: 1rem;
  background: white;
  border-top: 1px solid #ddd;
}

.input-row {
  display: flex;
  gap: 0.5rem;
}
.input {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.btn {
  padding: 0.75rem 1.25rem;
  background: #10a37f;
  color: white;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}
.btn:hover {
  background: #0e8769;
}
</style>
