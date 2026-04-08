import MovieCard from "@/components/MovieCard";
import MovieList from "@/components/MovieList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between pt-4 pb-32 md:px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 bg-[length:300%_300%] bg-clip-text text-transparent animate-[gradient-x_4s_ease_infinite] mb-10 text-4xl">
          Movie List App
        </h1>
        <MovieList />
      </main>
    </div>
  );
}
