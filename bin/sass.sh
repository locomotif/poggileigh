#!/bin/bash
##########################################################################
# Executes node-sass on the modified file. 
# after a scss file is saved so it reloads when developing with, in my case,
# lite-server.
#
# author: Bernardo Leigh
##########################################################################

if ! [ $# -eq 2 ]
then
    echo 'exec.npm.script.sh: '
    echo 'Usage: sass.sh <target script> <target destination>'
    exit 1;
fi

filename=$1
target_dir="${2%*/}/"
root_dir=`echo $filename | sed 's/^\(.*\/www\/[^/]*\).*$/\1/'`

if [ -f "${root_dir}/node_modules/node-sass/bin/node-sass" -a "${root_dir}/node_modules/node-sass/bin/node-sass" ]
then
    echo -n "execute: ${root_dir}/node_modules/node-sass/bin/node-sass "
    echo "--output-style nested --indent-type tab --indent-width 2 -o ${target_dir} ${filename}"
    ${root_dir}/node_modules/node-sass/bin/node-sass --output-style nested --indent-type tab --indent-width 2 -o ${target_dir} ${filename}
fi
exit 0
