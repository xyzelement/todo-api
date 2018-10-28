echo
echo 'TEST SIGNUP ...'
resp=`curl --silent -H "Content-Type: application/json" -X POST -d '{"email": "ed@ed.com", "password": "ed"}' localhost:3000/users/signup`
echo $resp

echo
echo 'TEST SIGNIN ...'
resp=`curl --silent -H "Content-Type: application/json" -X POST -d '{"email": "ed@ed.com", "password": "ed"}' localhost:3000/users/signin`
echo $resp

echo
echo "TEST SECRET ... "
token=`echo $resp | cut -d\" -f4`
resp=`curl --silent --header "Authorization: jwt $token" localhost:3000/users/secret`
echo $resp

echo
echo "TEST GET ALLTASKS ... "
resp=`curl --silent --header "Authorization: jwt $token" localhost:3000/users/tasks`
echo $resp

echo
echo "TEST ADD TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X POST -H "Content-Type: application/json" -d '{"action": "adding this test task"}' localhost:3000/users/task`
echo $resp
id=`echo $resp | cut -d: -f5- | cut -d\" -f2`

echo
echo "TEST UPDATE TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X PUT -H "Content-Type: application/json" -d "{\"id\": \"$id\", \"done\":true, \"action\":\"UPDATED action\"}" localhost:3000/users/task`
echo $resp

echo
echo "TEST UPDATE TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X PUT -H "Content-Type: application/json" -d "{\"id\": \"111111111111111111111112\", \"done\":true, \"action\":\"UPDATED action\"}" localhost:3000/users/task`
echo $resp

echo
echo "TEST GET ALLTASKS ... "
resp=`curl --silent --header "Authorization: jwt $token" localhost:3000/users/tasks`
echo $resp

echo
echo "TEST DELETE TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X DELETE -H "Content-Type: application/json" -d "{\"id\": \"$id\"}" localhost:3000/users/task`
echo $resp

echo
echo "TEST DELETE ANOTHER TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X DELETE -H "Content-Type: application/json" -d "{\"id\": \"$id\"}" localhost:3000/users/task`
echo $resp