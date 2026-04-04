export default function HomePage() {
  const chats = [
    { id: 1, name: "Буружев Муса", lastMessage: "Привет! Как дела?", time: "14:23", unread: 2, avatar: "АИ", online: true },
    { id: 2, name: "Баулиев Ибрагим", lastMessage: "Скинь фотоотчет", time: "13:45", unread: 0, avatar: "ДП", online: false },
    { id: 3, name: "Зара Берстовна", lastMessage: "Забери справку", time: "12:30", unread: 1, avatar: "ЕС", online: true },
    { id: 4, name: "Аушев Мухаммад", lastMessage: "Ей мичав хьо?", time: "Вчера", unread: 0, avatar: "МК", online: false },
    { id: 5, name: "Чушпан", lastMessage: "В кс го?", time: "Вчера", unread: 3, avatar: "ОН", online: true },
    { id: 6, name: "Амхадов Адам", lastMessage: "😂😂😂", time: "Пн", unread: 0, avatar: "АМ", online: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="max-w-2xl">
        <div className="bg-white border-b-amber-400 shadow-sm border border-gray-100 overflow-hidden">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-4 p-2.5 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0 group"
            >
              {/* Аватар */}
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14   rounded-full flex items-center justify-center  bg-[#F2E0FF] text-[#AB00EA] font-semibold text-lg">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              {/* Информация о чате */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>

              {/* Unread badge */}
              {chat.unread > 0 && (
                <div className="flex-shrink-0">
                  <div className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full min-w-[20px] text-center shadow-sm">
                    {chat.unread}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}