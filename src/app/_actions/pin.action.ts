'use server';

export async function pinAction(data: FormData) {
  console.log(data.get('pin')?.toString());
}
