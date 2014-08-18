#!/bin/bash
# Copy the Doxyfile template in each exercise subdirectory with
# changing  "xyz" (after PROJECT_NAME and HTML_OUTPUT tags) 
# with the exercise subdirectory name

for EXERCISE in `echo task*`
do
  # generate Doxyfile
  if [ -d $EXERCISE ]; then
    cd $EXERCISE
#    echo "... generating Doxyfiles in $EXERCISE"
    for SUBTASK in `find . -name 'task?[a-g]' -type 'd'` ; do
      SUBTASK=`basename $SUBTASK`
      echo "... generating Doxyfiles in $EXERCISE/$SUBTASK"
      cat ../doxyconfig/Doxyfile.subtask | sed -e s/XYZ/$EXERCISE/ -e s/xyz/$SUBTASK/  > $SUBTASK/Doxyfile
    done
    cd ..
  fi  
done  
