import { createQueue } from './createQueue'
import { describe, it, expect } from 'vitest'

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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


  it('should work with same effect called multiple times', async () => {
    const [createQueueEffect] = createQueue()
    const result: number[] = []

    const fx = createQueueEffect(async () => {
      result.push(1)
      await sleep(10)
      result.push(2)
    })

    await Promise.all([
      fx(),
      fx(),
      fx()
    ])
    expect(result).toEqual([1, 2, 1, 2, 1, 2])
  })
})


