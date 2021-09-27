const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let maxLevel = 5;
  let branches = 2;
  let sides = 5;
  let gapBetweenTwoBranches = Math.random() * 150 + 150;
  let lengthOfTheBranches = Math.random() * 150 + 150;
  let spread = Math.random();
  let angle = Math.PI * 2 * spread;

  ctx.translate(canvas.width / 2, canvas.height / 2);

  function drawLine(level) {
    if (level > maxLevel) {
      return;
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(lengthOfTheBranches, 0);
    ctx.stroke();
    for (let i = 1; i < branches + 1; i++) {
      ctx.save();
      ctx.translate(gapBetweenTwoBranches * i, 0);
      ctx.scale(0.5, 0.5);
      ctx.save();

      ctx.rotate(angle);
      drawLine(level + 1);
      ctx.restore();
      ctx.save();

      ctx.rotate(-angle);
      drawLine(level + 1);
      ctx.restore();

      ctx.restore();
    }
  }

  for (let i = 0; i < sides; i++) {
    drawLine(0);
    ctx.rotate((Math.PI * 2) / sides);
  }

  window.addEventListener("mouseover", () => {
    maxLevel = 5;
    branches = 2;
    sides = 5;
    gapBetweenTwoBranches = Math.random() * 150 + 150;
    lengthOfTheBranches = Math.random() * 150 + 150;
    spread = Math.random();
    angle = Math.PI * 2 * spread;
    ctx.clearRect(
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    for (let i = 0; i < sides; i++) {
      drawLine(0);
      ctx.rotate((Math.PI * 2) / sides);
    }
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);
  });
  let div = document.getElementById('container')

  async function data() {
    div.innerHTML = null
    let name = document.getElementById('query').value
    if (name.trim() === '') {
      div.style.display = 'none'
    }
    else {
      div.style.display = 'block'
    }
    let res = await fetch(`https://swapi.dev/api/people/?search=${name}`)

    let data = await res.json()
    console.log(data);
    return dataappend(data.results)
  }
  function dataappend(el) {

    el.forEach((p) => {
      var innerdiv = document.createElement('div')
      innerdiv.setAttribute('id', 'innerdiv')
      var pname = document.createElement('h3')
      pname.textContent = p.name

      let seconddiv = document.createElement('div')
      seconddiv.setAttribute('id', 'hiddendiv')
      let div1 = document.createElement('div')
      let p1 = document.createElement('p')
      p1.textContent = 'Birth: ' + p.birth_year
      let p2 = document.createElement('p')
      p2.textContent = 'Eye color: ' + p.eye_color
      let p6 = document.createElement('p')
      p6.textContent = 'Mass: ' + p.mass
      div1.append(p1, p2, p6)
      let div2 = document.createElement('div')
      let p4 = document.createElement('p')
      p4.textContent = 'Gender: ' + p.gender
      let p3 = document.createElement('p')
      p3.textContent = 'Height: ' + p.height
      let p5 = document.createElement('p')
      p5.textContent = 'Skin color: ' + p.skin_color
      div2.append(p3, p4, p5)
      seconddiv.append(div1, div2)
      innerdiv.append(pname, seconddiv)
      div.append(innerdiv)
      pname.addEventListener('click', () => {

        if (seconddiv.style.display = 'none') {
          seconddiv.style.display = 'grid'
        } 
      })
      pname.addEventListener('mouseleave',()=>{
        if(seconddiv.style.display = 'grid'){
          seconddiv.style.display = 'none'
        }
      })
    })
  }
  let timeid;
  async function main(){    
let name = document.getElementById('query').value

 let movies = await data(name)
 dataappend(movies)
    console.log(movies);

}
function debouncing(func,delay){
    let name = document.getElementById('query').value
if(name.length < 1){
    return false
}
if(timeid){
    clearTimeout(timeid)
}
  timeid = setTimeout(()=>{
        func()
    },delay)
}