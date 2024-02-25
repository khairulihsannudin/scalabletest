"use client";
import Image from "next/image";
import { getMessages, postMessage } from "./lib/fetch";
import { useEffect, useState } from "react";
interface Message {
  _id: string;
  name: string;
  messages: string;
}

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.length === 0) {
      getMessages()
        .then((res) => {
          setData(res);
        })
        .catch((err) => console.error(err));
    }
    console.log(data);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const name = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const messages = (e.currentTarget.elements[1] as HTMLInputElement).value;
    // console.log(JSON.stringify({name, message}));
    const res = await postMessage(name, messages);
    setLoading(false);
    window.location.reload();
  };
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <form
        action="POST"
        className="relative flex flex-col items-center gap-2 w-screen justify-center min-h-[80vh]"
        onSubmit={handleSubmit}
      >
        <label className="input input-bordered input-primary w-full max-w-md flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input required type="text"  className="grow" placeholder="Name" />
        </label>
        <textarea
        required
          className="textarea textarea-primary textarea-bordered textarea-md w-full max-w-md"
          placeholder="Message for me"
        ></textarea>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-neutral btn-wide btn-xs sm:btn-sm md:btn-md"
        >
          {loading ? "Loading" : "Submit"}
        </button>
      </form>

      <div className="mb-32 grid text-center m-auto lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {data.map(
          (message: Message) =>
            message.messages &&
            message.name && (
              <div
                className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                key={message._id}
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  {message.name}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                  {message.messages}
                </p>
              </div>
            )
        )}
      </div>
    </main>
  );
}
