#!/bin/bash
# exec ~/Project-Kaizen/kaizen/manage.py runserver 0.0.0.0:8080
exec ~/Project-Kaizen/kaizen/manage.py collectstatic --noinput
echo "collect statics finish!"
