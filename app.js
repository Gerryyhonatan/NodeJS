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

const { tulisPertanyaan, simpanContact } = require("./contacts")

const main = async() => {
    const nama = await tulisPertanyaan('Masukkan Nama Anda : ')
    const email = await tulisPertanyaan('Masukkan Email Anda : ')
    const noHP = await tulisPertanyaan('Masukkan No HP Anda : ')
    
    simpanContact(nama, email, noHP)
}

main()
*/

// mengambil argument dari command line
const yargs = require('yargs')
const { simpanContact, listContact, detailContact, deleteContact} = require('./contacts')


yargs.command({
    command : 'add',
    describe : 'Menambahkan contact baru',
    builder : {
        nama : {
            describe : 'Nama lengkap',
            demandOption : true,
            type : 'string',
        },
        email : {
            describe : 'Email',
            demandOption : false,
            type : 'string',
        },
        noHP : {
            describe : 'Nomor Handphone',
            demandOption : true,
            type : 'string'
        },
    },
    handler(argv) {
        simpanContact(argv.nama, argv.email, argv.noHP)
    },
})
.demandCommand()


// menampilkan daftar semua nama & no hp contact
yargs.command({
    command : 'list',
    describe : 'Menampilkan semua nama & no HP',
    handler() {
        listContact();
    },
})


// menampilkan detail sebuah contact
yargs.command({
    command : 'detail',
    describe : 'Menampilkan detail sebuah contact berdasarkan nama',
    builder : {
        nama : {
            describe : 'Nama lengkap',
            demandOption : true,
            type : 'string',
        },
    },
    handler(argv) {
        detailContact(argv.nama);
    },
})


// menghapus contact berdasarkan nama
yargs.command({
    command : 'delete',
    describe : 'Menghapus sebuah contact berdasarkan nama',
    builder : {
        nama : {
            describe : 'Nama lengkap',
            demandOption : true,
            type : 'string',
        },
    },
    handler(argv) {
        deleteContact(argv.nama);
    },
})

yargs.parse()