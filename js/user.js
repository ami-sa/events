jQuery(function(){
	var url_event_domain = "http://localhost/aser/"
	var url_event_tool = url_event_domain + "login-sys/ers/attendize/public/e/";
	var event_organiser_id = 1;

	var event_id = 1;		// default = 1
	
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
	};

	function getIvpEventTicketDetail(mainUrl, eventId)
	{
		
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
	

	{
		// Query event details from server based on oid and/or eid
		
		var eid = getUrlParameter('eid');
		// alert(eid);
		
		var url_server = url_event_domain + 'others/learning/test_api/api/get/get_attendize_ivp_event.php';
		if( ('' == eid) || (undefined == eid))
		{
			url_server = url_server + '?oid='+event_organiser_id;
		}
		else
		{
			url_server = url_server + '?id='+eid;		// event id found
		}
		
		
		// Get event details
		$.ajax({
			url: url_server,	// oid==>organiser id
			type: 'get',
			contentType:"application/json; charset=utf-8",		// This is also set in the php script and is not required again here
			dataType: 'JSON',					// We either set the data type here or in the php script using  header("Content-Type: application/json; charset=UTF-8");
			success: function(response){
				
				if(response)
				{
					var len = Object.keys(response.message).length;
					
					if(0 < len)
					{
						var tmp;
						for(tmp = 0; tmp<len; tmp++)
						{
							 // alert(response.message[tmp].isEventExpired);
							
							if( ('0' == response.message[tmp].isEventDisabled) && ('0' == response.message[tmp].isEventExpired) )
							{
								event_id = response.message[tmp].event_id;
					
								$('#buy_now').attr('href', url_event_tool + response.message[tmp].event_id + '/' + response.message[tmp].event_title);
								
								$('#event_title').html(response.message[tmp].event_title);
								$('#event_sub_detail').html('From ' + response.message[tmp].event_start + ' - ' + response.message[tmp].event_end);
								$('#about_event').html(response.message[tmp].event_desc);
								$('#event_date').html(response.message[tmp].event_start + ' - ' + response.message[tmp].event_end);
								$('#event_location').html(response.message[tmp].event_venue + ', ' + response.message[tmp].event_addr1 + ', ' + response.message[tmp].event_addr2 + ', ' + response.message[tmp].event_postcode + ', ' + response.message[tmp].event_city);
																								
								getIvpEventTicketDetail(url_event_domain, event_id);
								break;
							}
							else
							{
								// Do nothing
							}
						}						
					}		
				}
			},
			error: function(xhr, status, error){
				alert(xhr.responseText);
			}
		});				
	}
		
})



	
	
