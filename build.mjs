import * as esbuild from 'esbuild'
import svgr from 'esbuild-plugin-svgr'

const context = await esbuild.context({
    entryPoints: ["app/javascript/*.*"],
    outdir: "app/assets/builds",
    bundle: true,
    sourcemap: true,
    publicPath: "/assets",
    plugins: [
        svgr(),
    ]
})

// Manually do an incremental build
await context.rebuild()

// Enable watch mode
await context.watch()

// Enable serve mode
await context.serve()
