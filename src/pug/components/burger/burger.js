document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const burgerInner = document.querySelector('.burger .inner');
  const sidebar = document.querySelector('.sidebar-wrapper');
  const body = document.querySelector('body');

  burger.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar-wrapper_opened');
    sidebar.classList.add('sidebar-wrapper_animated');
  }, false);

  body.addEventListener('click', function (event) {
    console.log(event.target);
    if (event.target !== burger && event.target !== burgerInner) {
      sidebar.classList.remove('sidebar-wrapper_opened');
    }
  }, false);
});