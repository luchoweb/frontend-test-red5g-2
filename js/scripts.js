const main = {
  elements: {
    loans: document.querySelectorAll("li.loan"),
    buttons: {
      cancel: document.querySelectorAll(".btn-cancel"),
      submit: document.querySelectorAll(".btn-submit"),
    },
    verification: {
      modal: document.querySelector(".verification.modal"),
      btnBack: document.querySelector(".step-back"),
    },
  },
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
    openForm: (formType, loanType) => {
      const loanBoxes = document.querySelectorAll(".loan");
      const loanBox = document.querySelector(`.loan[data-type="${loanType}"]`);
      const form = document.querySelector(
        `.loan-form.${formType}[data-loan="${loanType}"]`
      );

      loanBoxes.forEach((loan) => {
        if (loan.dataset.type !== loanType) {
          loan.classList.add("hidden");
        }
      });

      loanBox.classList.add("opened");
      form.classList.add("opened");
    },
    hideForm: () => {
      const hiddenLoanBoxes = document.querySelectorAll(".loan.hidden");
      const openedLoanBox = document.querySelector(".loan.opened");
      const formOpened = document.querySelector(`.loan-form.opened`);

      hiddenLoanBoxes.forEach((loanBox) => {
        loanBox.classList.remove("hidden");
      });

      openedLoanBox.classList.remove("opened");
      formOpened.classList.remove("opened");
    },
    goTop: () => {
      const title = document.querySelector(".loans-title");
      window.scrollTo(0, title.offsetTop);
    },
  },
  onInit: () => {
    main.methods.checkTerms();

    for (const loan of main.elements.loans) {
      loan.addEventListener("click", (event) => {
        event.stopPropagation();
        main.methods.openForm("calculator", loan.dataset.type);
      });
    }

    for (const btnCancel of main.elements.buttons.cancel) {
      btnCancel.addEventListener("click", (event) => {
        event.stopPropagation();
        main.methods.hideForm();
      });
    }

    for (const btnSubmit of main.elements.buttons.submit) {
      btnSubmit.addEventListener("click", (event) => {
        event.stopPropagation();
        main.elements.verification.modal.classList.add("opened");
      });
    }

    main.elements.verification.btnBack.addEventListener("click", (event) => {
      event.stopPropagation();
      main.elements.verification.modal.classList.remove("opened");
    });
  },
};

window.onload = main.onInit;
