// has to be ran with --allow-read because of Deno's sandboxing
let file = await Deno.open("meow.txt");
// global scope natively encapsulated in an async callback
await Deno.copy(file, Deno.stdout);
file.close();
