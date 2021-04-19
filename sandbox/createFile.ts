// has to be ran with --allow-write because of Deno's sandboxing
const encoder = new TextEncoder();

const meowText = encoder.encode("Meow World\nMy name is ASTAROTH");

// global scope natively encapsulated in an async callback
await Deno.writeFile("meow.txt", meowText);
