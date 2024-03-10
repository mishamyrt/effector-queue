import type { Effect, Store } from 'effector'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type EffectHandlerFn<Params, Done, Fail = Error> = (params: Params) => Promise<Done>

type EffectConfig<Params, Done, Fail = Error> = {
  handler: EffectHandlerFn<Params, Done, Fail>
  name?: string
}

export type EffectCreatorParam<Params, Done, Fail> =
  EffectHandlerFn<Params, Done, Fail> | EffectConfig<Params, Done, Fail>

export type EffectCreatorFn = <Params = void, Done = void, Fail = Error>(
  handlerOrConfig: EffectCreatorParam<Params, Done, Fail>,
) => Effect<Params, Done, Fail>

export type QueueConfig = {
  minInterval?: number
  name?: string
}

export type Queue = [EffectCreatorFn, Store<boolean>]
