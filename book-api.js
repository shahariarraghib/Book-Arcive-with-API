// spinner function

const toggleSpinner = displayStyle =>{
  document.getElementById('spinner').style.display = displayStyle;
}

// no result found function

const noDataFound = noDataFoundStyle =>{
  document.getElementById('no-data-found').style.display = noDataFoundStyle;
}


// search function

const searchBook = () => {
  // spinner show call
  toggleSpinner('block');
// no result fund disabled
  noDataFound('none');

// search
    const getSearchValue = document.getElementById('search-text');
    const serchText = getSearchValue.value;
    getSearchValue.value = '';

     const url = `https://openlibrary.org/search.json?q=${serchText}`;
     fetch(url)
     .then((res) => res.json())
      .then(data => {

        if(data.numFound == 0){  
          // show no result found
        noDataFound('block');
        // show amount of search result
        const totalResult = document.getElementById('total-result');
        totalResult.innerText = data.numFound;
        
        // remove previous search result
        const searchResult = document.getElementById('search-result');
        searchResult.innerHTML = '';
        // spinner disable call
        toggleSpinner('none');
        }

        else{
          // call the card function 
          displayBook(data.docs)
        }
      })
}

const displayBook = books =>{
  // remove previous search result
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    const totalResult = document.getElementById('total-result');
    books.forEach( book=> {
      totalResult.innerText = books.length;
      const div = document.createElement('div');
    div.classList.add('cal');
    div.innerHTML = `
    <div class="col shadow p-3 mb-5 bg-white rounded p-2 rounded-3" style="height: 500px";>
      <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top rounded-2" alt="..." width="200" height="200">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text text-truncate">Author Name: ${book.author_name ? book.author_name:'Not Found'}</p>
        <p class="card-text text-truncate">publisher: ${book.publisher ? book.publisher:'Not Found'}</p>
       
        <p class="card-text text-truncate">Publication Date: ${book.publish_date ? book.publish_date:'Not Found'}</p>
        
      </div>
    </div>
    `;
  searchResult.appendChild(div);  

    });
  // spinner disable call
   toggleSpinner('none');
      
}