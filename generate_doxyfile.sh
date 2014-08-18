#!/bin/bash
# Copy the Doxyfile template in each excercise subdirectory with
# changing  "xyz" (after PROJECT_NAME and HTML_OUTPUT tags) 
# with the excercise subdirectory name

for EXERCISE in `echo task*`
do
  # generate Doxyfile
  if [ -d $EXERCISE ]; then
    echo "... generating $EXERCISE/Doxyfile"
    if [ -f $EXERCISE/Doxyfile ]; then
       echo ".. exists"
    else
    cat Doxyfile | sed s/xyz/$EXERCISE/ > $EXERCISE/Doxyfile
       echo ".. created"
    fi
  fi  
done  
