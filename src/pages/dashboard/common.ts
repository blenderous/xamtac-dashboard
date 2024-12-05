// delayRequest function
export const dealyRequest = (delay: number) => (value: Response) =>
  new Promise<Response>((resolve) =>
    setTimeout(() => {
      resolve(value);
    }, delay)
  );
