import React, { useState } from 'react';
import { createUser, login } from '../utils/apis';

const AuthPage = ({ setAuthState, setUser }) => {
  const [loginPage, setLoginPage] = useState(true);
  const [creds, setCreds] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const callback = (data) => {
    const { type, message } = data;
    if (type === 'loginSuccess') {
      let pocketbase_auth = localStorage.getItem('pocketbase_auth');
      pocketbase_auth = JSON.parse(pocketbase_auth);
      if (pocketbase_auth?.token?.length > 0) {
        setAuthState(true);
        setUser(pocketbase_auth.model);
      }
    } else if (type === 'regSuccess') {
      setLoginPage(true);
    } else {
      alert(message);
    }
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {loginPage ? 'Login to your account' : 'Register a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 pl-1"
              onClick={() => setLoginPage(!loginPage)}
            >
              {loginPage ? 'Register a new account' : 'Login to your account'}
            </a>
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            loginPage ? login(creds, callback) : createUser(creds, callback);
          }}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label for="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={creds.email}
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
              />
            </div>
            <div>
              <label for="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                value={creds.password}
                onChange={(e) =>
                  setCreds({ ...creds, password: e.target.value })
                }
              />
            </div>

            {!loginPage && (
              <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Your Password"
                  value={creds.passwordConfirm}
                  onChange={(e) =>
                    setCreds({
                      ...creds,
                      passwordConfirm: e.target.value,
                    })
                  }
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              {loginPage ? 'Login' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;