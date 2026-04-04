import Logo from "../shared/assets/Logo.png"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-[320px] flex flex-col items-center gap-12">
        
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-[160px] h-[150px]">
            <img src={Logo}/>
          </div>
          <div>
            <h1 className="text-2xl font-bold">ITchat</h1>
            <p className="text-sm text-gray-400 mt-1">
              The IThub social network bla bla bla
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button className="w-full max-w-[240px] bg-[#AB00EA] h-12 text-white rounded-lg font-medium hover:bg-[#9900d1] transition-colors cursor-pointer">
            Start Messaging
          </button>
        </div>

      </div>
    </div>
  )
}
