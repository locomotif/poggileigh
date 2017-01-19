#!/bin/bash
##########################################################################
# Generate source tree for code and dependencies, for ng2_seed
#
# This script is meant to be executed by npm script
# author: Bernardo Leigh
##########################################################################

package_json_dir="`pwd`/"

if ! [ -f "${package_json_dir}package.json" ]
then
    echo 'ng2.tree.sh needs to run where package.json is located'
    exit 1;
fi

dir=(
    # images
    dist/assets/images \
    dist/assets/css \
    dist/assets/scss \
    dist/assets/fonts \
);

for d in ${dir[@]}
do
    if ! [ -d "$package_json_dir$d" ]
    then
        echo "Creating directory: '"$package_json_dir$d"'"
        mkdir -p $package_json_dir$d
    fi
done
exit 0
