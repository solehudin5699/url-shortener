'use client';

import React, { FormEvent, useState } from 'react';

function extractCode(url: string) {
  try {
    const path = new URL(url).pathname; // Get "/aaa/test"
    const parts = path.split('/').filter(Boolean); // array: ["aaa", "test"]
    return parts[0]; // Get "aaa"
  } catch (_error) {
    return null;
  }
}

function CheckShortUrl() {
  const [state, setState] = useState({
    shortUrl: '',
    resultGenerated: '',
    isLoading: false,
  });

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (state.resultGenerated) {
      navigator.clipboard.writeText(state.resultGenerated);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckShortUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { shortUrl } = state;
    const code = extractCode(shortUrl);
    if (!shortUrl) {
      alert('Please enter short url');
      return;
    }
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(`/api/check-link?code=${code}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data?.status === 'success') {
        return setState((prev) => ({ ...prev, resultGenerated: data.originalUrl }));
      }

      alert(data?.error || 'Error check short URL');
    } catch (error: any) {
      alert(error?.message || 'Error check short URL');
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <form className="flex flex-col gap-4 p-4 rounded-md w-1/2" onSubmit={handleCheckShortUrl}>
      <h5 className="font-bold text-xl mb-3 text-center mt-10">Check Short URL</h5>
      <div>
        <label htmlFor="short-url" className="font-semibold">
          Short URL
        </label>
        <input
          type="text"
          id="short-url"
          placeholder={window.location.origin + '/short-url'}
          className="w-full p-2 rounded-xl border border-gray-500"
          name="shortUrl"
          value={state.shortUrl}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:opacity-90 text-white px-4 py-2 rounded-xl cursor-pointer mt-10 disabled:cursor-progress disabled:opacity-70"
        disabled={state.isLoading}
      >
        {state.isLoading ? 'Checking...' : 'Check Now'}
      </button>

      {state.resultGenerated && (
        <div className="flex flex-col gap-1 border border-gray-300 p-4 rounded-xl overflow-auto">
          <p className="text-green-500 font-semibold">Original URL</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">{state.resultGenerated}</span>
            <button
              className="bg-blue-500 hover:opacity-90 text-white px-2 py-1 rounded-xl cursor-pointer text-sm"
              onClick={handleCopy}
              type="button"
            >
              {isCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default CheckShortUrl;
