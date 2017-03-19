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
#### Funtions
- [ ] React as Front FrameWork  
- [ ] BootStrap and Matrial as CSS FrameWork
- [ ] Django as End FrameWork. 
- [x] MongoDB as database.  
- [ ] DigitalOcean as cloud server. Setup a node
- [ ] divio/django-cms for CMS
- [x] Restful API 
- [ ] Define Requirements
#### API 
- [ ] Login API
- [ ] Register API 
- [ ] Email validation
- [ ] Image upload API
- [ ] List uploaded content
- [ ] Drop ping on map
- [ ] Define geo data

#### Pages
- [ ] 主页
- [ ] 浏览页(年后)
- [ ] 关于本站页
- [ ] 显示页
- [x] 登陆页
- [ ] 注册页
- [ ] 注册成功页
- [ ] 上传选择页
- [ ] 新增记录者页
- [ ] 记录页（即上传音、视频、图片、文字页）
- [ ] 更新修改页



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

### kaizen/config.py
the config file should contain the following contents:
accessKeyId = '';
accessKeySecret = '';
host = '';
expire_time = 30
upload_dir = ''
callback_url = "";

whitelist = [
    host,
]

### API endpoints
[x] /acounts/api/login/
	Input:

    Return:
[x] /acounts/api/register/
	Input:

    Return:
[x] /acounts/user/(?P<id>.+)/
	Input:

    Return:
[x] /acounts/user/(?P<id>.+)/edit/
	Input:

    Return:
[x] /acounts/api/captcha/
	Input:

    Return:

[x] /upload/uploader/
	Input:

    Return:

[x] /upload/uploader/(?P<id>.+)/
	Input:

    Return:

[x] /upload/filter/uploader/(?P<userid>.+)/
	Input:

    Return:

[x] /upload/uploader/(?P<id>.+)/edit/
	Input:

    Return:

[x] /upload/getphoto/(?P<id>.+)/
	Input:

    Return:

[x] /upload/post/
	Input:
		GET to 

    Return:

[x] /upload/post/(?P<id>.+)/
	Input:
		GET to /upload/post/<_id for a post>/
    Return:
    	detail info of the given post

[ ] /upload/post/(?P<id>.+)/edit
	Input:

    Return:

[x] /upload/filter/post/(?P<authorid>.+)/
	Input:
		GET to /upload/filter/post/<_id for uploader>/
    Return:
    	list of posts created by the given uploader

[x] /upload/comment/
	Input:
		PUT to /upload/comment/
		Input request should has the following data in the request.data payload,
		    id = request.data.get('post',None)
	        content = request.data.get('content',None)
	        owner = request.data.get('owner',None)

    Return:
    	success or failure message.


