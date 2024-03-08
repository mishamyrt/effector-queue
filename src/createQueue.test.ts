import { createQueue } from './createQueue'
import { describe, it, expect } from 'vitest'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

describe('createQueue', () => {
  it('should execute tasks in queue one by one', async() => {
    const [createQueueEffect] = createQueue()
    const result: number[] = []

    const firstFx = createQueueEffect(async () => {
      result.push(1)
      await sleep(10)
      result.push(2)
    })
    const secondFx = createQueueEffect(async () => {
      result.push(3)
      await sleep(10)
      result.push(4)
    })
    const thirdFx = createQueueEffect(async () => {
      result.push(5)
      await sleep(10)
      result.push(6)
    })

    await Promise.all([
      firstFx(),
      secondFx(),
      thirdFx()
    ])
    expect(result).toEqual([1, 2, 3, 4, 5, 6])
  })
})


