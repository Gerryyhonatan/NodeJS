const fs = require('fs');

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

// Readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// membuat folder data jika belum ada
const dirPath = './data'
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json'

rl.question('Masukkan Nama Anda : ', (nama) => {
    rl.question('Masukkan No Hp Anda : ', (noHP) => {
        const contact = {
            nama: nama,
            noHP : noHP
        }
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file)
        
        contacts.push(contact)

        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log('Terimakasih sudah memasukkan data');
        rl.close();
    })
});