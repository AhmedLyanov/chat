import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    initials: '??',
    name: 'Загрузка...',
    handle: '@user',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    setLoading(true);
    
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError('Не авторизован');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/profile', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // data приходит с бэкенда: { student_id, email }
        const firstName = data.student_id || 'Пользователь';
        const email = data.email || '';
        const initials = firstName[0]?.toUpperCase() || '??';
        
        setUser({
          initials: initials,
          name: firstName,
          handle: email,
        });
      } else if (response.status === 401) {
        // Токен протух или неверный
        localStorage.removeItem("token");
        setError('Сессия истекла, войдите снова');
      } else {
        setError('Ошибка загрузки профиля');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Загрузка профиля...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto fade-slide grid gap-2">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center mb-5">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#F2E0FF] text-[#AB00EA] rounded-full flex items-center justify-center shadow-md shadow-gray-300/50">
            <span className="text-4xl sm:text-5xl font-medium drop-shadow-sm">
              {user.initials}
            </span>
          </div>
        </div>

        <div className="text-center mb-7">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">{user.name}</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">{user.handle}</p>
        </div>

        <div className="grid gap-2.5">
          <button
            type="button"
            className="bg-white/90 backdrop-blur-sm rounded-2xl py-2 px-4 shadow-sm border border-gray-200/80 transition-transform active:scale-95 hover:bg-gray-50 flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Посты</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            className="bg-white/90 backdrop-blur-sm rounded-2xl py-2 px-4 shadow-sm border border-gray-200/80 transition-transform active:scale-95 hover:bg-gray-50 flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Подписчики</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            className="bg-white/90 backdrop-blur-sm rounded-2xl py-2 px-4 shadow-sm border border-gray-200/80 transition-transform active:scale-95 hover:bg-gray-50 flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Подписки</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            className="bg-white/90 backdrop-blur-sm rounded-2xl py-2 px-4 shadow-sm border border-gray-200/80 transition-transform active:scale-95 hover:bg-gray-50 flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Конфиденциальность</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            className="bg-white/90 backdrop-blur-sm rounded-2xl py-2 px-4 shadow-sm border border-gray-200/80 transition-transform active:scale-95 hover:bg-gray-50 flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Проекты</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;