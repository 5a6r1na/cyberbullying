<template>
  <div class="app">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-logo">G2</div>
        <div class="brand-text">
          <div class="brand-name">GROUP 2</div>
          <div class="brand-sub">LLM</div>
        </div>
      </div>

      <div class="sidebar-section-title">Recent</div>

      <div class="sidebar-chats">
        <button
          v-for="chat in chats"
          :key="chat.id"
          class="sidebar-chat"
          :class="{ active: chat.id === activeChatId }"
          @click="activeChatId = chat.id"
        >
          {{ chat.title }}
        </button>
      </div>
    </aside>

    <!-- MAIN -->
    <!-- TOP BAR -->

    <main class="main">
      <header class="topbar">
        <button class="new-chat-btn" @click="createNewChat">+ New Chat</button>
      </header>
      <!-- CHAT AREA -->
      <section class="chat-area" ref="chatWindowRef">
        <div
          v-for="message in activeChatMessages"
          :key="message.id"
          class="message-row"
          :class="message.role"
        >
          <div class="message-bubble">
            <p
              v-for="(line, i) in message.text.split('\n')"
              :key="i"
              class="message-line"
            >
              {{ line }}
            </p>
          </div>
        </div>
      </section>

      <!-- INPUT -->
      <footer class="composer">
        <div class="composer-box">
          <textarea
            v-model="draft"
            class="composer-input"
            placeholder="Ask me anything . . ."
            rows="1"
            @keydown.enter.exact.prevent="sendMessage"
          ></textarea>
          <button
            class="composer-send-btn"
            type="button"
            :disabled="!draft.trim()"
            @click="sendMessage"
          >
            ➤
          </button>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const chats = ref([
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    messages: [
      {
        id: 11,
        role: "user",
        text: "“Examples of cyberbullying messages”",
      },
      {
        id: 12,
        role: "assistant",
        text:
          "Messages like this can hurt others. Are you sure you want to post? You can check the following resources to get to know more about cyberbullying and its impact on others:\n" +
          "\n• National Mental Health Hotline : 988" +
          "\n• Cyberbullying Resources :" +
          "\n  • https://www.stopbullying.gov/cyberbullying/what-is-it" +
          "\n  • https://www.stopbullying.gov/prevention/how-to-prevent-bullying" +
          "\n  • https://www.stompoutbullying.org/wellness-rooms" +
          "\n  • https://www.unicef.org/stories/how-to-stop-cyberbullying",
      },
    ],
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet",
    messages: [],
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet",
    messages: [],
  },
  {
    id: 4,
    title: "Lorem ipsum dolor sit amet",
    messages: [],
  },
]);

const activeChatId = ref(chats.value[0]?.id ?? null);
const draft = ref("");
const chatWindowRef = ref(null);

const activeChat = computed(
  () => chats.value.find((c) => c.id === activeChatId.value) ?? chats.value[0]
);
const activeChatMessages = computed(() => activeChat.value?.messages ?? []);

const scrollToBottom = () => {
  const el = chatWindowRef.value;
  if (!el) return;
  requestAnimationFrame(() => {
    el.scrollTop = el.scrollHeight;
  });
};

onMounted(scrollToBottom);

watch(activeChatMessages, () => scrollToBottom(), { deep: true });

function createNewChat() {
  const newId = Date.now();
  const newChat = {
    id: newId,
    title: "New conversation",
    messages: [],
  };
  chats.value.unshift(newChat);
  activeChatId.value = newId;
}

function sendMessage() {
  const text = draft.value.trim();
  if (!text || !activeChat.value) return;

  const chat = activeChat.value;
  chat.messages.push({
    id: Date.now(),
    role: "user",
    text,
  });

  draft.value = "";

  setTimeout(() => {
    chat.messages.push({
      id: Date.now() + 1,
      role: "assistant",
      text: "Thanks for your message. This is a demo reply.\nYou can customize how assistant responses look here.",
    });
  }, 300);
}
</script>

<style scoped>
/* Layout */
.app {
  display: flex;
  height: 100vh;
  width: 100%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #111827;
  color: #e5e7eb;
  padding: 24px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
}

.brand-logo {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  color: #f9fafb;
}

.brand-text {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.9rem;
}

.brand-name {
  font-weight: 600;
}

.brand-sub {
  color: #a5b4fc;
  font-weight: 700;
}

.sidebar-section-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9ca3af;
  margin-bottom: 12px;
}

.sidebar-chats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-chat {
  border: none;
  background: transparent;
  color: #e5e7eb;
  text-align: left;
  padding: 8px 0;
  font-size: 0.9rem;
  cursor: pointer;
  opacity: 0.8;
}

.sidebar-chat.active,
.sidebar-chat:hover {
  opacity: 1;
}

/* Main */
.main {
  flex: 1;
  background: #f4f3fb;
  display: flex;
  flex-direction: column;
  margin: 0 10%;
}

/* Top bar */
.topbar {
  display: flex;
  justify-content: flex-end;
  padding: 24px 5px;
  box-sizing: border-box;
}

.new-chat-btn {
  border: none;
  background: #a855f7;
  color: #f9fafb;
  padding: 1.5% 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(88, 28, 135, 0.3);
}

/* Chat area */
.chat-area {
  flex: 1;
  padding: 24px 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* messages */
.message-row {
  max-width: 640px;
}

.message-row.user {
  align-self: flex-end;
}

.message-row.assistant {
  align-self: flex-start;
}

/* user bubble */
.message-row.user .message-bubble {
  background: #a855f7;
  color: #f9fafb;
  padding: 1.5% 20px;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* assistant card */
.message-row.assistant .message-bubble {
  background: #ffffff;
  color: #111827;
  padding: 1.5% 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  line-height: 1.6;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.message-line + .message-line {
  margin-top: 4px;
}

/* Composer */
.composer {
  padding: 0 80px 32px;
  box-sizing: border-box;
}

.composer-box {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background: #f9fafb;
  border-radius: 9999px;
  border: 1px solid #e5d9ff;
  display: flex;
  align-items: center;
  padding: 8px 14px;
  box-shadow: 0 16px 30px rgba(148, 163, 184, 0.25);
  gap: 8px;
}

.composer-input {
  flex: 1;
  border: none;
  background: transparent;
  resize: none;
  outline: none;
  font-size: 0.95rem;
  color: #111827;
}

.composer-input::placeholder {
  color: #9ca3af;
}

.composer-icon-btn {
  border: none;
  background: transparent;
  font-size: 1rem;
  cursor: pointer;
  color: #9ca3af;
}

.composer-send-btn {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  border: none;
  background: #a855f7;
  color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.composer-send-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

/* Small screens */
@media (max-width: 900px) {
  .sidebar {
    display: none;
  }

  .topbar {
    padding-inline: 16px;
  }

  .chat-area {
    padding-inline: 16px;
  }

  .composer {
    padding-inline: 16px;
  }
}
</style>

<!-- global so the root fills the window -->
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: #f4f3fb;
}
</style>
