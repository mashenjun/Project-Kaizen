#!/bin/bash
# exec ~/Project-Kaizen/kaizen/manage.py runserver 0.0.0.0:8080
source ~/Project-Kaizen/env/bin/activate
rm -rf ~/Project-Kaizen/kaizen/static/
exec ~/Project-Kaizen/kaizen/manage.py collectstatic --noinput
echo "collect statics finish!"
