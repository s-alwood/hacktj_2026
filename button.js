
const openBtn = document.getElementById('openModal');
const backbtn = document.getElementById('backbtn');
const modal = document.getElementById('modal');

const gachaBtn = document.getElementById('Gacha');
const backbtn2 = document.getElementById('backbtn2');
const starmodal = document.getElementById('starmodal');

openBtn.addEventListener('click', () => {
    modal.classList.add('open');
});

backbtn.addEventListener('click', () => {
    modal.classList.remove('open');
}); 

gachaBtn.addEventListener('click', () => {
    starmodal.classList.add('open');
});

backbtn2.addEventListener('click', () => {
    starmodal.classList.remove('open');
});
