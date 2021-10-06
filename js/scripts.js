// let listado = [
//     [1, 'Cancha El Acuario', 7.8319968, -72.5053171],
//     [1, 'Cancha Microfútbol La Amarilla', 7.8345902, -72.5062375],
//     [1, 'Cancha Sintética El Cují', 7.8341869, -72.5093368],
//     [1, 'Cancha 11 De Noviembre', 7.8275482, -72.5131345],
//     [1, 'Parque De Juegos Barrio 12 De Octubre', 7.8244267, -72.5132973],
//     [1, 'Cancha 12 De Octubre', 7.8383697, -72.4960793],
//     [1, 'Cancha Gramillada La Sabana', 7.8415888, -72.5046023],
//     [1, 'Cancha La Bombonera', 7.8443864, -72.5053999],
//     [1, 'Cancha Pensilvania', 7.8147029, -72.5176624],
//     [1, 'Cancha La Polvorera', 7.8126498, -72.5179999],
//     [2, 'Juan Bautista Scalabrinni', 7.9134161, -72.5201439],
//     [2, 'Parque Barrio José Bernal', 7.9134161, -72.5201439],
//     [2, 'Parque La Ermita', 7.9230401, -72.5306808],
//     [2, 'Cancha De Fútbol Calle 25 Av 5 Buenos Aires', 7.9230401, -72.5306808],
//     [2, 'Cancha De Tierra La Primavera', 7.9230401, -72.5306808],
//     [2, 'Cacha Sintética El Apóstol', 7.9230401, -72.5306808],
//     [2, 'Cancha La Laguna', 7.9230401, -72.5306808],
//     [2, 'Coliseo De Claret', 7.9230401, -72.5306808],
//     [2, 'Canchas Sinteticas La 25', 7.9230401, -72.5306808],
//     [2, 'Cancha Sintética Chapinero', 7.9230401, -72.5306808],
//     [3, 'Canchas Sintética La Academia', 7.8919913, -72.4815975],
//     [3, 'Cancha Sintética Prados Del Este', 7.9084996, -72.4758907],
//     [3, 'Canchas Sintéticas Santiago Bernabéu', 7.9069694, -72.4763413],
//     [3, 'Cancha Sintética Siglo 21', 7.8926168, -72.475194],
//     [3, 'Cancha Sintética Champions League', 7.8785503, -72.4812302],
//     [3, 'Polideportivo Nuevo Escobal', 7.914318, -72.4677027],
//     [3, 'Cancha Baloncesto Cúcuta', 7.9050379, -72.4697223],
//     [3, 'Cancha De Tableta San Martin', 7.899284, -72.4721483],
//     [3, 'Patinodromo De Cañafistolo', 7.8976635, -72.4680223],
//     [3, 'Patinodromo Prados Del Este', 7.9073724, -72.4765013],
// ]

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
            "Comuna 1": grupo1,
            "Comuna 2": grupo2,
            "Comuna 3": grupo3,
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
