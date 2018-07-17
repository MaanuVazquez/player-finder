// @flow

export function includes(x: string, y: string): boolean {
  return x.toLowerCase().includes(y.toLowerCase())
}

export function getAge(birthDate: string): string {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()

  birth.setFullYear(today.getFullYear())

  if (birth.getTime() >= today.getTime()) age -= 1
  return String(age)
}
