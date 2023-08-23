
let text_ip = document.getElementById("text_ip");
let btn = document.getElementById("btn_check");


//resposata enviada pro dom
let ip = document.getElementById("ip")
let loocation = document.getElementById("Location")
let Timezone = document.getElementById("Timezone")
let isp = document.getElementById("isp")



//function asionada quando clicado no botao

btn.addEventListener("click", () => {

    let api = `https://geo.ipify.org/api/v2/country,city?apiKey=at_X190eo7WvYYsoprIEcSwrGyo6S5IL&ipAddress=${text_ip.value}`

    //mandando e resebendo parametros da api 
    fetch(api)
        .then((res) => res.json())
        .then((res) => {

            console.log(res)

            ip.textContent = res.ip
            loocation.textContent = res.location.region
            Timezone.textContent = "UTC- " + res.location.timezone
            isp.textContent = res.location.city

            let lat = res.location.lat
            let lng = res.location.lng

            let status = `${res.location.region} <br> ${res.location.city} <br> local do ip`


            mapa(lat, lng, status)
})
})

var map;
function mapa(lat, lng, status) {

    if (map === undefined) {
        map = L.map('map').setView([lat, lng], 33);
    } else {

        map.remove()
        map = L.map('map').setView([lat, lng], 33);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
        .bindPopup(status)
        .openPopup();

}


