function hasRepeatedDigits(value: string): boolean {
  return /^(\d)\1+$/.test(value);
}

function calculateDigit(base: string, weights: number[]): number {
  const sum = base
    .split('')
    .reduce(
      (acc, digit, index) => acc + parseInt(digit) * (weights[index] as number),
      0,
    );

  return sum % 11 < 2 ? 0 : 11 - (sum % 11);
}

export function isValidCPF(cpf: string): boolean {
  if (!/^\d{11}$/.test(cpf) || hasRepeatedDigits(cpf)) return false;

  const firstDigit = calculateDigit(
    cpf.slice(0, 9),
    Array.from({ length: 9 }, (_, i) => 10 - i),
  );

  if (firstDigit !== parseInt(cpf.charAt(9))) return false;

  const secondDigit = calculateDigit(
    cpf.slice(0, 10),
    Array.from({ length: 10 }, (_, i) => 11 - i),
  );

  return secondDigit === parseInt(cpf.charAt(10));
}

export function isValidCNPJ(cnpj: string): boolean {
  if (!/^\d{14}$/.test(cnpj) || hasRepeatedDigits(cnpj)) return false;

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, ...weights1];

  const firstDigit = calculateDigit(cnpj.slice(0, 12), weights1);
  if (firstDigit !== parseInt(cnpj.charAt(12))) return false;

  const secondDigit = calculateDigit(cnpj.slice(0, 13), weights2);

  return secondDigit === parseInt(cnpj.charAt(13));
}
