export default {
    hostname: Deno.env.get("DB_HOST"),
    port: Deno.env.get("DB_PORT"),
    user: Deno.env.get("DB_USER"),
    password: Deno.env.get("DB_PASS"),
    database: Deno.env.get("DB_NAME"),
}