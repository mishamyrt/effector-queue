import { Effect, Event, Store } from "effector";

type EffectHandlerFn<Params, Done, Fail = Error> = (params: Params) => Promise<Done>

type EffectConfig<Params, Done, Fail = Error> = {
  handler: EffectHandlerFn<Params, Done, Fail>,
  name?: string
}

export type EffectCreatorFn = <Params = void, Done = void, Fail = Error>(
  handlerOrConfig: EffectHandlerFn<Params, Done, Fail> | EffectConfig<Params, Done, Fail>,
) => Effect<Params, Done, Fail>

export type QueueConfig = {
  minInterval?: number,
  name?: string
}

export type Queue = [EffectCreatorFn, Store<boolean>]