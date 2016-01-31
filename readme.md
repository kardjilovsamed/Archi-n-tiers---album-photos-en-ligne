#Picture in the box API REST

##Endpoints

###Signup

####POST /signup

#####body : 
-email
-password


###Login

####POST /authenticate

#####body : 
-grant_type : password OU refresh_token
-client_id : webClient
-client_secret : secret
-username : email de l'utilisateur
-password : password

#####Return : 
-access_token
-refresh_token
-expires_in
-token_type


###Profile

####GET /profile

#####Return : 
-email
-password
-albumRoot
-albums

