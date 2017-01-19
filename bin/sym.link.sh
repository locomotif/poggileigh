#!/bin/bash
##########################################################################
# Generate symbolic links for dependencies such as bootstrap and fontawesome.
# I am not sure if this has been dealt with but I had issues with relative
# paths that when up the tree.
#
# This script is meant to be executed by npm script
# author: Bernardo Leigh
##########################################################################

trim_slash() {
    _1=${1#/} && _1=${_1%/} && echo $_1
    return 0
}

#### Root Dir
#### Scripts must be executed from root dir.
#### - easier than having to code where am i logic

root_dir="`pwd`/"
if ! [ -f "${root_dir}package.json" ]
then
    echo 'sym.link.sh needs to run where package.json is located'
    exit 1;
fi

##########################################################################
# bash doesn't support associative arrays
#
# hard coded symlinks
##########################################################################
paths=(
    "${root_dir}src/dist/vendor/bootstrap/scss ${root_dir}src/dist/scss/bootstrap" \
    "${root_dir}src/dist/vendor/font-awesome/scss ${root_dir}src/dist/scss/font-awesome" \
)

for ((i = 0; i < ${#paths[@]}; i++))
do
    set ${paths[$i]}
    src=$1
    dest=$2
    if ! [ -h "${dest}" ] && ! [ -e "${dest}" ] && [ -e "${src}" ]
    then
        echo "Creating symbolic link: ln -s "${src}" ${dest}"
        ln -s "${src}" ${dest}
    fi
done

##########################################################################
# Generate dynamic symbolic links to link html files in app to dist/app
#
# if there is a file with the same name it will create a backup copy
##########################################################################

app_dir=${root_dir}src/app
dest_dir=${root_dir}src/dist/app
if [ -d "$app_dir" ]
then
    find ${app_dir} -type f -name '*.html' | \
    while read line
    do
        fpath=`echo $line | sed 's|'${app_dir}'||'`

        #### Create back up if a file exists
        if [ -f "$dest_dir$fpath" -a ! -h "$dest_dir$fpath" ]
        then
            mv $dest_dir$fpath $dest_dir$fpath~`date +%Y%m%d%H%M%S`
        fi

        #### If sym link then skip
        if ! [ -h "$dest_dir$fpath" ]
        then
            ln -s $line "$dest_dir$fpath"
        fi
    done
fi

##########################################################################
# Generate dynamic symbolic links to link scss files in app to dist/app
#
# if there is a file with the same name it will create a backup copy
##########################################################################

app_dir=${root_dir}src/app

if [ -d "$app_dir" ]
then
    find ${app_dir} -type f -name '*.scss' | \
    while read line
    do
        relative_dir=${line#${root_dir}src}
        dest=/`trim_slash $root_dir`/src/dist/scss/`trim_slash $relative_dir`
        dirname=`dirname $dest`

        #### Create back up if a file exists
        if [ -f "$dest" -a ! -h "$dest" ]
        then
            mv $dest $dest~`date +%Y%m%d%H%M%S`
        fi

        #### If sym link then skip
        if ! [ -h "$dest" ]
        then
            # mkdir dirname
            mkdir -p $dirname
            ln -s $line "$dest"
        fi
    done
fi

##########################################################################
# Generate dynamic symbolic links to link fontawesome fonts
##########################################################################

fontawesome_dir=${root_dir}src/dist/vendor/font-awesome/fonts

if [ -d "$fontawesome_dir" ]
then
    find ${fontawesome_dir} -type f | while read line
    do
        basename=`basename $line`
        dest=/`trim_slash $root_dir`/src/dist/css/fonts/`trim_slash $basename`

        #### Create back up if a file exists
        if [ -f "$dest" -a ! -h "$dest" ]
        then
            mv $dest $dest~`date +%Y%m%d%H%M%S`
        fi

        #### If sym link then skip
        if ! [ -h "$dest" ]
        then
            ln -s $line "$dest"
        fi
    done
fi
exit 0
