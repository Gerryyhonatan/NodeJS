const fs = require('fs');
const validator = require('validator');

// membuat folder data jika belum ada
const dirPath = './data'
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file)
    return contacts
}


const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP}
    // const file = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(file)
    const contacts = loadContact()
                
    // cek duplikat 
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat) {
        console.log('Contact sudah terdaftar, gunakan nama lain');
        return false
    }

    // cek email
    if(email) {
        if(!validator.isEmail(email)) {
            console.log('Email tidak valid')
            return false
        }
    }

    // cek no HP 
    if(!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log('Nomor Handphone tidak valid')
        return false
    }
    
    contacts.push(contact)
        
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
        
    console.log('Terimakasih sudah memasukkan data');
}


const listContact = () => {
    const contacts = loadContact();
    contacts.forEach((contact,i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`)
    })
};


const detailContact = (nama) => {
    const contacts = loadContact()

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if(!contact) {
        console.log(`${nama} tidak ditemukan`)
        return false
    }

    console.log(contact.nama)
    console.log(contact.noHP)
    if(contact.email){
    console.log(contact.email)
    }
}


const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

    if(contacts.length === newContacts.length) {
        console.log(`${nama} tidak ditemukan`)
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
        
    console.log(`${nama} berhasil dihapus`);
}
module.exports = { simpanContact, listContact, detailContact, deleteContact}