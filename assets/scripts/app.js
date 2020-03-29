const updateUi = ()=>{
    if (movie.length === 0) {
        entryTextSection.style.display ="block";
    }
    else{
        entryTextSection.style.display ="none";
    }
}
const closeMovieDeleteModal = ()=>{
    toggleBackDrop();
    movieModal.classList.remove('visible');
}
const deleteMovie = movieId=>{
    let movieIndex = 0;
    for (const movies of movie) {
        if (movies.id === movieId ) {
            break;
        }
        movieIndex++;
    }
        movie.slice(movieIndex, 1);
        listRoot.children[movieIndex].remove();
        closeMovieDeleteModal();
        updateUi();
}
const startDeleteMovieHandler =(movieId)=>{
    movieModal.classList.add('visible');
    toggleBackDrop();
    const cancelAddMovieModal = movieModal.querySelector('.btn--passive');
    let confrimMovieButton = movieModal.querySelector('.btn--danger');
    confrimMovieButton.replaceWith(confrimMovieButton.cloneNode(true));
    confrimMovieButton = movieModal.querySelector('.btn--danger');
    cancelAddMovieModal.removeEventListener('click',closeMovieDeleteModal);
    cancelAddMovieModal.addEventListener('click',closeMovieDeleteModal);
    confrimMovieButton.addEventListener('click',deleteMovie.bind(null,movieId));
    
}
const toggleBackDrop = ()=>{
    backDrop.classList.toggle('visible');
}
const showMovieModal = ()=>{
    toggleBackDrop();
    addMovieModal.classList.add('visible');
}
const closeMovieModal = ()=>{
    addMovieModal.classList.remove('visible');
}
const cancelMovieModal = ()=>{
    closeMovieModal();
    toggleBackDrop();
}
const clearInput = ()=>{
    for (const input of userInputs) 
    {
    input.value = '';
    }    
}
const randerNewMovieElement=(id,titleValue,imgUrl,ratingValue)=>{
    let list = document.createElement('li');
    list.className = 'movie-element';
    list.innerHTML = `
    <div class="movie-element__image">
    <img src="${imgUrl}" alt="${titleValue}"/>
    </div>
    <div class="movie-element__info">
    <h2>${titleValue}</h2>
    <p>${ratingValue}/5 start</p>
    </div>`;
    list.addEventListener('click',startDeleteMovieHandler.bind(null,id));
    listRoot.append(list);
}
const addMovieHandler = ()=>{
   const titleValue = userInputs[0].value;
   const imgUrl = userInputs[1].value;
   const ratingValue = userInputs[2].value;
   if (
       titleValue.trim() === '' ||
       imgUrl.trim() === '' ||
       ratingValue.trim() === '' ||
       +ratingValue < 1 ||
       +ratingValue > 5
   ) {
       alert("bro fill sai ni kiya apne");
       return;
   }
   cancelMovieModal();
   clearInput();
   const newMovie = {
       id: Math.random().toString(),
       title: titleValue,
       url: imgUrl,
       rating: ratingValue
    };
    movie.push(newMovie);
    console.log(movie);
    randerNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.url,
    newMovie.rating
    );
    updateUi();
}

startAddMovieButton.addEventListener('click',showMovieModal);
backDrop.addEventListener('click',cancelMovieModal);
cancelAddMovieModal.addEventListener('click',cancelMovieModal);
confrimMovieButton.addEventListener('click',addMovieHandler);