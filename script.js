// SECTIONS
const mainCard = document.getElementById('main-card');
const messagesSection = document.getElementById('messages-section');
const chithiSection = document.getElementById('chithi-section');
const birthdaySection = document.getElementById('birthday-section');

function showSection(name){
  mainCard.style.display='none';
  messagesSection.style.display='none';
  chithiSection.style.display='none';
  birthdaySection.style.display='none';

  if(name==='main') mainCard.style.display='block';
  else if(name==='messages') messagesSection.style.display='flex';
  else if(name==='chithi') chithiSection.style.display='flex';
  else if(name==='birthday') birthdaySection.style.display='flex';
}

// COUNTDOWN
let timeLeft = 5;
const countdownEl = document.getElementById('countdown');
const buttonsEl = document.getElementById('buttons');

const timer = setInterval(()=>{
  countdownEl.textContent = `Starting in ${timeLeft} second${timeLeft>1?'s':''}...`;
  timeLeft--;
  if(timeLeft<0){
    clearInterval(timer);
    countdownEl.style.display='none';
    buttonsEl.style.display='block';
  }
},1000);

// BUTTONS CLICK
document.getElementById('btn-messages').onclick = ()=>{ showSection('messages'); launchConfetti(); showGallery(); };
document.getElementById('btn-chithi').onclick = ()=>{ showSection('chithi'); launchConfetti(); };
document.getElementById('btn-birthday').onclick = ()=>{ showSection('birthday'); const vid = document.getElementById('birthday-video'); vid.play(); };

// BIRTHDAY MESSAGES
const birthdayMessages = ["Happy Birthday My Aluuuuuuu 🎉","Always Be the Brainless and Cute Girl I Know 💖","Dua kri Birthday aro koyeksho bar ashuk...at least amr chye 1 year beshi ashuk 🌟"];
let msgIndex=0;
const messagesDiv = document.getElementById('messages');
const nextMsg = document.getElementById('next-msg');
nextMsg.onclick = ()=>{
  msgIndex = (msgIndex+1)%birthdayMessages.length;
  showMessage(messagesDiv, birthdayMessages[msgIndex]);
};

// CHITHI NOTES
const chithiNotes = ["Note 1:Eto Note fote lekhar mto brain apatoto nai...coding kri matha nosto ✨","Note 2: Ajk tor din...So be Happy and Chill...And as usual,Antyke ekta tnx+kissi dis amr pokkho theke(karon ta asha kri jano) 😊","Note 3:Most importantly,Ur Hippo Loves U the Most mossttt and Mossttt...And alsoo missing U sooo soooo sooooo Muchhhhhh ❤️"];
let noteIndex=0;
const chithiDiv = document.getElementById('chithi-messages');
const nextChithi = document.getElementById('next-chithi');
nextChithi.onclick = ()=>{
  noteIndex = (noteIndex+1)%chithiNotes.length;
  showMessage(chithiDiv, chithiNotes[noteIndex]);
};

// SHOW MESSAGE WITH FADE
function showMessage(el, text){
  el.classList.remove('show-msg');
  setTimeout(()=>{ el.textContent=text; el.classList.add('show-msg'); },100);
}

// GALLERY FADE-IN
function showGallery(){
  const gallery = document.getElementById('gallery');
  if(!gallery) return;
  const imgs = gallery.querySelectorAll('img');
  imgs.forEach((img,i)=>{
    setTimeout(()=>{ img.classList.add('show-img'); }, i*200);
  });
}

// CONFETTI
function launchConfetti(){
  const confettiCanvas = document.getElementById('confetti');
  if(!confettiCanvas) return;
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const confettis = [];
  const colors = ["#ff4d94","#ff66b3","#ff1a75","#ff99c2","#ffe6f0"];
  for(let i=0;i<150;i++){
    confettis.push({
      x:Math.random()*window.innerWidth,
      y:Math.random()*window.innerHeight- window.innerHeight,
      r:Math.random()*6+4,
      tilt:Math.random()*10-5,
      tiltAngle:Math.random()*Math.PI*2,
      tiltAngleIncrement:0.05+Math.random()/10,
      color: colors[Math.floor(Math.random()*colors.length)],
      speed: 2+Math.random()*3
    });
  }

  function draw(){
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    confettis.forEach(c=>{
      c.tiltAngle += c.tiltAngleIncrement;
      c.y += c.speed;
      c.tilt = Math.sin(c.tiltAngle)*10;
      ctx.beginPath();
      ctx.moveTo(c.x + c.tilt, c.y);
      ctx.lineTo(c.x + c.tilt + c.r/2, c.y + c.r);
      ctx.strokeStyle = c.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      if(c.y > confettiCanvas.height) c.y = -10;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
// Floating sparkles on button hover
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${e.offsetX}px`;
    sparkle.style.top = `${e.offsetY}px`;
    btn.appendChild(sparkle);
    setTimeout(()=>{ sparkle.remove(); },500);
  });
});
