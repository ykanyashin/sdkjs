    
	function AbstractModel( entity )
    {

        this.entity = entity ;

		console.log( 'this.entity=' + this.entity ) ; 
		
        /**
        *
        *   newItem - Создать элемент
        *
        *   @access	public
        *   @params	none
        *   @return	none
        *
        */

        this.newItem = function newItem( item, callback_fn )
        {
			
			console.log( 'AbstractModel: newItem' ) ;
			
			$.ajax({
				url: HOST + this.entity + '/',
				headers: {
					'Authorization'  : ' Token ' + TOKEN,
					'Accept':  'application/json'
				},
				method: 'POST',
				data: item,
				success: function(response) {
				  
				  callback_fn(response) ;
				  
				}
			  });			
		}		


        /**
        *
        *   findItems - Поиск объектов
        *
        *   @access	public
        *   @params	none
        *   @return	none
        *
        */

        this.findItems = function findItems( filters, sorts, id, callback_fn )
        {

			console.log( 'AbstractModel: findItems ' + this.entity ) ;
			
			// тут $.each filters
			
			var params = new Array() ;
			
			$.each( filters, function(index, value) {
				params[ params.length] = index + '=' + value;
			}); 
		
			$.ajax({
				// url: HOST + $scope.lastQuery + '&limit=' + service.getRecsPerPage() + '&offset=' + (service.getPage() - 1) * service.getRecsPerPage()
				url: HOST + this.entity + '/' + (id != null ? id + '/' : '') + '?' + params.join('&'),
				headers: {
					'Authorization'  : ' Token ' + TOKEN,
					'Accept':  'application/json'
				},
				method: 'GET',
				success: function(response) {
				  
				  callback_fn(response);

				}
			  });		
		}


        /**
        *
        *   updateItem - Обновление элемента
        *
        *   @access	public
        *   @params	none
        *   @return	none
        *
        */

        this.updateItem = function updateItem( item, id, callback_fn )
        {

			console.log( 'AbstractModel: updateItem' ) ;
		
			$.ajax({
				url: HOST + this.entity + '/' + id + '/',
				headers: {
					'Authorization'  : ' Token ' + TOKEN
				},
				contentType : 'application/json',
				type: 'PUT',
				data: JSON.stringify(item),
				success: function(response) {
				  
				  callback_fn(response) ;
				}
			  });		
		}


        /**
        *
        *   deleteItem - Удаление элемента
        *
        *   @access	public
        *   @params	none
        *   @return	none
        *
        */
		
		this.deleteItem = function deleteItem( id, callback_fn )
        {

			console.log( 'AbstractModel: deleteItem' ) ;
		
			$.ajax({
				url: HOST + this.entity + '/' + id + '/',
				headers: {
					'Authorization'  : ' Token ' + TOKEN,
					'Accept':  'application/json'
				},
				type: 'DELETE',
				success: function(response) {
				  
				  callback_fn(response) ;
				  
				}	
			  });		
		}
	}

	function HeliumApi()
    {

		console.log( 'HeliumApi' ) ;
	
		this.usersModel = new AbstractModel( 'users' ) ;

        /**
        *
        *   signin - Логин в систему
        *
        *   @access	public
        *   @params	none
        *   @return	none
        *
        */
		
		this.signin = function signin( username, password , callback_success_fn, callback_error_fn ) {
			
			console.log( 'HeliumApi: signin' ) ;
			
			/*
			$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
			
			$http({
					url: HOST + 'signin',
					method: "POST",
					data: 'username=' + username + '&password=' + password
				})
				.then(function(response) {
						
						if(response.data.token.length > 0) {
							
							TOKEN = response.data.token ;
						
							callback_success_fn();
						}		

				}, 
				function(error) {
						
						callback_error_fn();
				});		
*/

			var loginData = { username: username, password: password } ;

			$.ajax
				   ({
					 type: "POST",
					 url: HOST+'signin/',
					 contentType : 'application/json',
					 data: JSON.stringify(loginData),
					 success: function (data) {
						callback_success_fn(data);
					 },
					 error: function(data){
					  callback_error_fn(data);
					 }
				   });				
		}
	}
	
	var api = new HeliumApi() ;
	
	