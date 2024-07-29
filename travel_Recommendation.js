console.log('JavaScript file loaded');
function searchCondition() {
    const input = document.getElementById('cityInput').value.toLowerCase().trim(); // Added trim() to clean up leading/trailing spaces
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Debugging logs
    console.log('Search input:', input);
    console.log('Result div:', resultDiv);

    fetch('travel_Recommendation.json') // Ensure this path is correct
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Log data to check its structure

            // Helper function to search within arrays
            function searchArray(array) {
                return array.find(item => item.name.toLowerCase().includes(input));
            }

            // Search in countries' cities, temples, and beaches
            let place = null;

            // Search in countries' cities
            for (const country of data.countries) {
                place = searchArray(country.cities);
                if (place) break;
            }

            // Search in temples and beaches if not found in cities
            if (!place) {
                place = searchArray(data.temples);
            }
            if (!place) {
                place = searchArray(data.beaches);
            }

            // Update the result div with the search results
            if (place) {
                resultDiv.innerHTML = `
                    <img src="${place.imageUrl}" alt="${place.name}" style="max-width: 100%; height: auto;">
                    <h2>${place.name}</h2>
                    <p>${place.description}</p>
                `;
            } else {
                resultDiv.innerHTML = 'Sorry, we have no suggestions for this place.';
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
    const inputField = document.getElementById('cityInput');
    inputField.value = '';
}
// Assuming you have a button with id 'cityClear'
const btnClear = document.getElementById('cityClear');
btnClear.addEventListener('click', clearResults);
