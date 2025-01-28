/*
// menuliskan string ke file (synchronus)
fs.writeFileSync('test.txt', 'Hello World');

// menuliskan string ke file (asynchronus)
fs.writeFile('data/test.txt', 'Hello World Secara Asynchronus', (err) => {console.log(err)})

// membaca isi file (synchronus)
const data = fs.readFileSync('data/test.txt', 'utf-8');
console.log(data)

// membaca isi file (asynchronus)
fs.readFile('data/test.txt', 'utf-8', (err,data) => {
    if(err) throw err;
    console.log(data)
});
*/

const { tulisPertanyaan, simpanContact } = require("./contacts")

const main = async() => {
    const nama = await tulisPertanyaan('Masukkan Nama Anda : ')
    const email = await tulisPertanyaan('Masukkan Email Anda : ')
    const noHP = await tulisPertanyaan('Masukkan No HP Anda : ')

    simpanContact(nama, email, noHP)
}

main()
