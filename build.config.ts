import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  failOnWarn: false,
  outDir: "dist"
})