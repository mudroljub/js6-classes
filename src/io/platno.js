const platno = document.createElement('canvas')
const podloga = platno.getContext('2d')

platno.width = document.body.clientWidth || 800
platno.height = document.body.clientHeight || 600
platno.style.backgroundColor = 'lightgray'
platno.id = 'platno'

// window.onload = () => {
  document.body.appendChild(platno)
  platno.focus()
// }

export {platno, podloga}
export default platno
