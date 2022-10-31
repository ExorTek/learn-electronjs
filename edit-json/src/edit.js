const {ipcRenderer} = require('electron')

document.addEventListener('DOMContentLoaded', () => {
    let editForm = document.getElementById('edit-form')
    ipcRenderer.on('form-data', (event, {path, array, data}) => {
        editForm.innerHTML = `
             <div class="flex flex-col">
                <label class="text-white font-medium text-base mb-2" for="id">ID</label>
                <input disabled class="border border-[#E8E8E8] rounded-md py-2 px-4" type="text" name="id" value="${data.id}">
                
            </div> 
            <div class="flex flex-col">
                <label class="text-white font-medium text-base mb-2" for="name">Ürün İsmi</label>
                <input class="border border-[#E8E8E8] rounded-md py-2 px-4" type="text" name="name" value="${data.name}">
            </div>
            <div class="flex flex-col">
                <label class="text-white font-medium text-base mb-2" for="price">Fiyat</label>
                <input class="border border-[#E8E8E8] rounded-md py-2 px-4" type="text" name="price"  value="${data.price}">
            </div> 
            <div class="flex flex-col">
                <label class="text-white font-medium text-base mb-2" for="description">Açıklama</label>
                <input name="description" class="border border-[#E8E8E8] rounded-md py-2 px-4 bg-white" value="${data.description}" />
            </div>       
            <button form="edit-form" type="submit" class="bg-blue-700 text-white p-6 mx-auto text-white">Kaydet</button>      
        `
        editForm.addEventListener('submit', (e) => {
            e.preventDefault()
            let id = e.target.id.value
            let name = e.target.name.value
            let price = e.target.price.value
            let description = e.target.description.value.replaceAll('  ', ' ')
            ipcRenderer.send('edit-form-submit', {path, array, id, name, price, description})

        })
    })
})
