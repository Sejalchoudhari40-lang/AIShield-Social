function Logo() {
  return (
    <div className="flex flex-col items-center">

      <div className="rounded-2xl bg-slate-900 p-2 shadow-lg">

        <img
          src="/logo.png"
          alt="AIShield Logo"
          className="h-24 w-24 object-contain"
        />

      </div>

      <h1 className="mt-5 text-4xl font-extrabold tracking-wide text-white">
        AIShield
      </h1>

      <p className="mt-3 text-center text-sm font-medium text-cyan-400">
        AI Powered Content Moderation Platform
      </p>

    </div>
  );
}

export default Logo;