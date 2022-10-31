const {ipcRenderer} = require('electron')

document.addEventListener('DOMContentLoaded', () => {
    let input = document.getElementById('file-input')
    let tr = document.getElementById('tbody-tr')
    input.addEventListener('change', (event) => {
        const file = event.target.files[0]
        ipcRenderer.send('file-loaded', file.path)
    })
    ipcRenderer.on('file-loaded-reply', (event, {path, json, newData}) => {
        if (newData) {
            tr.innerHTML = ''
        }
        json.map((item, i) => {
            tr.innerHTML += `
                    <tr>
                    <td
                                    class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                            >
                                 ${item.id}
                            </td>
                    <td
                                    class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                            >
                                 ${item.name}
                            </td>
                            <td
                                    class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                            >
                                 ${item.price} TL
                            </td><td
                                    class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                            >
                                 ${item.description}
                            </td>
                            <td class="p-5"><button  class="edit-button bg-blue-700 text-white p-6">Düzenle</button></td>
</tr>
                `
        })
        let editButton = document.getElementsByClassName('edit-button')
        if (editButton && editButton.length) {
            for (let i = 0; i < editButton.length; i++) {
                editButton[i].addEventListener('click', () => {
                    ipcRenderer.send('edit-button-clicked', {
                        path,
                        array: json,
                        id: editButton[i].parentElement.parentElement.children[0].innerText
                    })
                })
            }
        }
    })
    ipcRenderer.on('edit-form-submit-reply', (event) => {
        ipcRenderer.send('file-loaded', {path: '', json: []})
    })
    ipcRenderer.on('refresh-page', (event) => {
        window.location.reload()
    })
})
