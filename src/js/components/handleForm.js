document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('.form-control');
  const inputs = document.querySelectorAll('.input-control');

  function checkInput(input) {

    if (!input.tagName === 'INPUT') return true;

    const validEmail = /^.+@[a-z]+\.[a-z]+$/i;
    const validText = /^[A-Za-zА-Яа-я]+$/i;

    const type = input.getAttribute('type');

    if (type === 'email') {
      if (!validEmail.test(input.value)) {
        return false;
      }
    }

    if (type === 'text') {
      if (!validText.test(input.value)) {
        return false;
      }
    }

    return true;
  }

  forms.forEach( (form) => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      let errorCount = 0;

      Array.from(this.elements).forEach( (element) => {
        if (!checkInput(element)) {
          errorCount++;
          element.classList.add('--error');
        }
      });

      if (!errorCount) {
        // fetch
      }
    });
  });

  inputs.forEach( (input) => {
    input.addEventListener('input', function() {
      if (this.value) {

        this.classList.add('--is-active');

        if (checkInput(this)) {
          this.classList.remove('--error');
        };

      } else {

        this.classList.remove('--is-active');
        this.classList.remove('--error');

      };
    });
  });
});

