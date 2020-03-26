$(function(){
    var RegForm = Backbone.Form.extend({
        template: _.template($('#formtemp').html()),
        schema:{
            
            Name: {
                validators:['required']
            },
            BirthDay:
                {
                    type:'Date'
                },
            Email:{
                    validators:['required','email']
                },
                 Password: {
                    type: 'Password',
                    validators: ['required']
                },
                ConfirmPassword: {
                  type: 'Password',
                   validators: [
                    'required',
                     { type: 'match', field: 'Password', message: 'Both passwords Must be match' }
                    ]
                    }
                    }
        
                    });
    var formdata=new RegForm().render();
    $('body').append(formdata.el);
    formdata.on('submit',function(event){
        var error=formdata.validate();
        if(error)event.preventDefault();
        else{
            console.log(event.val())
event.preventDefault();

            
            return false}
    });
});
