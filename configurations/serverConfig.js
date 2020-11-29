var port = process.env.PORT || 3000;
console.log(port);
// if(port == null || port==""){
//     port=8000;
// }

module.exports={
    port:port,
    domain:'localhost',
    cookieSecret : "12345-67890-09876-54321"
}