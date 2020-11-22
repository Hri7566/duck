#!/bin/bash
echo "Building TypeScript..."; cd src; ../node_modules/.bin/tsc; cd ..; echo "Done."
echo "Restarting process..."; pm2 restart duck