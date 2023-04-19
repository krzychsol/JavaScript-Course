/** GLOBAL VARIABLES */
var cart1 = document.getElementById("div1");
var cart2 = document.getElementById("div2");
var cart3 = document.getElementById("div3");
var cart4 = document.getElementById("div4");

var firstTimer;
var secondTimer;
var n=2000; 
var m=3000;
 

function start() {
    
    clearInterval(firstTimer);
    firstTimer = setInterval( () => {
            let randomCartNumber = Math.floor(Math.random() * 4) + 1;
            let leftrandomSwipe = Math.floor(Math.random()*101);
            console.log(randomCartNumber);
            switch(randomCartNumber){
                case 1:
                    cart1.style.left = leftrandomSwipe+"%";
                    setTimeout(() =>{
                        cart1.style.left = 100-leftrandomSwipe+"%";
                    }, 1000);
                case 2:
                    cart2.style.left = leftrandomSwipe+"%";
                    setTimeout(() =>{
                        cart2.style.left = 100-leftrandomSwipe+"%";
                    }, 1000);
                case 3:
                    cart3.style.left = leftrandomSwipe+"%";
                    setTimeout(() =>{
                        cart3.style.left = 100-leftrandomSwipe+"%";
                    }, 1000);
                case 4:
                cart4.style.left = leftrandomSwipe+"%";
                setTimeout(() =>{
                    cart4.style.left = 100-leftrandomSwipe+"%";
                }, 1000);
            }
        }, n);

    clearInterval(secondTimer);
    secondTimer = setInterval(() => {
    document.body.style.backgroundImage = "url('./bg.jpg')";
    setTimeout(() => {
        document.body.style.backgroundImage = "url('./bg2.jpg')";
    }, 1000); 
  }, m); 
}

function stop() {
  clearInterval(firstTimer);
  clearInterval(secondTimer);
  setTimeout(() => {
    start();
  }, 4000); 
}


start();
document.addEventListener("mousemove", stop);
document.addEventListener("mousedown", stop);
document.addEventListener("keypress", stop);
document.addEventListener("scroll", stop);

function addForm() {
    
    var form = document.createElement('form');
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');
    div1.classList.add('form-group');
    div2.classList.add('form-group');
    div3.classList.add('form-group');
    var inputEmail = document.createElement('input');
    var inputName = document.createElement('input');
    var labelEmail = document.createElement('label');
    var labelName = document.createElement('label');
    labelEmail.setAttribute('for','exampleInputEmail');
    labelEmail.textContent='Email address';
    inputEmail.setAttribute('type','email');
    inputEmail.classList.add('form-control');
    inputEmail.classList.add('exampleInputEmail');
    inputName.setAttribute('type','text');
    inputName.classList.add('form-control');
    labelName.setAttribute('for','exampleInputName')
    inputName.classList.add('exampleInputName');
    inputEmail.setAttribute('placeholder', 'Enter email');
    inputName.setAttribute('placeholder', 'Enter your name and surname');
    labelName.textContent='Your name';
    submitBtn = document.createElement('button');
    submitBtn.classList.add('btn');
    submitBtn.classList.add('btn-primary');
    submitBtn.textContent = "Submit";

    form.appendChild(div1);
    div1.appendChild(labelEmail);
    div1.appendChild(inputEmail);
    form.appendChild(div2);
    div2.appendChild(labelName);
    div2.appendChild(inputName);
    form.appendChild(submitBtn);
    document.getElementById('registartion-form').appendChild(form);
    document.getElementById('reservation-btn').disabled=true;
}

function deleteEntry(){
    var parent = document.getElementById('entries');
    var index = Array.from(parent.children).indexOf(this.parentNode);
    parent.removeChild(parent.children[index]);
}

document.getElementById('reservation-btn').addEventListener("click", addForm);