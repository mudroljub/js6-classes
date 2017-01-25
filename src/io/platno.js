const platno = document.createElement('canvas')

platno.sirina = platno.width = document.body.clientWidth || 800
platno.visina = platno.height = document.body.clientHeight || 600
platno.podloga = platno.ctx = platno.getContext('2d')
platno.style.backgroundColor = 'lightgray'
platno.id = 'platno'
document.body.appendChild(platno)

export default platno
