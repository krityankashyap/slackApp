import { StatusCodes } from "http-status-codes";

class ValidationError extends Error {
  constructor(errordetails , message){ /**
    - This is the constructor of the `ValidationError` class.
    - It takes two parameters:
    - `errordetails`: the raw error object (probably from a validation library like Mongoose).
    - `message`: a custom error message (e.g., "Invalid input").

---

### ```js
    super(message);

    */
    super(message);

    this.name = 'validationError';
    let explanation = [];
    Object.keys(errordetails.error).forEach((key) => { /**
      Iterates over each key in `errordetails.error`.
      - Pushes each corresponding value (likely an error message or object) into the `explanation` array. */
      explanation.push(errordetails.error[key]);
    });
    
    this.explanation = explanation,
    this.message = message,
    this.statusCodes = StatusCodes.BAD_REQUEST
  }
}

export default ValidationError;