function applyStyles(){
    document.getElementsByTagName('header')[0].classList.add('azure');
    document.getElementsByTagName('h1')[0].classList.add('anim-color-change');
    document.getElementsByTagName('div')[0].classList.add('container');
    document.getElementsByTagName('div')[1].classList.add('left-col');
    document.getElementsByTagName('div')[2].classList.add('right-col');
    document.getElementsByTagName('nav')[0].classList.add('azure');
    document.getElementsByTagName('main')[0].classList.add('azure');
    document.getElementsByTagName('h1')[1].classList.add('anim-color-change');
    document.getElementsByTagName('aside')[0].classList.add('azure');
    document.getElementsByTagName('h1')[2].classList.add('anim-color-change');
    document.getElementsByTagName('footer')[0].classList.add('azure');
}

function removeStyles(){
    var components = document.getElementsByTagName("*");
    for (let i=0; i < components.length; i++){
        components[i].classList = [];
    }
}

function addText(text,index){
    const blockquote = document.getElementsByTagName('blockquote')[0];
    const newText = document.createTextNode(text[index]);
    blockquote.appendChild(newText);
}

var setBtn = document.getElementById('set');
var deleteBtn = document.getElementById('delete');
var addBtn = document.getElementById('add');

setBtn.addEventListener('click', applyStyles);
deleteBtn.addEventListener('click', removeStyles);

var text = "Natenczas Wojski chwycił na taśmie przypięty Swój róg bawoli, długi,\
cętkowany, kręty Jak wąż boa, oburącz do ust go przycisnął, Wzdął\
policzki jak banię, w oczach krwią zabłysnął, Zasunął wpół powieki,\
wciągnął w głąb pół brzucha I do płuc wysłał z niego cały zapas\
ducha, I zagrał: róg jak wicher, wirowatym dechem Niesie w puszczę\
muzykę i podwaja echem. <br><br> Umilkli strzelcy, stali szczwacze zadziwieni\
Mocą, czystością, dziwną harmoniją pieni. Starzec cały kunszt,\
którym niegdyś w lasach słynął, Jeszcze raz przed uszami myśliwców\
rozwinął; Napełnił wnet, ożywił knieje i dąbrowy, Jakby psiarnię w\
nie wpuścił i rozpoczął łowy. <br><br> Bo w graniu była łowów historyja\
krótka: Zrazu odzew dźwięczący, rześki: to pobudka; Potem jęki po\
jękach skomlą: to psów granie; A gdzieniegdzie ton twardszy jak\
grzmot: to strzelanie.";

var paragraphs = text.split('<br><br>');
var numOfParagraphs = paragraphs.length;
current_index = 0;

addBtn.addEventListener('click', () => {
    addText(paragraphs, current_index);
    current_index++;
    if ( current_index >= numOfParagraphs){
        addBtn.disabled = true;
    }
})

