<p align="center">
    <h1 align="center">☄️ Effector Queue</h1>
    <p align="center">Library for sequential effect execution.</p>
    <p align="center">
        <a href="https://github.com/mishamyrt/effector-queue/actions/workflows/quality-assurance.yaml">
          <img src="https://github.com/mishamyrt/effector-queue/actions/workflows/quality-assurance.yaml/badge.svg" />
        </a>
        <a href="https://www.npmjs.com/package/effector-queue">
          <img src="https://img.shields.io/npm/v/effector-queue" />
        </a>
    </p>
</p>

This library allows you to make the effects run one after the other, rather than simultaneously. The next one will be executed only after the previous one is finished.

## Installation

```sh
npm install --save effector-queue@latest
```

## Usage

To create a queue, use the `createQueue` method. It returns a constructor that returns the effects. Effects created in this way will not execute at the same time.

```ts
const [createQueueEffect] = createQueue()

const firstFx = createQueueEffect(firstRequest)
const secondFx = createQueueEffect(secondRequest)
const thirdFx = createQueueEffect(thirdRequest)
```