// native support for latest ES and TS
// has to be ran with --allow-net flag because of Deno's sandboxing
import { serve } from "https://deno.land/std@0.93.0/http/server.ts";
const s = serve({ port: 8000 });
console.log(s);
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Meow World\n" });
}
