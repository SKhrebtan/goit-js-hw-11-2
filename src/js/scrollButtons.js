import { refs } from "./refs";

refs.myButton = document.getElementById("myBtn");
refs.btnToBottom = document.querySelector('.btntobottom');
refs.myButton.addEventListener('click', onPageTop);
refs.btnToBottom.addEventListener('click', onPageBottom);

window.onscroll = function () {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    refs.myButton.style.display = "block";
  } else {
    refs.myButton.style.display = "none";
  }
  if ((document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) && document.documentElement.scrollHeight > 3000) {
    refs.btnToBottom.style.display = "none";
  } else {
    refs.btnToBottom.style.display = "block";
  }};

function onPageTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
};

function onPageBottom() {
 window.scrollTo({top: document.documentElement.scrollHeight
, behavior: 'smooth'});
}