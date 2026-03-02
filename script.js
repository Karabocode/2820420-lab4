
async function searchCountry(countryName) {
    try {
        // Show loading spinner
        // Fetch country data
        const response= await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data1= await response.json();
        const country=data1[0];
        console.log(country.name.common);

        // Update DOM
        document.getElementById('country-info').innerHTML = `
    <h2>${country.name.common}</h2>
    <p><strong>Capital:</strong> ${country.capital[0]}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <img src="${country.flags.svg}" alt="${country.name.common} flag">
      `;
        // Fetch bordering countries

const bcontainer=document.getElementById('bordering-countries');
bcontainer.innerHTML="";

let bCountries = [];
if (country.borders){
    for(const code of country.borders){
        const response2=await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
         if (!response2.ok){
            continue;
         }
         const bdata=await response2.json();
         const border=bdata[0];

         bCountries.push({name:border.name.common,
            flag:border.flags.svg
         });

    }
}

if(bCountries.length==0){
    bcontainer.innerHTML="<p> No bordering countries.</p>";
}else{
   bcontainer.innerHTML = bCountries.map(border => `
    <div class="border-country">
        <p>${border.name}</p>
        <img src="${border.flag}" 
             alt="Flag of ${border.name}" 
             width="100">
    </div>
`).join("");
}

    } catch (error) {
        // Show error message
        console.log(error);
    } finally {
        // Hide loading spinner
        console.log(" data has been Uploaded");
    }
}
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
