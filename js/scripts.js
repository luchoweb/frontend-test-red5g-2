const main = {
  elements: {
    loans: document.querySelectorAll("li.loan"),
    buttons: {
      cancel: document.querySelectorAll(".btn-cancel"),
      submit: document.querySelectorAll(".btn-submit"),
      information: document.querySelectorAll(".btn-information"),
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
      const isOpenedForm = document.querySelector(
        `.loan-form.opened[data-loan="${loanType}"]`
      );
      const form = document.querySelector(
        `.loan-form.${formType}[data-loan="${loanType}"]`
      );

      if (!isOpenedForm) {
        loanBoxes.forEach((loan) => {
          if (loan.dataset.type !== loanType) {
            loan.classList.add("hidden");
          }
        });

        loanBox.classList.add("opened");
        form.classList.add("opened");
      }
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
      setTimeout(() => {
        window.scrollTo(0, title.offsetTop);
      }, 1100);
    },
    resetVerificationForm: () => {
      const options = document.querySelectorAll(
        `.option input[type="radio"]:checked`
      );

      options.forEach((option) => {
        option.checked = false;
      });
    },
  },
  onInit: () => {
    main.elements.loans.forEach((loan) => {
      loan.addEventListener("click", (event) => {
        event.stopPropagation();
        main.methods.openForm("calculator", loan.dataset.type);
        main.methods.goTop();
      });
    });

    main.elements.buttons.cancel.forEach((btnCancel) => {
      btnCancel.addEventListener("click", (event) => {
        event.stopPropagation();
        main.methods.hideForm();
      });
    });

    main.elements.buttons.submit.forEach((btnSubmit) => {
      btnSubmit.addEventListener("click", (event) => {
        event.stopPropagation();
        main.methods.hideForm();
        main.methods.openForm("information", btnSubmit.dataset.type);
      });
    });

    main.elements.buttons.information.forEach((btnInfo) => {
      btnInfo.addEventListener("click", () => {
        main.elements.verification.modal.classList.add("opened");
      });
    });

    main.elements.verification.btnBack.addEventListener("click", (event) => {
      event.stopPropagation();
      main.elements.verification.modal.classList.remove("opened");
      main.methods.resetVerificationForm();
    });
  },
};

window.onload = main.onInit;
