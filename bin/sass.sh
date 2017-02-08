#!/bin/bash
##########################################################################
# Executes node-sass on the modified file. 
# after a scss file is saved so it reloads when developing with, in my case,
# lite-server.
#
# author: Bernardo Leigh
##########################################################################
trim_slash() {
    _1=${1#/} && _1=${_1%/} && echo $_1
    return 0
}

if ! [ $# -eq 2 ]
then
    echo 'exec.npm.script.sh: '
    echo 'Usage: sass.sh <target script> <target destination>'
    exit 1;
fi

filename=$1
target_dir="${2%*/}/"
root_dir=`echo $filename | sed 's/^\(.*\/www\/[^/]*\).*$/\1/'`


# Modify this script, now that we are using angular2 and we can use scss fils
# inside components, this script is not longer necessary, except for main.scss.
# If any scss script changes within the assets directory, execute node-sass on
# main.scss

relative_dir=${filename#${root_dir}/src/}
root=${relative_dir%%/*}

if [ "$root" == "assets" ] 
then
    filename="${root_dir}/src/assets/scss/main.scss"
    target_dir="${root_dir}/src/assets/css"
else
    exit 0
fi

if [ -f "${root_dir}/node_modules/node-sass/bin/node-sass" -a "${root_dir}/node_modules/node-sass/bin/node-sass" ]
then
    echo -n "execute: ${root_dir}/node_modules/node-sass/bin/node-sass "
    echo "--output-style nested --indent-type tab --indent-width 2 -o ${target_dir} ${filename}"
    ${root_dir}/node_modules/node-sass/bin/node-sass --output-style nested --indent-type tab --indent-width 2 -o ${target_dir} ${filename}
fi
exit 0
