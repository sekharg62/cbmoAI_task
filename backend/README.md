
# API

## signup
```
method: post,
url: http://localhost:6000/api/register,

input json body: 
{
	"username":"atanu23",
	"password":"1234test",
	"email":"atanu123@gmail.com",
	"name":"ATANU PRAMANIK"
	
}
access token as output will be generated.

```

## login

```
method: post
url: http://localhost:6000/api/login

input body:
{
	"username":"atanu23",
	"password":"1234test"
}
access token as output will be generated.
```

## create task

```
method: post
url: http://localhost:6000/api/createtask

json body input :
{
	"desc":"this is new task deadpool"
}

headers:
auth    <access_token>

```
## mark task as complete

```
method: post
url:http://localhost:6000/api/taskmark

json body input:
{
	"task_id":"66d206224080800685ff0163"
}

headers:
auth    <access_token>
```

## get all tasks

```
method: get
url: http://localhost:6000/api/taskslist

headers:
auth  <access_Token>
```
## delete task

```
method: post
url: http://localhost:6000/api/taskdelete

headers: 
auth <access_token>

```