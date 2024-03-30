const main = {
  methods: {
    checkTerms: () => {
      const termsCheckbox = document.getElementById("terms");
      const btnInformation = document.getElementById("btn-information");

      termsCheckbox.addEventListener("click", (event) => {
        if (event.target.checked) {
          btnInformation.removeAttribute("disabled");
          return;
        }

        btnInformation.setAttribute("disabled", true);
      });
    },
  },
  onInit: () => {
    main.methods.checkTerms();
  },
};

window.onload = main.onInit;
