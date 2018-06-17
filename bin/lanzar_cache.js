#!/usr/bin/env node

const Cache = require("../lib/cache.js");

const ruta = process.argv[2];

new Cache(ruta).iniciar();

