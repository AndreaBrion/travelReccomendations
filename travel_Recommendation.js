function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_Recommendation.json') // Ensure this path is correct
        .then(response => response.json())
        .then(data => { //data is the variable name used to hold the parsed JSON data. It represents the entire content of travel_Recommendation.json as a JavaScript object.
            // Helper function to search within different data arrays
            function searchArray(array) {
                return array.find(item => item.name.toLowerCase().includes(input));
            }
            alert(data);
            // Search in countries, temples, and beaches
            let place = searchArray(data.countries.flatMap(country => country.cities)) ||
                    searchArray(data.temples) || searchArray(data.beaches) ;
            alert(place);
            if (place) {
                resultDiv.innerHTML += `<img src="${place.imageUrl}" alt="${place.name}">`;
                resultDiv.innerHTML += `<h2>${place.name}</h2>`;
                resultDiv.innerHTML += `<p>${place.description}</p>`;
            } else {
                resultDiv.innerHTML = 'Sorry, we have no suggestions for this place';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
// Assuming you have a button with id 'citySearch'
const btnSearch = document.getElementById('citySearch');
btnSearch.addEventListener('click', searchCondition);

function clearResults() {
    // Clear the search results div
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Optionally clear the input field
    const inputField = document.getElementById('conditionInput');
    inputField.value = '';
}
// Assuming you have a button with id 'cityClear'
const btnClear = document.getElementById('cityClear');
btnClear.addEventListener('click', clearResults);
