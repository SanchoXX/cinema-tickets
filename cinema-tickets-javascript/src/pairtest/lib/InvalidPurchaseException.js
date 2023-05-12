/**
 * Immutable Object.
 */

export default class InvalidPurchaseException extends Error {
  #Errors;

  constructor(Errors) {
    super();
    this.#Errors = Errors;
  }

  getErrors() {
    return this.#Errors;
  }
}
