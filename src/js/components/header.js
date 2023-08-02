document.addEventListener('DOMContentLoaded', function() {
  // menu
  const menu = {
    content: document.querySelector('.menu'),
    links: document.querySelectorAll('.menu a'),
    openBtn: document.querySelector('.burger'),
    closeBtn: document.querySelector('.menu__close-btn'),
  };

  menu.openBtn.addEventListener('click', function() {
    document.body.classList.add('stop-scroll');
    menu.content.classList.add('menu--active');
    closeSearch();
  });

  [menu.closeBtn, ...menu.links].forEach(element => {
    element.addEventListener('click', function() {
      document.body.classList.remove('stop-scroll')
      menu.content.classList.remove('menu--active');
    });
  });

  // search
  const search = {
    wrapper: document.querySelector('.search'),
    form: document.querySelector('.search-form'),
    openBtn: document.querySelector('.header__search-btn'),
    closeBtn: document.querySelector('.search-form__close-btn'),
  };

  function openSearch() {
    search.wrapper.classList.add('search--active');
    search.form.classList.add('search-form--active');
    search.form.addEventListener('transitionend', function() {
      this.req.focus();
    }, {
      once: true,
    });
  };

  function closeSearch() {
    search.form.req.value = '';
    search.wrapper.classList.remove('search--active');
    search.form.classList.remove('search-form--active');
  }

  search.openBtn.addEventListener('click', openSearch);
  search.closeBtn.addEventListener('click', closeSearch);
});
