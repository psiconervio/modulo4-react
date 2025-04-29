import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="border-t pt-3">
      <div className="flex">
        <input
          type="text"
          className="flex-1 input-field"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 btn-primary"
          disabled={!message.trim()}
        >
          <FaPaperPlane />
        </button>
      </div>
    </form>
  )
}

export default MessageInput