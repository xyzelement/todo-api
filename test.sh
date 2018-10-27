echo "... TEST SIGNIN ..."
resp=`curl --silent -H "Content-Type: application/json" -X POST -d '{"email": "ed@ed.com", "password": "ed"}' localhost:3000/users/signin`
echo $resp

echo "... TEST SECRET ... "
token=`echo $resp | cut -d\" -f4`
curl --silent --header "Authorization: jwt $token" localhost:3000/users/secret