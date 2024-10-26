import { getImgUrl } from "../utils/cine.utility";
import MovieDetailsModal from "./MovieDetailsModal";
import Rating from "./Rating";
import { useState } from "react";
import { useContext } from "react";
import { MovieContext } from "../context";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { state,dispatch} = useContext(MovieContext);

  function handleModalClick(movie) {
    setSelectedMovie(movie);
    setShowModal(true);
  }

  function handleClose() {
    setSelectedMovie(null);
    setShowModal(false);
  }

  function handleAddToCart(event, movie) {
    event.stopPropagation();

    const found = state.cartData.find((item)=>{
     return  item.id === movie.id
    })

    if(!found){
      dispatch({
        type:"ADD_TO_CART",
        payload:{
          ...movie
        }
      })
    }else{
      console.error(`The movie ${movie.title} has been added already to the cart `)
    }
  }

  return (
    <>
      {showModal && (
        <MovieDetailsModal movie={selectedMovie} onClose={handleClose} onAddToCart={handleAddToCart} />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={() => handleModalClick(movie)}>
          <img
            className="w-full object-cover"
            src={getImgUrl(movie.cover)}
            alt=""
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <a
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src="./assets/tag.svg" alt="" />
              <span>${movie.price} | Add to Cart</span>
            </a>
          </figcaption>
        </a>
      </figure>
    </>
  );
}
