import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppStore {
    movies: any | null;
    setMovies: (movies: any) => void;
}

export const useAppStore = create<AppStore>()(
    persist(
        (set) => ({
            movies: null,
            setMovies: (movies: any) => set({ movies }),
        }),
        {
            name: 'lolo-movie-store',
        }
    )
);
