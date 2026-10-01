import {
  Bot,
  ChevronDown,
  MessageCircle,
  Send,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { AnimatePresence, motion } from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

// =========================
// Quick Questions
// =========================

const quickQuestions = [
  "What's on the menu?",
  "What are your opening hours?",
  "Where are you located?",
  "Do you offer delivery?",
];

// =========================
// Initial Message
// =========================

const getInitialMessage = () => ({
  id: Date.now(),
  sender: "bot",
  text: "Hello! 👋 Welcome to TasteBite. I'm your AI assistant. Ask me anything about our menu, prices, orders, delivery, opening hours, or restaurant.",
});

// =========================
// ChatBot Component
// =========================

function ChatBot() {
  const { token } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    getInitialMessage(),
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const inputRef = useRef(null);

  // =========================
  // Scroll To Latest Message
  // =========================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, loading]);

  // =========================
  // Focus Input
  // =========================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // =========================
  // Escape Key
  // =========================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  // =========================
  // Send Message
  // =========================

  const sendMessage = async (messageText) => {
    const trimmedMessage =
      messageText.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    // =========================
    // Add User Message
    // =========================

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setInput("");

    setLoading(true);

    try {
      // =========================
      // Chatbot API Endpoint
      // =========================

      const endpoint =
        `${API_BASE_URL}/chat`;

      // =========================
      // Request Headers
      // =========================

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization =
          `Bearer ${token}`;
      }

      // =========================
      // API Request
      // =========================

      const response = await fetch(
        endpoint,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            message: trimmedMessage,
          }),
        }
      );

      // =========================
      // Parse Response
      // =========================

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to get an AI response."
        );
      }

      // =========================
      // Add AI Message
      // =========================

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply,
      };

      setMessages(
        (currentMessages) => [
          ...currentMessages,
          botMessage,
        ]
      );
    } catch (error) {
      console.error(
        "AI chatbot request error:",
        error
      );

      setMessages(
        (currentMessages) => [
          ...currentMessages,
          {
            id: Date.now() + 1,
            sender: "bot",
            text:
              "Sorry, I'm having trouble connecting to the AI assistant right now. Please try again in a moment.",
            error: true,
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Submit Form
  // =========================

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage(input);
  };

  // =========================
  // Quick Question
  // =========================

  const handleQuickQuestion = (
    question
  ) => {
    sendMessage(question);
  };

  // =========================
  // Clear Chat
  // =========================

  const handleClearChat = () => {
    if (loading) {
      return;
    }

    setMessages([
      getInitialMessage(),
    ]);
  };

  // =========================
  // Toggle Chat
  // =========================

  const handleToggleChat = () => {
    setIsOpen(
      (current) => !current
    );
  };

  // =========================
  // Render
  // =========================

  return (
    <>
      {/* =====================================
          CHAT WINDOW
      ====================================== */}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}

            <motion.button
              type="button"
              aria-label="Close chatbot"
              onClick={() =>
                setIsOpen(false)
              }
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-[99] bg-black/30 backdrop-blur-[2px] md:hidden"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 18,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 18,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              className="
                fixed
                bottom-[5.25rem]
                left-3
                right-3
                z-[100]
                flex
                max-h-[calc(100dvh-6.5rem)]
                w-auto
                flex-col
                overflow-hidden
                rounded-[1.35rem]
                border
                border-white/10
                bg-[#0d1015]
                shadow-2xl
                shadow-black/50
                sm:left-auto
                sm:right-6
                sm:w-[390px]
                md:bottom-[5.5rem]
              "
            >
              {/* =================================
                  HEADER
              ================================== */}

              <div className="relative shrink-0 border-b border-white/[0.08] bg-[#11151c] px-4 py-3.5 sm:px-5 sm:py-4">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

                <div className="flex items-center justify-between gap-3">
                  {/* Bot Identity */}

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                      <Bot size={19} />

                      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#11151c] bg-emerald-400" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate text-sm font-bold text-white">
                          TasteBite AI
                        </h3>

                        <Sparkles
                          size={12}
                          className="shrink-0 text-orange-400"
                        />
                      </div>

                      <p className="mt-0.5 text-[10px] text-slate-500">
                        AI Assistant · Online
                      </p>
                    </div>
                  </div>

                  {/* Header Buttons */}

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={
                        handleClearChat
                      }
                      disabled={loading}
                      title="Clear chat"
                      aria-label="Clear chat"
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-500
                        transition
                        hover:bg-white/[0.06]
                        hover:text-orange-400
                        active:scale-95
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <MessageCircle
                        size={15}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setIsOpen(false)
                      }
                      title="Close chat"
                      aria-label="Close chat"
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-500
                        transition
                        hover:bg-white/[0.06]
                        hover:text-white
                        active:scale-95
                      "
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* =================================
                  MESSAGES
              ================================== */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  px-3
                  py-4
                  sm:px-4
                  sm:py-4
                  [scrollbar-color:rgba(255,255,255,0.10)_transparent]
                  [scrollbar-width:thin]
                "
              >
                <div className="space-y-3.5">
                  {messages.map(
                    (message) => {
                      const isBot =
                        message.sender ===
                        "bot";

                      return (
                        <motion.div
                          key={message.id}
                          initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.98,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className={`flex items-end gap-2 ${
                            isBot
                              ? "justify-start"
                              : "justify-end"
                          }`}
                        >
                          {/* Bot Icon */}

                          {isBot && (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-orange-400/10 bg-orange-500/[0.08] text-orange-400">
                              <Bot
                                size={14}
                              />
                            </div>
                          )}

                          {/* Message Bubble */}

                          <div
                            className={`
                              max-w-[82%]
                              break-words
                              rounded-2xl
                              px-3.5
                              py-2.5
                              text-[11px]
                              leading-[1.65]
                              sm:max-w-[78%]
                              sm:text-xs
                              ${
                                isBot
                                  ? "rounded-bl-md border border-white/[0.07] bg-[#151a22] text-slate-300"
                                  : "rounded-br-md bg-orange-500 text-white shadow-lg shadow-orange-500/10"
                              }
                              ${
                                message.error
                                  ? "border-red-500/20 bg-red-500/[0.08] text-red-300 shadow-none"
                                  : ""
                              }
                            `}
                          >
                            {message.text}
                          </div>

                          {/* User Icon */}

                          {!isBot && (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.06] text-slate-400">
                              <User
                                size={14}
                              />
                            </div>
                          )}
                        </motion.div>
                      );
                    }
                  )}

                  {/* =================================
                      TYPING INDICATOR
                  ================================== */}

                  {loading && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="flex items-end gap-2"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-orange-400/10 bg-orange-500/[0.08] text-orange-400">
                        <Bot size={14} />
                      </div>

                      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/[0.07] bg-[#151a22] px-4 py-3">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.3s]" />

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.15s]" />

                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400" />
                      </div>
                    </motion.div>
                  )}

                  <div
                    ref={messagesEndRef}
                  />
                </div>
              </div>

              {/* =================================
                  QUICK QUESTIONS
              ================================== */}

              {messages.length <=
                1 &&
                !loading && (
                  <div className="shrink-0 border-t border-white/[0.06] px-3 py-3 sm:px-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                        Try asking
                      </p>

                      <Sparkles
                        size={11}
                        className="text-orange-400/50"
                      />
                    </div>

                    <div
                      className="
                        flex
                        gap-2
                        overflow-x-auto
                        pb-1
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                      "
                    >
                      {quickQuestions.map(
                        (question) => (
                          <button
                            key={
                              question
                            }
                            type="button"
                            onClick={() =>
                              handleQuickQuestion(
                                question
                              )
                            }
                            disabled={
                              loading
                            }
                            className="
                              shrink-0
                              rounded-lg
                              border
                              border-white/[0.07]
                              bg-white/[0.025]
                              px-3
                              py-2
                              text-[10px]
                              font-medium
                              text-slate-400
                              transition
                              hover:border-orange-400/20
                              hover:bg-orange-500/[0.06]
                              hover:text-orange-300
                              active:scale-[0.98]
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          >
                            {
                              question
                            }
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* =================================
                  INPUT
              ================================== */}

              <div className="shrink-0 border-t border-white/[0.08] bg-[#0b0e13] p-2.5 sm:p-3">
                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    p-1.5
                    transition
                    focus-within:border-orange-400/30
                    focus-within:bg-white/[0.035]
                  "
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(
                      event
                    ) =>
                      setInput(
                        event.target
                          .value
                      )
                    }
                    placeholder="Ask TasteBite anything..."
                    disabled={loading}
                    autoComplete="off"
                    aria-label="Chat message"
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      px-2
                      py-2.5
                      text-[11px]
                      text-white
                      outline-none
                      placeholder:text-slate-700
                      sm:text-xs
                      disabled:cursor-not-allowed
                    "
                  />

                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !input.trim()
                    }
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-orange-500
                      text-white
                      shadow-lg
                      shadow-orange-500/10
                      transition
                      hover:bg-orange-400
                      active:scale-95
                      disabled:cursor-not-allowed
                      disabled:opacity-30
                    "
                    aria-label="Send message"
                  >
                    <Send
                      size={15}
                    />
                  </button>
                </form>

                <p className="mt-2 text-center text-[8px] text-slate-700">
                  Powered by TasteBite AI
                  · Restaurant Assistant
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================
          FLOATING CHAT BUTTON
      ====================================== */}

      <motion.button
        type="button"
        onClick={
          handleToggleChat
        }
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.94,
        }}
        className="
          fixed
          bottom-4
          right-3
          z-[100]
          flex
          h-13
          w-13
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-orange-500
          text-white
          shadow-xl
          shadow-orange-500/25
          transition
          hover:bg-orange-400
          sm:bottom-5
          sm:right-6
          sm:h-14
          sm:w-14
        "
        aria-label={
          isOpen
            ? "Close TasteBite AI chatbot"
            : "Open TasteBite AI chatbot"
        }
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{
                opacity: 0,
                rotate: -90,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 90,
                scale: 0.7,
              }}
            >
              <ChevronDown
                size={21}
              />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
              }}
            >
              <MessageCircle
                size={21}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Online Indicator */}

        {!isOpen && (
          <motion.span
            animate={{
              scale: [
                1,
                1.15,
                1,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              absolute
              -right-0.5
              -top-0.5
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-[#090b0f]
              bg-emerald-400
            "
          />
        )}
      </motion.button>
    </>
  );
}

export default ChatBot;