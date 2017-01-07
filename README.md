# Project-Kaizen
CMS system as service.

------

## Getting Started

This project uses Django in server side to provide restful-api, use React in front-end to provide Web applications.

```sh
### Django setting
pip install virtualenv
virtualenv env
source env/bin/activate
pip install -r requirements.txt
```

```sh
### Webpack setting
cd kaizen/kaizen-front
npm install
npm run dev
```

------
### TODO list
- [ ] React as Front FrameWork  
- [ ] BootStrap and Matrial as CSS FrameWork
- [ ] Django as End FrameWork. 
- [x] MongoDB as database.  
- [ ] DigitalOcean as cloud server. Setup a node
- [ ] divio/django-cms for CMS
- [x] Restful API
- [ ] Define Requirements

------
### Library
####React
- React
- Ant Design
- Redux
- Redux-saga
- React-router

### Back-end
#### How to test restful framework
- "python manage.py migrate" to enable user/group management
- "python manage.py createsuperuser" to create new admin user
- run server and check "http://127.0.0.1:8000/users/"

#### How to test database connecter
- setup database locally
- add { "name" : "John Doe", "age" : 25} as employees
- run server and check "http://127.0.0.1:8000/testconnect/"
