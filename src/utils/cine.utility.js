//utility function to get dynamiic images
function getImgUrl(name){
    return new URL(`../assets/movie-covers/${name}`, import.meta.url).href
}

export {getImgUrl}