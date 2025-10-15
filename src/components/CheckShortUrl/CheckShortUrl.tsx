'use client';

import React, { FormEvent, useState } from 'react';

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
    if (!shortUrl) {
      alert('Please enter short url');
      return;
    }
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(`/api/check-link?url=${encodeURIComponent(shortUrl)}`, {
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
    <form className="flex flex-col gap-4 p-6 w-1/2" onSubmit={handleCheckShortUrl}>
      <h5 className="font-bold text-xl mb-3 text-center mt-10 text-white">Check Short URL</h5>
      <div>
        <label htmlFor="short-url" className="font-semibold text-white">
          Short URL
        </label>
        <input
          type="text"
          id="short-url"
          placeholder={window.location.origin + '/slug'}
          className="w-full p-2 rounded-xl border border-white/70 text-black bg-white outline-0 focus-within:outline-2 focus-within:outline-blue-500"
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

      {state.resultGenerated === null && (
        <span className="text-sm bg-white p-3 text-black/80 rounded-2xl">
          The link you entered does not redirect to another URL
        </span>
      )}
      {state.resultGenerated && (
        <div className="flex flex-col gap-1 border border-gray-300 p-3 rounded-xl relative bg-slate-100 backdrop-blur-2xl">
          <p className="text-green-500 font-semibold">Original URL</p>
          <button
            className="bg-blue-500 hover:opacity-90 text-white px-2 py-1 rounded-xl cursor-pointer text-sm top-3 right-3 absolute"
            onClick={handleCopy}
            type="button"
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
          <div className="overflow-auto">
            <span className="text-sm text-black/80">{state.resultGenerated}</span>
          </div>
        </div>
      )}
    </form>
  );
}

export default CheckShortUrl;
