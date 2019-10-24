jQuery(function(){
	var url_event_domain = "http://localhost/aser/"
	var url_event_tool = url_event_domain + "login-sys/ers/attendize/public/e/";
	var event_organiser_id = 1;

	var event_id = 1;		// default = 1
	
	function getIvpEventTicketDetail(mainUrl, eventId)
	{
		//eventId=1;
		$.ajax({
			url: mainUrl + 'others/learning/test_api/api/get/get_attendize_ivp_ticket.php?eid='+eventId,	// eid==>event_id
			type: 'get',
			contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
			dataType: 'JSON',									// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
			success: function(response){
				
				if(response)
				{
					
					var len = Object.keys(response.message).length;
					
					// Standard Ticket
					if(3<=len)
					{
						$('#ticket_standard_title').html(response.message[2].ticket_title);
						$('#standard_spaces_left').html('<b>Spaces Left: ' + (parseInt(response.message[2].ticket_count) - parseInt(response.message[2].ticket_sold))+ '</b>');
						$('#standard_desc').html(response.message[2].ticket_desc);
						$('#ticket_cost_standard').html(response.message[2].ticket_cost);	
						
					}
					else{
						$('#ticket_standard_title').html('-');
						$('#standard_spaces_left').html('<b>Spaces Left: 0</b>');
						$('#standard_desc').html('');
						$('#ticket_cost_standard').html('0.00');
					}
					
					// VIP Ticket
					if(2<=len)
					{
						$('#ticket_vip_title').html(response.message[1].ticket_title);
						$('#vip_spaces_left').html('<b>Spaces Left: ' + (parseInt(response.message[1].ticket_count) - parseInt(response.message[1].ticket_sold))+ '</b>');
						$('#vip_desc').html(response.message[1].ticket_desc);
						$('#ticket_cost_vip').html(response.message[1].ticket_cost);	
						
					}
					else{
						$('#ticket_vip_title').html('-');
						$('#vip_spaces_left').html('<b>Spaces Left: 0</b>');
						$('#vip_desc').html('');
						$('#ticket_cost_vip').html('0.00');
					}
					
					// VVIP Ticket
					if(1<=len)
					{
						
						$('#ticket_vvip_title').html(response.message[0].ticket_title);
						$('#vvip_spaces_left').html('<b>Spaces Left: ' + (parseInt(response.message[0].ticket_count) - parseInt(response.message[0].ticket_sold))+ '</b>');
						$('#vvip_desc').html(response.message[0].ticket_desc);
						$('#ticket_cost_vvip').html(response.message[0].ticket_cost);	
						
					}
					else{
						$('#ticket_vvip_title').html('-');
						$('#vvip_spaces_left').html('<b>Spaces Left: 0</b>');
						$('#vvip_desc').html('');
						$('#ticket_cost_vvip').html('0.00');
					}	
				}
				
						
			},
			
			error: function(xhr, status, error){
				$('#ticket_vvip_title').html('-');
				$('#vvip_spaces_left').html('<b>Spaces Left: 0</b>');
				$('#vvip_desc').html('');
				$('#ticket_cost_vvip').html('0.00');
				
				
				$('#ticket_vip_title').html('-');
				$('#vip_spaces_left').html('<b>Spaces Left: 0</b>');
				$('#vip_desc').html('');
				$('#ticket_cost_vip').html('0.00');
				
				
				$('#ticket_standard_title').html('-');
				$('#standard_spaces_left').html('<b>Spaces Left: 0</b>');
				$('#standard_desc').html('');
				$('#ticket_cost_standard').html('0.00');
			}
		});
		
	}
	
	// Get event details
	$.ajax({
		url: url_event_domain + 'others/learning/test_api/api/get/get_attendize_ivp_event.php?oid='+event_organiser_id,	// oid==>organiser id
		type: 'get',
		contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
		dataType: 'JSON',					// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
		success: function(response){
			
			if(response)
			{
				var len = Object.keys(response.message).length;
				
				if(0 < len)
				{
					event_id = response.message[0].event_id;
				
					$('#buy_now').attr('href', url_event_tool + response.message[0].event_id + '/' + response.message[0].event_title);
					
					$('#event_title').html(response.message[0].event_title);
					$('#event_sub_detail').html('From ' + response.message[0].event_start + ' - ' + response.message[0].event_end);
					$('#about_event').html(response.message[0].event_desc);
					$('#event_date').html(response.message[0].event_start + ' - ' + response.message[0].event_end);
					$('#event_location').html(response.message[0].event_venue + ', ' + response.message[0].event_addr1 + ', ' + response.message[0].event_addr2 + ', ' + response.message[0].event_postcode + ', ' + response.message[0].event_city);
					
					getIvpEventTicketDetail(url_event_domain, event_id);
				}		

			}
		}
	});
	
	
	
	
	
						
	

})



	
	
