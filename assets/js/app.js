$(document).ready(function() {

    var topics = ["University of Miami", "University of Alabama", "University of Arizona", "Stanford University", "Yale University", "University of Florida", "University of Illinois Urbana-Champaign", "University of Notre Dame", "Harvard University", "U.S. Naval Academy", "Brigham Young University", "Duke University"];

    createButton(topics);

    var buttonFunctions = {
        buttonHolder: $('.dynamic-button-holder'),

        listToButtons: function(list) {
            buttonFunctions.buttonHolder.empty();
            list.map(buttonFunctions.stringToButton);
        },
        stringToButton: function(str) {
            var button = $('<button>');
            var span = $('<span>');
            span.text(str);
            button.addClass('btn btn-info gif-button');
            button.attr('data-topic', str);
            button.append(span);
            buttonFunctions.buttonHolder.append(button);
        }
    };


    function createButton(topics) {
        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("college");
            a.attr("data-college", topics[i]);
            a.text(topics[i]);
            $("#collegeBtns").append(a);
        }
    }
    $("#addcollege").on("click", function() {
        event.preventDefault();
        var collegeVal = $("#college-input").val().trim();
        if (collegeVal !== "") {
            //topics.push(collegeVal);
            createButton(collegeVal);
            $("#college-input").val("");
        }
    });

    function alertTopicName() {
        var topic = $(this).attr("data-name");

        alert(topic);
    }



    $("#add-topic").on("click", function(event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topic.push(topic);
        renderButtons();
    });

    $(document).on("click", ".college", function() {
        // Grabbing and storing the data-college property value from the button
        var college = $(this).attr("data-college");
        console.log(college);
        if (college !== undefined) {

            $("#gifs").empty();



            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + college + "&api_key=AQSZlPMsuU0Cvx1HXd9sVGwW3Wgzy3RH&limit=10";


            // Performing an AJAX request with the queryURL
            $.ajax({
                    url: queryURL,
                    method: "GET"
                })

                .done(function(response) {
                        console.log(response)
                    var results = response.data;
                    console.log(queryURL);
                    for (var i = 0; i < results.length; i++) {

                        // Creating and storing a div tag
                        var collegeDiv = $("<div>");
                        collegeDiv.addClass("college");

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + results[i].rating);

                        // Creating and storing an image tag
                        var collegeImage = $("<img>");
                        // Setting the src attribute of the image to a property pulled off the result item
                        collegeImage.attr("src", results[i].images.fixed_height.url);
                        collegeImage.attr("stillAnimate", "animate");
                        collegeImage.addClass("gifPic");
                        collegeImage.attr("id", i);

                        // Appending the paragraph and image tag to the collegeDiv
                        collegeDiv.append(p);
                        collegeDiv.append(collegeImage);

                        $("#gifs").prepend(collegeDiv);
                    };
                })
        };
    });
    $(document).on("click", ".gifPic", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }



    })
});