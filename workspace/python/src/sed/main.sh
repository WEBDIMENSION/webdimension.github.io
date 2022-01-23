#!/usr/bin/env bash
#cat ./test.html
#sed -e 's:\<h2>\(.\+\)\</h2>:\1:p' ./test.html
sed -re '/<h2>/,/<\/h?2>/p' test.html
