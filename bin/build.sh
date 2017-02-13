#!/bin/bash
##########################################################################
# Execute ng build --prod
# remove items related from build from the service dir
# Copy contents from dist service directory
#
# author: Bernardo Leigh
##########################################################################

package_json_dir="`pwd`/"
if ! [ -f "${package_json_dir}package.json" ]
then
    echo 'build.sh needs to run where package.json is located'
    exit 1;
fi

git stash
git reset --hard
ng build --prod
git stash pop
set `ls dist`

# remove old files
for dist in $@
do
    postfix=${dist#*.*.}
    prefix=${dist%%.*}

    if [ -d "service/$dist" -o "$dist" = "index.html" ]
    then
        rm -rf service/$dist
    else
        ls service/ | while read f; do
            post=${f#*.*.}
            pre=${f%%.*}
            if [ "$post$pre" = "$postfix$prefix" ]
            then
                rm -f "service/$f"
            fi
        done
    fi
done

# copy new dist
cp -r dist/ service/
