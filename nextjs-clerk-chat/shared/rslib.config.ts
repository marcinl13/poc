import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      bundle: false,
      format: 'esm',
      syntax: ['node 18'],
      dts: true,
    },
  ],
});
