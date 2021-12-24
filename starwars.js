///fron heres
let x = document.getElementById("cont");
let overflow = document.getElementById("over");
function handleCross() {
  document.querySelector("input").value = '';
  x.style.display = "none";
  overflow.style.display = "none";
}
let funk;
async function handleApi() {
  let container = document.querySelector("input").value;
  x.innerHTML = null;
  if (container.trim().length == 0) {
    x.style.display = "none";
  } else x.style.display = "flex";
  console.log();
  let data = await fetch(
    `http://superheroapi.com/api/1460168897699083/search/${container}`
  );
  let res = await data.json();
  return res.results;
}
async function main() {
  let data = await handleApi();
  dataAppend(data);
}

function debounce(fun, delay) {
  let container = document.querySelector("input").value;
  if (container.trim().length < 2) return false;
  if (funk) clearTimeout(funk);
  funk = setTimeout(() => {
    fun();
  }, delay);
}
function showIt(data) {
  overflow.style.display = "block";
  let name = document.getElementById("fullName");
  name.textContent = data.name;
  let gender = document.getElementById("gender");
  gender.textContent = data.appearance.gender;
  let race = document.getElementById("race");
  race.textContent = data.appearance.race;
  let height = document.getElementById("height");
  height.textContent = data.appearance.height;
  let weight = document.getElementById("weight");
  weight.textContent = data.appearance.weight;
  let eye = document.getElementById("eye");
  eye.textContent = data.biography.alignment;
  let intell = document.getElementById("intell");
  intell.textContent = data.powerstats.intelligence;
  let strength = document.getElementById("strength");
  strength.textContent = data.powerstats.strength;
  let speed = document.getElementById("speed");
  speed.textContent = data.powerstats.speed;
  let durability = document.getElementById("durability");
  durability.textContent = data.powerstats.durability;
  let power = document.getElementById("power");
  power.textContent = data.powerstats.power;
  let image = document.getElementById('mainImg')
  image.src = data.image.url;
}

function dataAppend(data) {
  data?.map((e) => {
    let { gender } = e.appearance;
    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class", "mainDiv");
    mainDiv.addEventListener("click", () => {
      showIt(e);
    });
    let name = document.createElement("p");
    name.textContent = e.name;
    let malefemale = document.createElement("p");
    malefemale.textContent = gender;
    let image = document.createElement("img");
    image.src = e.image.url;
    let divv = document.createElement("div");
    divv.append(image);
    mainDiv.append(name, divv);
    x.append(mainDiv);
  });
}

(function () {
  var width,
    height,
    largeHeader,
    canvas,
    ctx,
    points,
    target,
    animateHeader = true;

  // Main
  initHeader();
  initAnimation();
  addListeners();

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = { x: width / 2, y: height / 2 };

    largeHeader = document.getElementById("large-header");
    largeHeader.style.height = height + "px";

    canvas = document.getElementById("demo-canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    // create points
    points = [];
    for (var x = 0; x < width; x = x + width / 20) {
      for (var y = 0; y < height; y = y + height / 20) {
        var px = x + (Math.random() * width) / 20;
        var py = y + (Math.random() * height) / 20;
        var p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // for each point find the 5 closest points
    for (var i = 0; i < points.length; i++) {
      var closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j];
        if (!(p1 == p2)) {
          var placed = false;
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (var i in points) {
      var c = new Circle(
        points[i],
        2 + Math.random() * 2,
        "rgba(255,255,255,0.3)"
      );
      points[i].circle = c;
    }
  }

  // Event handling
  function addListeners() {
    if (!("ontouchstart" in window)) {
      window.addEventListener("mousemove", mouseMove);
    }
    window.addEventListener("scroll", scrollCheck);
    window.addEventListener("resize", resize);
  }

  function mouseMove(e) {
    var posx = (posy = 0);
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    target.x = posx;
    target.y = posy;
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    largeHeader.style.height = height + "px";
    canvas.width = width;
    canvas.height = height;
  }

  // animation
  function initAnimation() {
    animate();
    for (var i in points) {
      shiftPoint(points[i]);
    }
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in points) {
        // detect points in range
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          points[i].active = 0.3;
          points[i].circle.active = 0.6;
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          points[i].active = 0.1;
          points[i].circle.active = 0.3;
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          points[i].active = 0.02;
          points[i].circle.active = 0.1;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    // TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
    //     y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
    //     onComplete: function() {
    //         shiftPoint(p);
    //     }});
  }

  // Canvas manipulation
  function drawLines(p) {
    if (!p.active) return;
    for (var i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
      ctx.stroke();
    }
  }

  function Circle(pos, rad, color) {
    var _this = this;

    // constructor
    (function () {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function () {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
      ctx.fill();
    };
  }

  // Util
  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
})();
