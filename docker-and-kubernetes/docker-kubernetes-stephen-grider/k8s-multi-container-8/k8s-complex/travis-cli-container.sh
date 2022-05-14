# for linux
docker run -it -v $(pwd):/app ruby:2.4 sh
# for windows
docker run -it -v ${pwd}:/app ruby:2.4 sh

gem install travis

travis login

# add the json file where the volume is mounted
# github_username/repo_name is the name of repo that we want to tie this repository to

travis encrypt-file <file_name> -r <github_username/repo_name>

# then add the following script into the before_install stage, then DELETE the original file from bind mounted volume, this script will automatically convert this into original file (deencrypt the file) at travis virtual machine

# add the encrypted file in git repo, because that is what travis pull
