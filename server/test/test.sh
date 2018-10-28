URL="localhost:5000/users"

echo
echo 'TEST SIGNUP ...'
resp=`curl --silent -H "Content-Type: application/json" -X POST -d '{"email": "ed@ed.com", "password": "ed"}' $URL/signup`
echo $resp

echo
echo 'TEST SIGNIN ...'
resp=`curl --silent -H "Content-Type: application/json" -X POST -d '{"email": "ed@ed.com", "password": "ed"}' $URL/signin`
echo $resp

echo
echo "TEST SECRET ... "
token=`echo $resp | cut -d\" -f4`
resp=`curl --silent --header "Authorization: jwt $token" $URL/secret`
echo $resp

echo
echo "TEST GET ALLTASKS ... "
resp=`curl --silent --header "Authorization: jwt $token" $URL/tasks`
echo $resp

echo
echo "TEST ADD TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X POST -H "Content-Type: application/json" -d '{"action": "adding this test task"}' $URL/task`
echo $resp
id=`echo $resp | cut -d: -f5- | cut -d\" -f2`

echo
echo "TEST UPDATE TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X PUT -H "Content-Type: application/json" -d "{\"id\": \"$id\", \"done\":true, \"action\":\"UPDATED action\"}" $URL/task`
echo $resp

echo
echo "TEST UPDATE TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X PUT -H "Content-Type: application/json" -d "{\"id\": \"111111111111111111111112\", \"done\":true, \"action\":\"UPDATED action\"}" $URL/task`
echo $resp

echo
echo "TEST GET ALLTASKS ... "
resp=`curl --silent --header "Authorization: jwt $token" $URL/tasks`
echo $resp

echo
echo "TEST DELETE TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X DELETE -H "Content-Type: application/json" -d "{\"id\": \"$id\"}" $URL/task`
echo $resp

echo
echo "TEST DELETE ANOTHER TASK "
resp=`curl --silent --header "Authorization: jwt $token" -X DELETE -H "Content-Type: application/json" -d "{\"id\": \"$id\"}" $URL/task`
echo $resp