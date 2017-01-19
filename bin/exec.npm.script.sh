#!/bin/bash
##########################################################################
# Executes a script in npm.  Usefull with .vimrc to auto execute a npm script
# after a scss file is saved so it reloads when developing with, in my case,
# lite-server.
#
# author: Bernardo Leigh
##########################################################################

if ! [ $# -eq 2 ]
then
    echo 'exec.npm.script.sh: '
    echo 'Usage: exec.npm.script.sh <target script> <directory to package.json>'
    exit 1;
fi

npm_script=$1
package_json_dir="${2%*/}/"
if ! [ -f "${package_json_dir}package.json" ]
then
    echo 'sym.link.sh needs to run where package.json is located'
    exit 1;
else
    echo "Executing npm run " $npm_script
    cd $package_json_dir
    npm run $npm_script
fi
exit 0
