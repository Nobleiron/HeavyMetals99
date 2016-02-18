#!/bin/bash
rsync -avzh dist/* -e 'ssh -i id_rsa' ubuntu@52.32.122.252:/var/www/html/
if [ "$?" -eq "0" ]
then
  echo "Upload Done"
else
  echo "Error while running rsync"
fi
