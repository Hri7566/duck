#!/bin/bash
echo "Building TypeScript..."; ./node_modules/.bin/tsc
echo "Restarting process..."; pm2 restart duck