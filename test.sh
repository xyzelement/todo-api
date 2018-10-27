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