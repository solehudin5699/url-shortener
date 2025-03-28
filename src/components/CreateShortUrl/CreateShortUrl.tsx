'use client';
import { cn } from '@/utils/className';
import React, { FormEvent, useState } from 'react';

function CreateShortUrl() {
  const [state, setState] = useState({
    originalUrl: '',
    shortCode: '',
    useCustomUrl: false,
    resultGenerated: '',
    isLoading: false,
  });
  const refCustomUrl = React.useRef<HTMLInputElement>(null);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (state.resultGenerated) {
      navigator.clipboard.writeText(`${window.location.origin}/${state.resultGenerated}`);
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

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { originalUrl, shortCode } = state;
    if (!originalUrl) {
      alert('Please enter original url');
      return;
    }
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch('/api/generate-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalUrl,
          shortCode: state.useCustomUrl ? shortCode : null,
        }),
      });
      const data = await response.json();
      if (data?.status === 'success') {
        return setState((prev) => ({ ...prev, resultGenerated: data.shortCode }));
      }

      alert(data?.error || 'Error generating short URL');
    } catch (error: any) {
      alert(error?.message || 'Error generating short URL');
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <form className="flex flex-col gap-4 p-4 rounded-md w-1/2" onSubmit={handleGenerate}>
      <h5 className="font-bold text-xl mb-3 text-center mt-10">Generate Short URL</h5>
      <div>
        <label htmlFor="original-url" className="font-semibold">
          Original URL
        </label>
        <input
          type="text"
          id="original-url"
          placeholder="Enter Original URL"
          className="w-full p-2 rounded-xl border border-gray-500"
          name="originalUrl"
          value={state.originalUrl}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="custom-short-url" className="flex items-center gap-2 mb-1 font-semibold">
          <input
            type="checkbox"
            className="w-4 h-4"
            id="custom-short-url"
            checked={state.useCustomUrl}
            onClick={() => {
              setTimeout(() => {
                refCustomUrl?.current?.focus?.();
              }, 300);
              setState((prev) => ({
                ...prev,
                useCustomUrl: !prev.useCustomUrl,
                shortCode: !prev.useCustomUrl ? prev.shortCode : '',
              }));
            }}
            readOnly
          />
          <span className="text-sm">Custom Short URL</span>
        </label>
        <div
          className={cn(
            'border flex rounded-xl items-center pl-2 text-slate-400 border-gray-500 whitespace-nowrap',
            !state.useCustomUrl && 'bg-slate-200 cursor-not-allowed'
          )}
        >
          {window.location.origin}/
          <input
            type="text"
            placeholder="custom-short-url"
            className="w-full p-2 pl-0 rounded-tr-xl rounded-br-xl outline-none text-black text-sm focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
            name="shortCode"
            disabled={!state.useCustomUrl}
            value={state.shortCode}
            onChange={handleChange}
            ref={refCustomUrl}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:opacity-90 text-white px-4 py-2 rounded-xl cursor-pointer mt-10 disabled:cursor-progress disabled:opacity-70"
        disabled={state.isLoading}
      >
        {state.isLoading ? 'Generating...' : 'Generate'}
      </button>

      {state.resultGenerated && !state.isLoading && (
        <div className="flex flex-col gap-1 border border-gray-300 p-4 rounded-xl">
          <p className="text-green-500 font-semibold">✅Short URL Generated</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              {window.location.origin}/{state.resultGenerated}
            </span>
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

export default CreateShortUrl;
