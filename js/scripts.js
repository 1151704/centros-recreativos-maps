document.getElementById('inputfile').addEventListener('change', function () {
    var fr = new FileReader();
    fr.onload = function () {
        let lineas = fr.result.split('\r\n');
        let listado = []
        lineas.forEach(item => {
            let data = item.split(',')
            listado.push(data)
        })
        cargue(listado)
    }
    fr.readAsText(this.files[0]);
})

function cargue(listado) {
    if (document.getElementById('myMap')) {
        let myMap = L.map('myMap').setView([7.8785503,-72.4812302], 12)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
            foo: 'bar',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);

        // let iconMarker = L.icon({
        //     iconUrl: 'assets/favicon.png',
        //     iconSize: [40, 40],
        //     iconAnchor: [15, 30]
        // })

        let grupos1 = []
        let grupos2 = []
        let grupos3 = []
        listado.forEach(item => {
            let marker = L.marker([item[2], item[3]]).addTo(myMap).bindPopup(item[1])
            if (item[0] == '1') {
                grupos1.push(marker)
            } else if (item[0] == '2') {
                grupos2.push(marker)
            } else if (item[0] == '3') {
                grupos3.push(marker)
            }
        })

        let grupo1 = L.layerGroup(grupos1);
        let grupo2 = L.layerGroup(grupos2);
        let grupo3 = L.layerGroup(grupos3);

        var overlayMaps = {
            "Los Patios": grupo1,
            "Comuna 7": grupo2,
            "Comuna 4": grupo3,
        };

        L.control.layers([], overlayMaps).addTo(myMap);

        // let marker2 = L.marker([7.9134161, -72.5201439], { icon: iconMarker }).addTo(myMap)

        myMap.doubleClickZoom.disable()
        // myMap.on('dblclick', e => {
        //     let latLng = myMap.mouseEventToLatLng(e.originalEvent);

        //     L.marker([latLng.lat, latLng.lng], { icon: iconMarker }).addTo(myMap)
        // })
    }
}
