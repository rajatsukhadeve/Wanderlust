

            {/* // Initialize map and set its view to a chosen geographical coordinates and zoom level  */}
    
    let lat = listingData.geometry.coordinates[1];
    let lng = listingData.geometry.coordinates[0];
    console.log(lat, lng);


    if(listingData.geometry.coordinates.length >0){
       var map = L.map('map').setView([lat,lng], 10); 
    }else{
        var map = L.map('map').setView([28.6139, 77.2088], 10);
    }

    {/* Add OpenStreetMap tiles — no API key needed  */}
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
         }).addTo(map);

    {/* // Optional: Add a marker to the map  */}
    
    // if(listingData.geometry.coordinates.length <=0){
    //    var marker = L.marker([28.6139, 77.2088]).addTo(map);
    //    marker.bindPopup(`<b>${listingData.location}</b> <br> Exact loction will be provided after booking`).openPopup(); 
    // }
    
    var marker = L.marker([lat, lng]).addTo(map);

    
    marker.bindPopup(`<b>${listingData.location}</b> <br> Exact loction will be provided after booking`).openPopup(); 
    