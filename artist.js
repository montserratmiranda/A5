const request = require("request");
const cheerio = require("cheerio");
const nodemailer = require ("nodemailer")
const fs = require ("fs");


// 1. Leer artista
const lecturaArtista = (argumento) => {
    const [,,...artists] = process.argv
if (artists.length===0){

    console.log("Error: No artist was specified")
}
else {console.log(JSON.stringify(artists))}
    return(artists);
};
// 2. scrapping del site
const scrappingSite = (artists) => {
request('http://www.popvortex.com/music/charts/top-rap-songs.php', function (error, response, html) {
	if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        //stores data of artists and songs
        const list = $("div p")
        console.log(list);
// 3. Obtener las canciones del artista
        const cancionesByArtist = [];
        
        list.each ((i, element) => {
            const listaJSON = { name: "", song: ""};
            listaJSON.name = $(element).children("em").text();
            listaJSON.song = $(element).children("cite").text();
            // llenar array con la info de artistaCancion
            cancionesByArtist.push(listaJSON);
        });
        console.log(cancionesByArtist);
        } 
});
return
};

// // 4. Generar un correo a partir de la información obtenida en el paso 3
// // const estructuraCorreo = (artists, cancionesByArtist = []) => {
// //     //loop cancionesByArtist para enconcontrar el artista
// //     if (artists == cancionesByArtist){
// //         estructuraCorreo = 
    

// //     return (estructuraCorreo);
// // };
// // N-1. Envío correo
// const enviarCorreo = () => {
//     //enviar correo solo si hubo un argumento de artista
//  //credentials
// // const data = fs.readFileSync("credentials.json")
// // const output = JSON.parse(data)
// // console.log(output)

//     let transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 465,
//             secure: true,
//                  auth: {
//                     "user": "testmailtowson@gmail.com",
//                     "pass": "towson123"
//                  }
//     })

//     let estructuraMail = transporter.sendMail ({
//         from: "Montserrat Miranda <testmailtowson@gmail.com>",
//         to: "mmiran8@students.towson.edu",
//         subject: "Your artist are:" + JSON.stringify(artists),
//         text: estructuraCorreo,
//         html: "<p>It works</p>",
//     });
// }
// // N. Imprimir en consola, que se envió el correo
// const imprimirConfirmacion = (confirmacion) => console.log(`El correo fue enviado: ${confirmacion}`);



const artists = lecturaArtista(process.argv);
const songs = scrappingSite(artists);
// const confirmacion = enviarCorreo(estructura);
// imprimirConfirmacion(confirmacion);
