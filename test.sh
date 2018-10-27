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
echo "TEST TASKS ... "
resp=`curl --silent --header "Authorization: jwt $token" localhost:3000/users/tasks`
echo $resp