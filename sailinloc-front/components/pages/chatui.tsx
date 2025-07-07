// Exemple React + Tailwind CSS

export default function ChatUI() {
  return (
    <div className="flex h-screen font-sans space-x-4">
      {/* Sidebar chats */}
      <div className="w-80 bg-glacev2 flex flex-col p-4 rounded-lg space-y-4">
        <h2 className="font-bold text-xl mb-4">Chats</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-col space-y-4 mt-4 overflow-y-auto flex-1">
          {/* Exemple d'un contact */}
          <ChatContact
            name="Kaiya George"
            role="Project Manager"
            time="15 mins"
            avatar="https://randomuser.me/api/portraits/men/32.jpg"
            status="online"
          />
          <ChatContact
            name="Lindsey Curtis"
            role="Designer"
            time="30 mins"
            avatar="https://randomuser.me/api/portraits/men/43.jpg"
            status="online"
          />
          <ChatContact
            name="Zain Geidt"
            role="Content Writer"
            time="45 mins"
            avatar="https://randomuser.me/api/portraits/women/65.jpg"
            status="online"
          />
          <ChatContact
            name="Carla George"
            role="Front-end Developer"
            time="2 days"
            avatar="https://randomuser.me/api/portraits/men/12.jpg"
            status="away"
          />
          <ChatContact
            name="Abram Schleifer"
            role="Digital Marketer"
            time="1 hour"
            avatar="https://randomuser.me/api/portraits/men/54.jpg"
            status="online"
          />
        </div>
      </div>

      {/* Chat window */}
      <div className="flex max-w-[56rem] flex-col bg-glacev2 rounded-lg flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/43.jpg"
                alt="Lindsey Curtis"
                className="w-12 h-12 rounded-full"
              />
              <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Lindsey Curtis</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 px-2">
          {/* Incoming message */}
          <Message
            avatar="https://randomuser.me/api/portraits/men/43.jpg"
            text="I want to make an appointment tomorrow from 2:00 to 5:00pm?"
            time="2 hours ago"
            isOwn={false}
          />
          <Message
            avatar="https://randomuser.me/api/portraits/men/43.jpg"
            text="I want more detailed information."
            time="2 hours ago"
            isOwn={false}
          />

          {/* Outgoing message */}
          <Message
            text="If don't like something, I'll stay away from it."
            time="2 hours ago"
            isOwn={true}
          />
          <Message
            text="If don't like something, I'll stay away from it."
            time="2 hours ago"
            isOwn={true}
          />
        </div>

        {/* Input area */}
        <div className="mt-4 flex items-center space-x-2">
          <button
            aria-label="Emoji"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>

          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            aria-label="Attach"
            className="text-gray-500 hover:text-indigo-600 transition"
          >
            <svg
              className="w-6 h-6 rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M12 2v20M7 7l10 10" />
            </svg>
          </button>

          <button
            aria-label="Send"
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

type ChatContactProps = {
  name: string;
  role: string;
  time: string;
  avatar: string;
  status: "online" | "away" | "offline";
};

type MessageProps = {
  avatar?: string;
  text: string;
  time: string;
  isOwn: boolean;
};

function ChatContact({ name, role, time, avatar, status }: ChatContactProps) {
  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-400",
  };
  return (
    <div className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-md">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
          <span
            className={`absolute bottom-0 right-0 block w-3 h-3 border-2 border-white rounded-full ${
              statusColors[status] || "bg-gray-400"
            }`}
          ></span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <p className="text-sm text-gray-400">{time}</p>
    </div>
  );
}

function Message({ avatar, text, time, isOwn }: MessageProps) {
  return (
    <div
      className={`flex items-end ${
        isOwn ? "justify-end" : "justify-start"
      } space-x-2 max-w-4xl`}
    >
      {!isOwn && avatar && (
        <img
          src={avatar}
          alt="Avatar"
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
      )}
      <div>
        <div
          className={`px-4 py-2 rounded-lg text-sm max-w-xs break-words ${
            isOwn
              ? "bg-indigo-600 text-white rounded-br-none"
              : "bg-gray-200 text-gray-900 rounded-bl-none"
          }`}
        >
          {text}
        </div>
        <p
          className={`mt-1 text-xs text-gray-400 ${
            isOwn ? "text-right" : "text-left"
          }`}
        >
          {time}
        </p>
      </div>
      {isOwn && <div className="w-8 flex-shrink-0"></div>}
    </div>
  );
}
