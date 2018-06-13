$(document).ready(function() {
	$("#search").focus();
});

function dispAddNoteButton(key) {
	$("#results").append(`<h3 style="text-align:center;" class="header inverted thin "><b>Cant find '${key}'</b>:<i> smash that enter button to add a note to this key</i><h3>`);
	$("body").css('background-color', '#f44336');
	var element = $('<i id="addNew" class="add icon link"></i>');
	$("#searchBox").append(element);
	$('#addNew').click(function() {
		dispAddNoteBox();
	});
}

function dispAddNoteBox(key) {
	$("body").css('background-color', '#673ab7');

	$("#results").empty();

	$("#results").append(`<h3 class="header inverted thin ">Enter in your note<h3>`);
	$("#results").append(`<div class="ui search basic segment center aligned">
                <div class="ui icon input transparent inverted " style="width:100%;" id="textBox">
          <textarea id="textArea" ></textarea>
          
          </div>
          </div>`);

	$("#results").append(`<h3 style="text-align:center;" class="header inverted thin "><i> Smash that enter button to add this note (Shift enter if you want a new line)</i><h3>`);
	setTimeout(function() {
		$("#textArea").focus();
		$("#textArea").keydown(function(e) {
			if (e.keyCode == 13 && !e.shiftKey) {
				var note = $("#textArea").val();
				$("body").append(`<div style ="width: 100%; position:absolute; top:0px;" class="ui black tiny progress" id="progressBar">
                  <div class="bar"></div>
                 
                </div>`);
				makeRequest(key, note, function() {
					$('#progressBar').progress({
						percent: 100
					});
					setTimeout(function() {
						$('#progressBar').remove();
					}, 500);
					$("#results").empty();
					dispFound(note);
					$("#search").focus();
				});

			}

			if (e.keyCode == 8) {
				var note = $("#textArea").val();
				if (note == "") {
					$("#results").empty();

					dispAddNoteButton(key);
					$("#search").focus();
				}
			}

		});
	}, 10);



}

function makeRequest(key, note, callback) {
	console.log({
		"key": key,
		"note": note
	});
	$("#textBox").addClass("disabled field");
	$.ajax({
		type: "POST",
		url: "/setNote",
		data: JSON.stringify({
			"key": key,
			"note": note
		}),
		success: function(data) {
			callback();
		},
		error: function() {
			$('#progressBar').remove();
			$("#results").empty();
			dispNotFound(key);
		},
		contentType: 'application/json'
	});
}

function dispNotFound(key) {
	$("body").css('background-color', '#f44336');
	$("#searchBox > i").remove();
	if (key == "") {
		$("#searchBox").append('<i class="search icon"></i>');
	} else {
		dispAddNoteButton(key);
	}
}

function dispFound(note) {
	$("body").css('background-color', '#4caf50');
	$("#results").append(note);
	console.log(note);
}
$("#search").keydown(function(e) {

	//delay in place so char can be read in
	setTimeout(function() {
		var key = $("#search").val();
		if (e.keyCode == 13) {
			dispAddNoteBox(key);
		} else {
			console.log(key);
			serverRequest(key, function(x) {
				$("#results").empty();
				if (x) {
					dispFound(x);
				} else {
					dispNotFound(key);
				}
			});
		}
	}, 20);

});
//Make request
function serverRequest(key, callback) {
	$.ajax({
		type: "POST",
		url: "/getNote",
		data: JSON.stringify({
			"key": key
		}),
		success: function(data) {
			callback(data);
		},
		error: function() {
			callback(false);
		},
		contentType: 'application/json'
	});
}