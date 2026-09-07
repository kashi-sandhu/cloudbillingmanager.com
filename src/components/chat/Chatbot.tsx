import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Send, X } from 'lucide-react'
import { company } from '../../data/content.ts'
import { answerChat, chatStarters } from '../../lib/chatEngine.ts'

type Message = {
  id: number
  role: 'bot' | 'user'
  text: string
  path?: string
  href?: string
  suggestions?: string[]
}

const welcome: Message = {
  id: 0,
  role: 'bot',
  text: `Hello. I am the Cloud Billing Manager assistant from ${company.presenter}. Ask about the company, any module, or pick a suggested question below.`,
  path: '/',
  suggestions: [...chatStarters],
}

function MessageText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[a-z]{2,})/gi)
  return (
    <p>
      {parts.map((part, index) => {
        if (/^https?:\/\//i.test(part)) {
          return (
            <a key={`${part}-${index}`} href={part} target="_blank" rel="noreferrer">
              {part.replace(/^https?:\/\//i, '')}
            </a>
          )
        }
        if (part.includes('@') && part.includes('.')) {
          return (
            <a key={`${part}-${index}`} href={`mailto:${part}`}>
              {part}
            </a>
          )
        }
        return <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>
      })}
    </p>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [messages, setMessages] = useState<Message[]>([welcome])
  const listRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLTextAreaElement>(null)
  const nextId = useRef(1)
  const lastUser = useRef('')

  useEffect(() => {
    const node = listRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [messages, pending, open])

  useEffect(() => {
    if (open) fieldRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open || window.innerWidth >= 640) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  function push(role: Message['role'], text: string, path?: string, href?: string, suggestions?: string[]) {
    const id = nextId.current
    nextId.current += 1
    setMessages((current) => [...current, { id, role, text, path, href, suggestions }])
  }

  function ask(question: string) {
    const text = question.trim()
    if (!text || pending) return
    const previous = lastUser.current
    lastUser.current = text
    push('user', text)
    setInput('')
    setPending(true)
    window.setTimeout(() => {
      const reply = answerChat(text, previous)
      push('bot', reply.text, reply.path, reply.href, reply.suggestions)
      setPending(false)
    }, 420)
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    ask(input)
  }

  function onKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      ask(input)
    }
  }

  const widget = (
    <div className="chatbot">
      {open ? (
        <section className="chat-panel" aria-label="Cloud Billing Manager assistant">
          <header className="chat-head">
            <span className="chat-head-bar" aria-hidden />
            <span className="chat-avatar" aria-hidden>
              <MessageCircle className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="chat-name">CBM Assistant</span>
              <span className="chat-status">Product knowledge only</span>
            </span>
            <button type="button" className="chat-x" aria-label="Close chat" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </button>
          </header>

          <div className="chat-list" ref={listRef}>
            {messages.map((message) => (
              <div key={message.id} className={`chat-bubble chat-bubble-${message.role}`}>
                <MessageText text={message.text} />
                {message.role === 'bot' && (message.path || message.href) ? (
                  <span className="chat-links">
                    {message.href ? (
                      <a href={message.href} target="_blank" rel="noreferrer" className="chat-page">
                        Open live demo
                        <ArrowRight className="size-3.5" />
                      </a>
                    ) : null}
                    {message.path ? (
                      <Link to={message.path} className="chat-page" onClick={() => setOpen(false)}>
                        Open page
                        <ArrowRight className="size-3.5" />
                      </Link>
                    ) : null}
                  </span>
                ) : null}
              </div>
            ))}
            {pending ? (
              <div className="chat-bubble chat-bubble-bot chat-pending" aria-live="polite">
                Checking product knowledge
              </div>
            ) : null}
          </div>

          <div className="chat-chips">
            <p className="chat-chip-label">Suggested questions</p>
            {(messages.filter((item) => item.role === 'bot').at(-1)?.suggestions ?? chatStarters).map((item) => (
              <button key={item} type="button" className="chat-chip" disabled={pending} onClick={() => ask(item)}>
                {item}
              </button>
            ))}
          </div>

          <form className="chat-form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="cbm-chat">
              Ask Cloud Billing Manager
            </label>
            <textarea
              id="cbm-chat"
              ref={fieldRef}
              rows={1}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about the system..."
              className="chat-input"
            />
            <button type="submit" className="chat-send" disabled={pending || !input.trim()} aria-label="Send">
              <Send className="size-4" />
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className={`chat-launch${open ? ' is-open' : ''}`}
        aria-label={open ? 'Close Cloud Billing Manager assistant' : 'Open Cloud Billing Manager assistant'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" strokeWidth={2.25} /> : <MessageCircle className="size-5" strokeWidth={2.25} />}
      </button>
    </div>
  )

  return createPortal(widget, document.body)
}
