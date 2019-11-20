#!/bin/sh -l

echo "Hello $1" > action/hello.txt
time=$(date)
# echo ::set-output name=time::$time