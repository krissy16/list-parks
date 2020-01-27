'use strict'

function handleForm(){
    $('form').on('submit', function(event){
        event.preventDefault();
        const searchTerm = $('#states').val().split(",");
        const max = $('#num').val();
        $('#states').val("");
        $('.result-list').html('<li class="link">loading...</li>');
        getResults(searchTerm, max);
    });
}

function getResults(searchTerm,maxResults){
    const params ={
        stateCode: searchTerm,
        limit: maxResults
    };
    const apiKey = "69hY5k4OxSFMCWrMI8oT9FDOBkrcjam9MvdvtrUf";
    let formatedParams = formatParams(params);
    const url="https://developer.nps.gov/api/v1/parks?"+formatedParams+"&api_key="+apiKey;
  
    console.log("Retrieving results from " + url);

    fetch(url)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        })
        .then(responseJson => {
            if(responseJson.total == 0) throw new Error("No results found");
            displayResults(responseJson);
        })
        .catch(err => {
            console.log(err.message);
            displayFailure(err.message);
        });
}

function formatParams(params){
    const items = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return items.join('&');
}

function displayResults(responseJson){
    $('.result-list').empty();
    $('.result-title').text(`Results: `);
    for(let i=0; i<responseJson.data.length; i++){
        let item =responseJson.data[i];
        $('.result-list').append(`
            <li>Full Name: ${item.fullName}</li>
            <li class="link">Located In: ${item.states}</li>
            <li class="link">Website URL: ${item.url}</li>
            <li class="link">Description: ${item.description}</li>
            `);

    }
    $('.result-section').removeClass('hidden');
}

function displayFailure(message){
    $('.result-title').text(`Error:`);
    $('.result-list').html(`<li>Something went wrong: ${message}</li>`);
    $('.result-section').removeClass('hidden');
}

$(handleForm);

/*
https://developer.nps.gov/api/v1/parks

headers:
    Accept: application/vnd.github.v3+json

parameters:
    limit: (default 50)
    q: 




    goodrequest: 
    https://developer.nps.gov/api/v1/parks?stateCode=ca&limit=1&api_key=69hY5k4OxSFMCWrMI8oT9FDOBkrcjam9MvdvtrUf
    https://developer.nps.gov/api/v1/parks?stateCode=ca&limit=1&api_key=69hY5k4OxSFMCWrMI8oT9FDOBkrcjam9MvdvtrUf
    */