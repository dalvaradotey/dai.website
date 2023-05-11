import CryptoJS from 'crypto-js'

export function encrypt(text: string) {
  const result: string = CryptoJS.AES.encrypt(
    text,
    "FoCKbdLslUuB4y3EZlKate7OGottHski1LmyqJHvUxz="
  ).toString()

  return result
}

export function decrypt(text: string) {
  const result: string = CryptoJS.AES.decrypt(
    text,
    "FoCKbdLslUuB4y3EZlKate7OGottHski1LmyqJHvUxz="
  ).toString(CryptoJS.enc.Utf8)

  return result
}