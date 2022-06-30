import { Button } from "./Button";

import { GenreResponseProps } from '../App'
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void
}

export function SideBar({ setSelectedGenreId, selectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
 
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);
  
  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>
  )
}