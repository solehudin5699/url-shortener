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
      alert('Please enter custom slug');
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
    <form className="flex flex-col gap-4 p-6 w-1/2" onSubmit={handleGenerate}>
      <h5 className="font-bold text-xl mb-3 text-center mt-10 text-white">Generate Short URL</h5>
      <div>
        <label htmlFor="original-url" className="font-semibold text-white">
          Original URL
        </label>
        <input
          type="text"
          id="original-url"
          placeholder="Enter Original URL"
          className="w-full p-2 rounded-xl border border-white/70 outline-0 focus:outline-2 focus:outline-blue-500 text-black bg-white"
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
          <span className="text-sm text-white">Custom Slug</span>
        </label>
        <div
          className={cn(
            'border flex rounded-xl items-center pl-2 text-black border-white/70 whitespace-nowrap bg-white',
            !state.useCustomUrl && 'bg-slate-300 cursor-not-allowed text-black/50',
            'outline-0 focus-within:outline-2 focus-within:outline-blue-500'
          )}
        >
          {window.location.origin}/
          <input
            type="text"
            placeholder="custom-slug"
            className="w-full p-2 pl-0 rounded-tr-xl rounded-br-xl outline-none border-white/70 outline-0 text-black bg-white disabled:cursor-not-allowed disabled:bg-slate-300"
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
        <div className="flex flex-col gap-1 border border-gray-300 p-3 rounded-xl relative bg-slate-100 backdrop-blur-2xl">
          <p className="text-green-500 font-semibold">✅ Short URL Generated</p>
          <button
            className="bg-blue-500 hover:opacity-90 text-white px-2 py-1 rounded-xl cursor-pointer text-sm top-3 right-3 absolute"
            onClick={handleCopy}
            type="button"
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
          <div className="overflow-auto">
            <span className="text-sm text-black/80">
              {window.location.origin}/{state.resultGenerated}
            </span>
          </div>
        </div>
      )}
    </form>
  );
}

export default CreateShortUrl;
