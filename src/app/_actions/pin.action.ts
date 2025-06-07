'use server';

export async function pinAction(data: FormData) {
  return new Promise((res) =>
    setTimeout(() => {
      const pin = data.get('pin')?.toString();

      console.log(pin);

      res(pin);
    }, 1000)
  );
}
