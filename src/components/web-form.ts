import { string } from "yup";

class WebForm extends HTMLFormElement {
  initialCall: boolean;
  fragment: DocumentFragment;
  labelElement: HTMLLabelElement;
  inputElement: HTMLInputElement;
  buttonElement: HTMLButtonElement;
  errorElement: HTMLParagraphElement;
  buttonIsActive: boolean;
  checkInputWithDebounce: (...args: any) => void;

  constructor() {
    super();
    this.initialCall = true;
    const template = <HTMLTemplateElement>document.getElementById("template-form");
    this.fragment = <DocumentFragment>template.content.cloneNode(true);
    this.labelElement = <HTMLLabelElement>this.fragment.querySelector('[data-name="label"]');
    this.inputElement = <HTMLInputElement>this.fragment.querySelector('[data-name="input"]');
    this.buttonElement = <HTMLButtonElement>this.fragment.querySelector('[data-name="button"]');
    this.errorElement = <HTMLParagraphElement>this.fragment.querySelector('[data-name="error"]');
    this.buttonIsActive = false;
    this.checkInputWithDebounce = this.debounce(() => this.checkInput());
  }

  connectedCallback() {
    if (this.initialCall) {
      this.labelElement.setAttribute("for", "email-input");
      this.inputElement.setAttribute("id", "email-input");
      this.append(this.fragment);
    }
    this.inputElement.addEventListener("keyup", () => this.checkInputWithDebounce());
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener("keyup", () => this.checkInputWithDebounce());
  }

  debounce(callback: any, timeout = 300) {
    let timer;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { callback.apply(this, args); }, timeout);
    };
  }

  async checkInput() {
    const testedEmail: string = this.inputElement.value;
    const schema = string().required().email();
    const emailIsValid = await schema.isValid(testedEmail);
    if (emailIsValid && !this.buttonIsActive) {
      this.inputElement.classList.remove("border-light-red", "focus:border-light-red");
      this.errorElement.textContent = "";
      this.activateSubmitButton();
    } else if (!emailIsValid) {
      this.inputElement.classList.add("border-light-red", "focus:border-light-red");
      this.errorElement.textContent = testedEmail.length <= 0 ? "Please enter a email" : "Please provide a valid email address";
      if (this.buttonIsActive) this.deactivateSubmitButton();
    }
  }

  activateSubmitButton() {
    if (!this.buttonIsActive) {
      this.buttonElement.classList.remove("bg-gray");
      this.buttonElement.classList.add("bg-blue", "shadow-lg", "shadow-pale-blue");
      this.buttonElement.removeAttribute("disabled");
      this.buttonIsActive = true;
    }
  }

  deactivateSubmitButton() {
    if (this.buttonIsActive) {
      this.buttonElement.classList.remove("bg-blue", "shadow-lg", "shadow-pale-blue");
      this.buttonElement.classList.add("bg-gray");
      this.buttonElement.setAttribute("disabled", "");
      this.buttonIsActive = false;
    }
  }
}

export default WebForm;