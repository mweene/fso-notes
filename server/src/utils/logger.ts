const info = (...params:unknown[]) => {
  console.log(...params)
}

const error = (...params:unknown[]) => {
  console.error(...params)
}

export const logger = {
  info,
  error
}
