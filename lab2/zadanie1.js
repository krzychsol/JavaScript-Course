
window.prompt("Tekst1", "Tekst2");

var wczytanaWartosc;
for(let i=0;i<4;i++){
    wczytanaWartosc = window.prompt("Podaj wartość:");
    console.log(wczytanaWartosc+":"+typeof(wczytanaWartosc));
}

var selectedForm = document.forms['form_name'];
function form_handler(){
    console.log(selectedForm.pole_tekstowe.value+":"+typeof(selectedForm.pole_tekstowe.value));
    console.log(selectedForm.pole_liczbowe.value+":"+typeof(selectedForm.pole_liczbowe.value));
}