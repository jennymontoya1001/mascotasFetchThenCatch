let formulario = document.getElementById('formulario');
let btnCorreo = document.getElementById('btnCorreo');
let btnEditar = document.getElementById('btnEditar');
let btnEliminar = document.getElementById('btnEliminar');

window.addEventListener('DOMContentLoaded', async () => {

    document.getElementById('id').style.display = 'none';
    document.getElementById('label-edit').style.display = 'none';
})

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

let name = document.getElementById('name').value;
let lastName = document.getElementById('lastName').value;
let email = document.getElementById('email').value;
  
      fetch('http://localhost:4002/usuarios/',{
        method: 'POST',
        body: JSON.stringify({
            nombre: name,
            apellido: lastName,
            correo: email
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(console.warn) 
   /*  let data = resp.json();
    console.log(data) */
})

btnCorreo.addEventListener('click',  () => {
    document.getElementById('id').style.display = 'block';
    document.getElementById('label-edit').style.display = 'block';
    let email = document.getElementById('email').value;
    document.getElementById('email').readOnly = true;

    fetch('http://localhost:4002/usuarios')
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        let modificar = data.find(user => user.correo === email)
        const {nombre, apellido, correo, id} = modificar;
        console.log(nombre, apellido, correo, id);
        document.getElementById('name').value = nombre;
        document.getElementById('lastName').value = apellido;
        document.getElementById('email').value = correo;
        document.getElementById('id').value = id;
    })
   .catch(console.warn)
})

btnEditar.addEventListener('click', () => {
    let idModificar = document.getElementById('id').value;
    let nameMod = document.getElementById('name').value;
    let lastNameMod = document.getElementById('lastName').value;
    let emailMod = document.getElementById('email').value;
  
    fetch(`http://localhost:4002/usuarios/${idModificar}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: idModificar,
            nombre: nameMod,
            apellido: lastNameMod,
            correo: emailMod
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    }) 
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(console.warn)
/*     let data = resp.json();
    console.log(data); */
})


btnEliminar.addEventListener('click', () => {

    let idModificar = document.getElementById('id').value;
    fetch(`http://localhost:4002/usuarios/${idModificar}`,{
        method: 'DELETE',
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(console.warn)
/*     let data = resp.json();
    console.log(data); */
})