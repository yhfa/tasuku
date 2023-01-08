export const ErrorMessages: any = async (state: any) => {
  let arrayOfErrors: string[] = [];
  state?.response?.data?.Errors?.forEach((e: any) =>
    arrayOfErrors.push(e.ErrorMessage)
  );

  return arrayOfErrors;
};