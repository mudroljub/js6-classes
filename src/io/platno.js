const platno = document.createElement('canvas')

platno.width = document.body.clientWidth || 800
platno.height = document.body.clientHeight || 600
platno.podloga = platno.getContext('2d')
platno.style.backgroundColor = 'lightgray'
platno.id = 'platno'
document.body.appendChild(platno)
platno.focus()

export default platno
