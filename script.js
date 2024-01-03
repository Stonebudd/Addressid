document.getElementById('addressForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const addressId = document.getElementById('addressId').value;
    const apiUrl = `https://api.psma.com.au/v1/predictive/address/${addressId}`;
    const apiKey = 'XeqZpzTGK6N2XW1DZLCgGsOkG5YuIVZL'; // Replace with your actual API key
  
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': apiKey,
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Filter the data to only show the required parameters
      const requiredData = {
        unit_number: data.address.properties.unit_number,
        street_number_1: data.address.properties.street_number_1,
        street_number_2:data.address.properties.street_number_2,
        street_name: data.address.properties.street_name,
        street_type: data.address.properties.street_type,
        suburb: data.address.properties.suburb,
        state: data.address.properties.state,
        postcode: data.address.properties.postcode,
        property_type: data.address.properties.property_type,
      };
      
      document.getElementById('result').innerHTML = `<pre>${JSON.stringify(requiredData, null, 2)}</pre>`;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      document.getElementById('result').textContent = 'Failed to fetch data.';
    });
  });
  
