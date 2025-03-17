export function EnvString(envvar, def) {
    const s = Deno.env.get(envvar)
    return s ? s : def
}