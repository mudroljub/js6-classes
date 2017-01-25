const platno = document.createElement('canvas')

platno.width = document.body.clientWidth || 800
platno.height = document.body.clientHeight || 600
platno.style.backgroundColor = 'lightgray'
platno.podloga = platno.getContext('2d')
platno.id = 'platno'
document.body.appendChild(platno)

export default platno
