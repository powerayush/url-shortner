# Url-Shortner
A program in which you submit a url and it provides a shorten url, such that on clicking the shorten url it redirects to orginal url

## Setup
1. Install mongodb server 
```
$ sudo apt-get install mongodb-server
```

2. Install node modules
```
$ npm install
```

3. Start mongo daemon
```
$ mkdir ~/.cuis-db/
$ sudo mongod --dbpath ~/.cuis-db/
```

4. Start url-shortener
```
$ npm run devStart
```

5. Install robo3t to visualize the mongo database collections
https://robomongo.org/download<br />
instructions: https://askubuntu.com/questions/739297/how-to-install-robomongo-on-ubuntu/781793<br />
Create new connection with mongodb server at 27017 and you will be able to see you db and its collections<br />

## Push service to production environment 

Use Dockerfile which uses the cached github login credentials 
```
# delete the previous development tagged images
$ docker rmi $(docker images -a | grep "development" | awk '{print $3}')

$ rocker build .

# tag the image:
$ docker images

# look for the image... it's the recently created one.
$ docker tag xxxFINGERPRINTHERExxx powerayush/url-shortner:development

$ docker push powerayush/url-shortner:development

```
## Test
Use postman to test the REST APIs

1. [POST] http://localhost:5000/api/login
On executing this api you will get token

2. [POST] http://localhost:5000/shortUrl
This will convert your full Url to short Url. Use the token generated from above to obtain the short Url. You can also add customised short Url along with full Url in json format while using postman.



