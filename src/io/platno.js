export let platno = document.getElementById("platno");

if (!platno) {
  platno = document.createElement("canvas");
  platno.id = 'platno';
  document.body.appendChild(platno);
}

platno.width = document.body.clientWidth // window.innerWidth;
platno.height = document.body.clientHeight // window.innerHeight;
platno.style.backgroundColor = 'lightgray';
platno.podloga = platno.getContext("2d");
