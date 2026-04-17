import { useState, useEffect } from "react";
import Logo from "../shared/assets/Logo.png";

export default function AuthPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Проверка сессии при загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifySession(token);
    }
  }, []);

  const verifySession = async (token) => {
    try {
      console.log("Проверяю сессию с токеном:", token.substring(0, 20) + "...");
      
      const response = await fetch("http://127.0.0.1:8000/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();
      console.log("Ответ сервера:", response.status, data);
      
      if (response.ok && data.authenticated) {
        console.log("✅ Сессия валидна! Пользователь:", data.email);
        // Сессия валидна - перенаправляем на главную
        window.location.replace("http://localhost:5173/");
      } else {
        console.log("❌ Сессия невалидна, удаляю токен");
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.error("❌ Ошибка при проверке сессии:", err);
      localStorage.removeItem("token");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (!formData.email || !formData.password) {
      setError("Заполните все поля");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(formData),
      });

      
      const data = await response.json();

      if (response.ok){
        setSuccess("Успешный вход!");
        // Сохраняем токен в localStorage
        localStorage.setItem("token", data.token);
        console.log("Токен сохранен:", data.token);
        
        // Небольшая задержка перед редиректом чтобы убедиться что токен сохранен
        setTimeout(() => {
          window.location.replace('http://localhost:5173/');
        }, 300);
      }

      else if (response.status === 422){
        setError("Почта должна содержать @magas.ithub.ru!");
      }
      else{
        setError("Неверный email или пароль");
      }

    } catch (err) {
      setError("Ошибка соединения");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[320px] flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-[160px] h-[150px]">
            <img src={Logo} alt="Logo" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">ITchat</h1>
            <p className="text-sm text-gray-400 mt-1">The IThub social network</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="grid gap-2">
            <label>Email</label>
            <input
              className="border p-2 rounded"
              name="email" // Важно для работы handleChange
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            
            <label>Password</label>
            <input
              className="border p-2 rounded"
              name="password" 
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#AB00EA] h-12 text-white rounded-lg font-medium hover:bg-[#9900d1] disabled:bg-gray-400"
          >
            {loading ? "Загрузка..." : "Start Messaging"}
          </button>
        </form>
      </div>
    </div>
  );
}
