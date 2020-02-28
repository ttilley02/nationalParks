'use strict';

function displayResults(responseJson) {
    console.log('displayResults ran');
    $(responseJson).ready(function () {
        $('.loading').addClass('hidden')
    })

    console.log(responseJson);
    if(responseJson.total != 0){
    for(let i = 0; i < responseJson.data.length;i++){
    console.log(responseJson.data[i].fullName);
     $('.js-results').append(`
     
     <div class="result-title">${responseJson.data[i].fullName}</div>
     <p class="result-item">${responseJson.data[i].description}</p>
     <a  about="_blank" href="${responseJson.data[i].url}">${responseJson.data[i].url}
     <br>
     <br>
    
    `)
    }
    }
    else
    {
     $('.js-results').append(`
     
     <div class="result-title">NO RESULTS! Please try again</div>        
    `) 
    }
 
    $('.js-results').removeClass('hidden')

}

function getParks(state, maxSearch) {
 
    console.log('getRepos ran');
    const url = `https://developer.nps.gov/api/v1/parks?limit=${maxSearch}&stateCode=${state}&api_key=1medHTv0AliVXaDnGghvJIcsWRzRTfHXhuZAYLJQ`
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            displayError(err.message);
        });
    
}

function displayError(error) {
    console.log('displayError ran');
    $('.js-results').html(`<h3 class="error">Something went wrong: ${error}</h3>`)
    $('.loading').addClass('hidden');
    $('.js-results').removeClass('hidden')
}

function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        console.log('watchForm ran'); 
        $('.js-results').empty().addClass('hidden')
        const usState = $('.js-state').val();
        let maxCount = $('.js-maxCount').val();
        if(maxCount == 0){
          maxCount = 10;
        }
        
        console.log(usState);
        $('.loading').removeClass('hidden');
        setTimeout(function () {
            getParks(usState, maxCount);
        }, 1000)
    });
}

$(watchForm);
