'use server';

import { redirect } from "next/navigation";

export async function pinAction(data: FormData) {
  console.log(data.get('pin')?.toString());

  redirect('/hub')
}
