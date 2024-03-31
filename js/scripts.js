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
    openForm: (formType, loanType) => {
      const loanBoxes = document.querySelectorAll(".loan");
      const loanBox = document.querySelector(`.loan[data-type="${loanType}"]`);
      const form = document.querySelector(
        `.loan-form.${formType}[data-loan="${loanType}"]`
      );

      loanBoxes.forEach(loan => {
        if(loan.dataset.type !== loanType) {
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
      
      hiddenLoanBoxes.forEach(loanBox => {
        loanBox.classList.remove("hidden");
      });

      openedLoanBox.classList.remove("opened")
      formOpened.classList.remove("opened");
    },
    goTop: () => {
      const title = document.querySelector(".loans-title");
      window.scrollTo(0, title.offsetTop);
    }
  },
  onInit: () => {
    main.methods.checkTerms();

    const loans = document.querySelectorAll("li.loan");
    for (const loan of loans) {
      loan.addEventListener("click", (event) => {
        event.stopPropagation();
        main.methods.openForm("calculator", loan.dataset.type);
        main.methods.goTop();
      });
    }

    const allBtnCancel = document.querySelectorAll(".btn-cancel");
    for (const btnCancel of allBtnCancel) {
      btnCancel.addEventListener("click", (event) => {
        event.stopPropagation();
        main.methods.hideForm();
        main.methods.goTop();
      }); 
    }

    const verificationModal = document.querySelector(".verification.modal");
    const allBtnSubmit = document.querySelectorAll(".btn-submit");
    const verificationBtnBack = document.querySelector(".step-back");
    
    for (const btnSubmit of allBtnSubmit) {
      btnSubmit.addEventListener("click", (event) => {
        event.stopPropagation();
        verificationModal.classList.add("opened");
      }); 
    }

    verificationBtnBack.addEventListener("click", (event) => {
      event.stopPropagation();
      verificationModal.classList.remove("opened");
    });
  },
};

window.onload = main.onInit;
