#Picture in the box API REST

##Index

**[Install](#install)**  
  
**[Signup](#signup)**  
**[Login](#login)**  
**[Profile](#profile)**  
**[Albums](#albums)**  
**[Upload](#upload)**  
**[Photos](#photos)**  
**[Search](#search)**  

##Install
* Install nodejs v4.1.1
* Install mongodb v3.0.7
* run the command: $`npm install`
* launch mongodb: $`mongod`
* run the command: $`node createClient.js`, it will install the client used for the authentication
* create a folder named **_photos_** in the root folder where app.js is

##Endpoints

###Signup

####POST /signup

#####body : 
* email
* password



###Login

####POST /authenticate

#####body : 
* grant_type : password OU refresh_token
* client_id : webClient
* client_secret : secret
* username : email de l'utilisateur
* password : password

#####Return : 
* access_token
* refresh_token
* expires_in
* token_type



###Profile

####GET /profile

#####params :
* access_token

#####Return : 
* email
* password
* albumRoot
* albums



###Albums

####GET /albums

#####params :
* access_token

#####Return :
* List of albums


####GET /albums/{id}

#####params :
* access_token

#####Return :
* nom
* description
* tags
* owner : User id
* parentAlbum : Album id
* permissions : User id


####GET /albums/{id}/content

#####params :
* access_token

#####Return :
* current : current album specified by {id}
* albums : list of children albums
* photos : list of photos contained in that album


####POST /albums/

#####params :
* access_token

#####body :
* nom : string
* description : string
* tags : string
* parentAlbum : Album id
* permissions : list of User id (not mandatory)

#####Return :
* nom
* description
* tags
* owner : User id
* parentAlbum : Album id
* permissions : User id


####PUT /albums/{id}

#####params :
* access_token

#####body :
Any of these
* nom : string
* description : string
* tags : string
* parentAlbum : Album id
* permissions : list of User id

#####Return :
* nom
* description
* tags
* owner : User id
* parentAlbum : Album id
* permissions : User id


####DELETE /albums/{id}

#####params :
* access_token

#####Return :
* nom
* description
* tags
* owner : User id
* parentAlbum : Album id
* permissions : User id



###Upload

####POST /upload

#####enctype : multipart/form-data

#####params :
* access_token

#####body :
* files[] : files to upload, must be of type image
* tags : string
* album : Album id => parent album

#####Return :
* tags : string
* uri : string
* url : string
* urlThumb : string
* private : boolean
* owner : User id
* album : Album id



###Photos

####GET /photos

#####params :
* access_token

#####Return :
* list of Photos


####GET /photos/{id}

#####params :
* access_token

#####Return :
* tags : string
* uri : string
* url : string
* urlThumb : string
* private : boolean
* owner : User id
* album : Album id


####GET /photos/{id}/img

#####params :
* access_token

#####Return :
* image file specified in the Photo uri


####PUT /photos/{id}

#####params :
* access_token

#####body :
* tags : string
* album : Album id

#####Return :
* tags : string
* uri : string
* owner : User id
* album : Album id


####DELETE /photos/{id}

#####params :
* access_token

#####Return :
* tags : string
* uri : string
* owner : User id
* album : Album id


###Search

####GET /search/users

#####params :
* email => part of email
* access_token

#####Return :
* List of 5 users which match the email
    * id
    * email
    
####GET /search/photos

#####params :
* owner : id of the owner
* tag : string => all the images that have this tag
* access_token

#####Return :
* List of photos
    * tags : string
    * uri : string
    * url : string
    * urlThumb : string
    * private : boolean
    * owner : User id
    * album : Album id