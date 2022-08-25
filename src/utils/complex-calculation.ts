import randomChar from 'utils/random-char'

const complexCalculation = (source: string, length: number = 30000000) => {
  const CALC_LABEL = `ComplexCalculation, source: ${source}`
  console.time(CALC_LABEL)
  const resultItems: string[] = []

  for (let index = 0; index < length; index++) resultItems.push(randomChar())

  console.timeEnd(CALC_LABEL)

  return resultItems.join('')
}

export default complexCalculation
