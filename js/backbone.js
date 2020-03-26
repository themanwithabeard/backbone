
$(function(){

       //******* EXTEND MODEL *********//

        var SomeModel = Backbone.Model.extend({
        
        });

        //******** BIND  EVENT (CHANGE) ***********//

        someModel = new SomeModel();
        someModel.bind("change", function(model, collection){
        
        });

        someModel.set({some_attribute: "some value"});

        var Credentials = Backbone.Model.extend({});

          //******** SET LOGIN VIEW *************//

        var LoginView = Backbone.View.extend({
          el: $("#login-form"),

         //********* SET EVENTS **********//
          events: {
            "click #submit": "submit",
            "click button#view": "view",
            "click button#edit": "edit"
          },


          initialize: function(){
             var self = this;

            this.username = $("#username");
            this.address = $("#address");
            this.number   = $("#number");
            this.email    = $("#email");
 
            this.username.change(function(e){
              self.model.set({username: $(e.currentTarget).val()});
            });

            this.address.change(function(e){
              self.model.set({address: $(e.currentTarget).val()});
            });

            this.number.change(function(e){
              self.model.set({number: $(e.currentTarget).val()});
            });

            this.email.change(function(e){
              self.model.set({email: $(e.currentTarget).val()});
            });
          },

          //**********CALL SUBMIT FUNCTION*************//
          /**** NOTE 
              `In this,Used ajax and php to save data is json file`.
          ******/
          submit: function(){

              var formdata = {
              "username":this.model.get('username'),
              "address":this.model.get('address'),
              "email":this.model.get('email'),
              "number":this.model.get('number'),
              "id":Math.floor(Math.random() * 10000),
              "userid":$("#userid").val()
              }
              var data1 = JSON.stringify(formdata); 
              obj = JSON.parse(data1);
              $.ajax({url:"./methods/update.php",type:"POST",data:{
              "data3":obj},
              success:function(data)
              {
                if(data){
                  location.reload();
                }
              }


            });

              /***** NOTE
                 Unable to find a way to refresh a page,So used window.location.href
              *****/
          

          },

           //**********CALL VIEW FUNCTION TO SEE THE DETAIL OF PARTICULAR USER*************//
          view:function(e){
            console.log(e.target.value)
            var formdata = {
            "id":e.target.value
            }

            $.ajax({url:"./methods/getdata.php",type:"POST",data:formdata,
            success:function(response){
            var user = JSON.parse(response);
           
            $('#userdetail').empty();
            $('#userdetail').append(

            '<p>Username :- ' + user.username + '</p>' +
            '<p>Email :- ' + user.email + '</p>' +
            '<p>Address :- ' + user.address + '</p>' +
            '<p> Contact Number :- ' + user.number + '</p>'+
            '<button id="edit" value='+user.id+'>Edit</button>'
            );
            }
            })
           },

          //**********CALL VIEW FUNCTION TO SEE THE DETAIL OF PARTICULAR USER*************//

            edit:function(e){
               var self = this;

              var formdata = {
              "id":e.target.value
              }

            $.ajax({url:"./methods/getdata.php",type:"POST",data:formdata,
            success:function(response){

            var user = JSON.parse(response);

               self.model.set({username: user.username});
               self.model.set({address: user.address});
               self.model.set({email: user.email});
               self.model.set({number: user.number});

              $("#username").val(user.username);$("#address").val(user.address);$("#email").val(user.email);$("#number").val(user.number);$("#userid").val(user.id)
            }
            })
           }

        });

           //**********EXTEND MY COLLECTION AND APPEND THE JSON RESULT IN TABLE**********//

            var MyCollection = Backbone.Collection.extend({
            url: './json/users.json', 
            parse: function(response) {
            for(var i = 0; i < response.length; i++){
            $('#table-body').append(
            '<tr>' +
            '<th scope="row">'+(i+1)+'</th>'+
            '<td>' + response[i].username + '</td>' +
            '<td>' + response[i].email + '</td>' +
            '<td>' + response[i].number + '</td>' +
            '<td><button id="view" value='+(response[i].id)+'>View</button></td>' +
            '</tr>'
            );
            }
            return response;
            }
            });
 
              var stuff = new MyCollection;
              //**CALL FETCH FUNCTION**//
              stuff.fetch()


        window.LoginView = new LoginView({model: new Credentials()});
      });