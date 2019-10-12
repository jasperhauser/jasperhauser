$(function() {
	var form = $('#ajax-contact'); // Get the form
	var formMessages = $('#form-messages'); // Get the messages div
	$(form).submit(function(e) { // Set up an event listener for the contact form.
		e.preventDefault(); // Stop the browser from submitting the form.
		$('.loader').addClass('show'); // Show progress
		var formData = $(form).serialize(); // Serialize the form data.
		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			$('.loader').removeClass('show'); // hide the loader
			$(formMessages).addClass('show'); // adds padding = default hide
			$(formMessages).text(response); // Set the message text.
			// Clear the form
			// todo: except when responce is received
			$('#name').val('');
			$('#email-star').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$('.loader').removeClass('show'); // hide the loader
			$(formMessages).addClass('show');
			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text("Oops! We couldn't send your message.");
			}
		});
	});
});