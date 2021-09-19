let amigos = []; 
for (let index = 0; index < 5000; index++) {
   amigos.push(Math.random())
}
let inicio2 = Date.now();
for (let index = 0; index < 5000000; index++) {
    let teste = amigos.indexOf(0.19938084410694312);
}
let fim2 = Date.now();
console.log(fim2 - inicio2 )