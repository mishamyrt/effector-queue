import { createEffect, createEvent, createStore } from 'effector'
import { EffectCreatorFn, Queue, QueueConfig } from './createQueue.h'

const defaultConfig = {
  minInterval: 0,
  name: 'queue'
}

/**
 * Creates a queue with the given configuration.
 * @param {QueueConfig} config - optional configuration for the queue
 */
export function createQueue(
  config?: QueueConfig
): Queue {
  const {
    minInterval = defaultConfig.minInterval,
    name = defaultConfig.name
  } = config ?? defaultConfig
  let lastTask: Promise<any> = Promise.resolve()
  let lastTaskTime: number = 0
  const taskQueue: Array<() => Promise<any>> = []
  const pendingChanged = createEvent<boolean>()
  const $pending = createStore<boolean>(false, {
    name: name + '.pending'
  }).on(pendingChanged, (_, value) => value)
  let isPending = false

  function processQueue () {
    if (taskQueue.length === 0) {
      isPending = false
      return
    }
    const task = taskQueue.shift()
    if (!task) {
      return
    }
  
    const currentTime = Date.now()
    const timeSinceLastTask = currentTime - lastTaskTime
    const delay = Math.max(0, minInterval - timeSinceLastTask)
    lastTask = new Promise((resolve) => {
      pendingChanged(true)
      setTimeout(() => {
        task().then((result) => {
          lastTaskTime = Date.now()
          resolve(result)
          pendingChanged(false)
          processQueue()
        })
      }, delay)
    })
  }

  const createQueueEffect: EffectCreatorFn = <Params, Done, Fail = Error>(
    handlerOrConfig
  ) => {
    let handler
    let effectName
    if (handlerOrConfig instanceof Function) {
      handler = handlerOrConfig
    } else {
      handler = handlerOrConfig.handler
      effectName = handlerOrConfig.name
    }

    const handlerWrapper = async (params: Params): Promise<Done> => {
      await lastTask
      return await new Promise<Done>((resolve, reject) => {
        taskQueue.push(() => handler(params).then(resolve).catch(reject))
        if (!isPending) {
          isPending = true
          processQueue()
        }
      })
    }
    return createEffect<Params, Done, Fail>({
      name: effectName,
      handler: handlerWrapper
    })
  }

  return [
    createQueueEffect,
    $pending
  ]
}
