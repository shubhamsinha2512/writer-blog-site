var port = process.env.PORT;

if(port == null || port==""){
    port=3000;
}

module.exports={
    port:port,
    domain:'localhost',
    cookieSecret : "12345-67890-09876-54321"
}