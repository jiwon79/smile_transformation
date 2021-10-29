const canvas_draw = document.querySelector(".canvas_draw");
const ctx_draw = canvas_draw.getContext("2d");
const canvas_show = document.querySelector(".canvas_show");
const ctx_show = canvas_show.getContext("2d");
let coord = { x: 0, y: 0 };

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
// window.addEventListener("resize", resize);

ctx_draw.canvas.width = 500;
ctx_draw.canvas.height = 500;
ctx_show.canvas.width = 500;
ctx_show.canvas.height = 500;

resize();
drawGuideLine();

function resize() {
  // ctx.canvas.width = window.innerWidth;
  // ctx.canvas.height = window.innerHeight;
  ctx_draw.canvas.width = 500;
  ctx_draw.canvas.height = 500;
}

function reposition_draw(event) {
  coord.x = event.clientX - canvas_draw.offsetLeft;
  coord.y = event.clientY - canvas_draw.offsetTop;
}

function start(event) {
  document.addEventListener("mousemove", draw);
  reposition_draw(event);
}

function stop() {
  document.removeEventListener("mousemove", draw);
}

function transformation(point) {
  return {x: point.x + 2*point.y, y: point.x - point.y}
}

function inverseTransformation(point) {
  return {x: (point.x + 2*point.y)/3, y: (point.x - point.y)/3}
}

function drawGuideLine() {
  ctx_show.beginPath();
  ctx_draw.beginPath();
  ctx_show.lineWidth = 1;
  ctx_draw.lineWidth = 1;  
  ctx_show.strokeStyle = "#000";
  ctx_draw.strokeStyle = "#000";

  for (var y=0; y<500; y=y+50) {
    ctx_show.moveTo(0, y);
    inversePoint = inverseTransformation({x: 0, y: y})
    ctx_draw.moveTo(inversePoint.x, inversePoint.y)

    for (var x=0; x<500; x=x+6) {
      inversePoint = inverseTransformation({x: x, y: y})
      ctx_show.lineTo(x, y);
      ctx_show.moveTo(x, y);
      ctx_draw.lineTo(inversePoint.x, inversePoint.y);
      ctx_draw.moveTo(inversePoint.x, inversePoint.y);

      ctx_show.closePath();
      ctx_show.stroke();
      ctx_draw.closePath();
      ctx_draw.stroke();
    }
  }
}

function draw(event) {
  ctx_draw.beginPath();
  ctx_draw.lineWidth = 3;
  ctx_draw.lineCap = "round";
  ctx_draw.strokeStyle = "#ACD3ED";
  ctx_show.beginPath();
  ctx_show.lineWidth = 3;
  ctx_show.lineCap = "round";
  ctx_show.strokeStyle = "#ACD1ED";

  ctx_draw.moveTo(coord.x, coord.y);
  transPoint = transformation(coord);
  ctx_show.moveTo(transPoint.x, transPoint.y);
  reposition_draw(event);

  transPoint = transformation(coord);  
  ctx_draw.lineTo(coord.x, coord.y);
  ctx_show.lineTo(transPoint.x, transPoint.y);
  ctx_draw.stroke();
  ctx_show.stroke();  
}