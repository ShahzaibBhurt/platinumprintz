$(document).ready(function(){
     //login and register modals functions
    $('#loginBtn').on('click', function(){
        $('#SignupModal').modal('toggle');
    })
    $('#signupBtn').on('click', function(){
        $('#LoginModal').modal('toggle');
    })
    // block login and register forms
    $("#formLogin, #formReg"/*,  #contactForm, #udUpdate"*/).submit(function(e){
        e.preventDefault()
    })
    // checking passwords
    $('#c_pass').on('keyup', function(){
        var pass = $('#pass').val()
        var cpass = $('#c_pass').val()
        if(pass != cpass){
            $('#c_pass').css("background", "red")
            $('#SignupFmBtn').prop('disabled',true);
            if($("#regFormAlert").text().length == 0){
               $('<div id="regFormAlert" class="alert alert-danger alert-dismissible show fade">Password Not Match!!<button type="button" class="close" data-dismiss="alert">&times;</button></div>').insertBefore('#SignupFmBtn')
            }
        }else{
            $('#c_pass').css("background", "white")
            $('#SignupFmBtn').prop('disabled',false);
            $('#regFormAlert').remove()
        }
    });
    
    //Register User
    $('#SignupFmBtn').click(()=>{

        var fname             = $('#fname').val()
        var lname             = $('#lname').val()
        var email             = $('#email').val()
        var address           = $('#address').val()
        var number            = $('#number').val()
        var pass              = $('#pass').val()
        var cpass             = $('#c_pass').val()
        var form              = "RegistrationForm";
        
        if(fname != '' && lname !='' && email != '' && address != '' && number != '' && pass != ''){
            
            $.ajax({
                type: "POST",
                url: "functions/user-login.php",             
                dataType: "html",
                data:{
                    form:form,
                    fname:fname,
                    lname:lname,
                    email:email,
                    address:address,
                    number:number,
                    pass:pass
                },
                beforeSend: function () {
                    $(this).prepend('<div class="spinner-border text-dark"></div>')
                    $(this).attr('disabled', true)
                },                
                success: function(response){               
                    alert(response);
                    window.location = window.location
                },
                complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
                    $('#SignupFmBtn div').remove('.spinner-border')
                    $(this).attr('disabled', false)
                    
                },
                error: function(error){
                    alert(error)
                }
            });
        }else{
            $('#regFormAlert').append("<b>Password Not Matched!</b>")
            $('#regFormAlert').addClass("show")

        }
    });
    // login user
    $('#LoginFmBtn').click(()=>{
        var email = $('#login_email').val()
        var pass = $('#login_pass').val()
        var form = "LoginForm"
        $.ajax({
            type: "POST",
            url: "functions/user-login.php",             
            dataType: "html",
            data:{
                form:form,
                email:email,
                pass:pass
            },
            beforeSend: function () {
                $('#LoginBtn').prepend('<div class="spinner-border text-dark"></div>')
            },                
            success: function(response){
                if(response == 1){
                    window.location = window.location
                }else{
                    $('#formLogin .alert').remove()
                    $('#formLogin').prepend(
                    '<div class="alert alert-danger alert-dismissible fade show">'+
                        '<b>'+response+'</b>'+
                        '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                    '</div>')
                }
            },
            complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
                $('#LoginBtn div').remove('.spinner-border')
            },
            error: function(error){
                alert(error)
            }
        });
    });
    
    //Contact Us FOrm
    /*$('#form-submit').click(()=>{
        	
        var name        = $('#name').val()
        var email       = $('#emailAddress').val()
        var message     = $('#message').val()
        var form        = "ContactUsForm";
        
        if(name != '' && email != '' && message != ''){
            
            $.ajax({
                type: "POST",
                url: "functions/user-login.php",             
                dataType: "html",
                data:{
                    form:form,
                    name:name,
                    email:email,
                    message:message
                },
                beforeSend: function () {
                    $('#form-submit').prepend('<div class="spinner-border text-dark"></div>')
                    $('#form-submit').attr('disabled', true)
                },                
                success: function(response){               
                    if(response == 1){
                        alert("Message Sent!!")
                        $('#name').val('')
                        $('#emailAddress').val('')
                        $('#message').val('')
                    }else{
                        alert("Message not Send please try it again!!")
                    }
                },
                complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
                    $('#form-submit div').remove('.spinner-border')
                    $('#form-submit').attr('disabled', false)
                    
                },
                error: function(error){
                    alert(error)
                }
            });
        }
    });*/
    /* Write code Here For email */

    $('#email').blur(function(){

    	var email = $('#email').val();
    	var form  = "checkEmail";
    	if(email!='')
    	{

    		$.ajax({
                type: "POST",
                url: "functions/user-login.php",             
                dataType: "html",
                data:{
                    form  : form,
                    email : email
                },

                success: function(response){
                if(response == 1){
                    //email is unique
                    	$('#email_msg').html("email is Unique")
    					$('#email_msg').css("color", "green")
                        $('#SignupFmBtn').prop('disabled',false);
    					

                }else{
                    //email is not unique
                    	$('#email_msg').html("Email alrady in use Please enter a new one")
    					$('#email_msg').css("color", "red")
    					$('#email').focus()
                        $('#SignupFmBtn').prop('disabled',true);
                }
            },
           
            error: function(error){
                alert(error.statusText)
            }

    		});

    	}
    	
    	
    	

    	
    });
})