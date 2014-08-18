#!/bin/bash
# $Id: generate_html.sh 253 2010-02-14 12:43:30Z schaelic $
# Generate Html for all excercise subdirectories

# prepare output directory
if [ ! -d html ]; then
  echo 'Creating directory html'
  mkdir html
else
  echo 'Cleaning existing directory html - in 3 seconds ' ; sleep 3
  rm -fr html/*
fi
      
for EXERCISE in `echo task*`
do
  if [ -f $EXERCISE/Doxyfile ]; then
    cd $EXERCISE
    echo "... running doxygen in $EXERCISE"
    doxygen
    for SUBTASK in `find . -name 'task?[a-g]' -type 'd'` ; do
      if [ -f $SUBTASK/Doxyfile ]; then
        echo 'Found Sub-task ' $SUBTASK  ' - processing it. '
        cd $SUBTASK
        doxygen
        cd ..
      fi
    done
    cd ..
  fi  
done  

for EXERCISE in `echo task*`
do
  cp -v doxyconfig/print.css html/$EXERCISE
  cp -v doxyconfig/highlight.js html/$EXERCISE
done
