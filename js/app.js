document.addEventListener('DOMContentLoaded', function () {
    const carrito = document.querySelector('#carrito');
    const contenedorCarrito = document.querySelector('#lista-carrito tbody');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    const listaCursos = document.querySelector('#lista-cursos');
    let articulosCarrito=[];

    cargarEventListeners();

    function cargarEventListeners() {
        // Cuando agregas un curso presionando (agregar carrito)
        listaCursos.addEventListener('click', agregarCurso);

        //elimina carrito
        carrito.addEventListener('click',eliminarCurso)

        //vaciar carrito
        vaciarCarritoBtn.addEventListener('click', ()=>{
            articulosCarrito =[];
            limpiarHTML();//elimiando vaciar html
        })
            
        
    }

    // funciones
    function agregarCurso(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carrito')) {
            const cursoSeleccionado=e.target.parentElement.parentElement;
           
            leerDatosCursos(cursoSeleccionado);
        }



    }

    //eliminr curso de carrito
    function eliminarCurso(e){
        console.log(e.target.classList);
        if(e.target.classList.contains('borrar-curso')){
           const cursoId = e.target.getAttribute('data-id');
           articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
           carritoHTML();
        }
    }
    function leerDatosCursos(curso){
        //console.log(curso)

        const infoCurso ={
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad:1
        }
        //rvisa si un elemento ya existe en ele carrito
        const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
        if(existe){
            const cursos = articulosCarrito.map(curso => {
                if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso;
                }else{
                    return curso;
                }

            });
            articulosCarrito=[...curso];
        }else{
            articulosCarrito=[...articulosCarrito,infoCurso]
        }
         
        
        console.log(articulosCarrito);
        carritoHTML();


    }
//muestra en carrito e hmtl

function carritoHTML(){
    //limmpiar html
    limpiarHTML();


    articulosCarrito.forEach( curso=> {
        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML= `
        <td>
           <img src="${curso.imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
         
        
        `;
        //agrega el html a carrito
        contenedorCarrito.appendChild(row);

    })

    
}
//elimina los cursos de table body
function limpiarHTML(){
    //FORMA LENTA 
    //contenedorCarrito.innerHTML='';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}

   

});
