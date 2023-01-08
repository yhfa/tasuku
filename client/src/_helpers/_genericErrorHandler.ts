import { AxiosError } from "axios";
import { AlertError } from "src/components/Alerts";

export function genericErrorHandler(error: AxiosError): any {
  const statusCode = error.response ? error.response.status : null;
  if (!statusCode) {
    AlertError(`Opps! Connection error,Please check your network connection. `);
  } else {
    if (statusCode === 401) {
      AlertError(`Unauthenticated, Please Log In to continue `);
    } else if (statusCode > 499) {
      AlertError(
        `Opps! server error,We're working on it, Please try again later `
      );
    }
    return error;
  }
}
