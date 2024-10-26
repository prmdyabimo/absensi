import React from "react";
import LogoBMG from "../assets/images/logo_bmg.png";
import AuthHook from "../hooks/AuthHook";

const LoginComponent = () => {
  const {
    username,
    password,
    messages,
    setUsername,
    setPassword,
    handleSubmit,
  } = AuthHook.Login();

  return (
    <section className="h-screen">
      <div className="w-full h-full px-6 py-24">
        <div className="g-6 flex h-full items-center justify-center">
          <div className="md:w-full lg:w-1/2">
            <div className="w-full flex flex-col items-center justify-center py-4 gap-4">
              <img src={LogoBMG} alt="Logo" className="mx-auto" />
              <h1 className="text-2xl font-bold">Masukkan Akun Anda</h1>
            </div>

            {messages.status === "failed" && (
              <div
                id="alert_message"
                className="flex items-center p-2 mb-2 text-red-800 border-t-4 border-red-300 bg-red-50"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="ml-3 text-sm font-medium">
                  {messages.message}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="relative my-4">
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-2 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative my-4">
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-2 bg-gray-200 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="inline-block w-full rounded bg-[#D3A038] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-[#e1bd74]"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginComponent;
