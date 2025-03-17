export function EnvString(envVar, defaultVal) {
    const s = Deno.env.get(envVar) // node.js: 'const s = process.env[envvar]'
    return s ? s : defaultVal
}